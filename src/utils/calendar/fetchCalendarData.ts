'use server';

import { Tables } from '@/types/supabase';
import { createClient } from '../supabase/server';
import { NutrientsJson } from '@/types/NutrientsJson';
import { FoodTagDataType } from '@/types/SelectedFoodInfo';
import { calculateNewNutrients } from './calculateNewNutrient';

interface FoodTagMeta {
  year: number;
  month: number;
  day: number;
  userId: string | undefined;
}
export async function getCalendarMonth({
  year,
  month,
  userId
}: Omit<FoodTagMeta, 'day'>): Promise<Tables<'calendars'>[] | null> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('calendars')
      .select()
      .eq('user_id', userId)
      .eq('year', year)
      .eq('month', month);

    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function getCalendarDate({ year, month, day, userId }: FoodTagMeta): Promise<Tables<'calendars'>> {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('calendars')
      .select()
      .eq('user_id', userId)
      .eq('year', year)
      .eq('month', month)
      .eq('day', day)
      .single();
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function getFoodTags({
  year,
  month,
  day,
  userId
}: FoodTagMeta): Promise<Tables<'consumed_foods'>[] | null> {
  try {
    const supabase = createClient();

    const { id } = await getCalendarDate({ year, month, day, userId });
    if (id === null) return null;

    const { data } = await supabase.from('consumed_foods').select().eq('calendar_id', id);

    return data;
  } catch {
    return null;
  }
}

export async function getFoodTagById(id: string): Promise<Tables<'consumed_foods'>> {
  const supabase = createClient();

  const { data, error } = await supabase.from('consumed_foods').select().eq('id', id).single();
  if (error) console.error('supabase error!', error);

  return data;
}

//interface InsertToCalendarType {
//  user_id: string | undefined;
//  year: number;
//  month: number;
//  day: number;
//  total_calories?: number;
//  total_nutritions?: NutrientsJson;
//}
interface CalendarRowParams extends FoodTagMeta {
  totalCalories?: number;
  totalNutritions?: NutrientsJson;
}
export async function createCalendarRow({ userId, year, month, day }: CalendarRowParams): Promise<Tables<'calendars'>> {
  try {
    const supabase = createClient();

    const { data } = await supabase
      .from('calendars')
      .insert({
        user_id: userId,
        year,
        month,
        day
      })
      .select()
      .single();
      console.log('create calendar row', year, month, day);
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

interface CreateConsumedFoodsParams {
  calendarId: string;
  name: string;
  calorie: number;
  nutritions: NutrientsJson;
  servingSize: string;
  amount: number;
}
export async function createConsumedFoods({
  calendarId,
  name,
  calorie,
  nutritions,
  servingSize,
  amount
}: CreateConsumedFoodsParams) {
  try {
    const supabase = createClient();
    await supabase
      .from('consumed_foods')
      .insert({ calendar_id: calendarId, name, calorie, nutritions, serving_size: servingSize, amount });
  } catch (error) {
    throw new Error(`${error}`);
  }
}

interface UpdateCalendarParams extends FoodTagMeta {
  newTotalCalories: number | null;
  newNutrientInfo: NutrientsJson | null;
} //
export async function updateCalendarNutrientInfo({
  year,
  month,
  day,
  userId,
  newTotalCalories,
  newNutrientInfo
}: UpdateCalendarParams) {
  try {
    const supabase = createClient();
    await supabase
      .from('calendars')
      .update({ total_calories: newTotalCalories, total_nutritions: newNutrientInfo })
      .eq('user_id', userId)
      .eq('year', year)
      .eq('month', month)
      .eq('day', day);
  } catch (error) {
    throw console.error('supabase calendar update error!', error);
  }
}

interface DeleteCalendarRowParams {
  userId: string;
  year: number;
  month: number;
  day: number;
}
export async function deleteCalendarRow({ userId, year, month, day }: DeleteCalendarRowParams) {
  try {
    const supabase = createClient();
    const { id: calendarId } = await getCalendarDate({ userId, year, month, day });
    await supabase.from('calendars').delete().eq('id', calendarId);
  } catch (error) {
    throw new Error(`${error}`);
  }
}

interface DeleteFoodTagParams {
  tagId: string;
}
export async function deleteFoodTagData({ tagId }: DeleteFoodTagParams) {
  try {
    const supabase = createClient();
    await supabase.from('consumed_foods').delete().eq('id', tagId);
  } catch (error) {
    throw new Error(`${error}`);
  }
}

interface DeleteTagAndUpdateCalendarParams extends UpdateCalendarParams {
  tagId: string;
}
export async function deleteTagAndUpdateCalendar({
  year,
  month,
  day,
  userId,
  tagId,
  newTotalCalories,
  newNutrientInfo
}: DeleteTagAndUpdateCalendarParams) {
  try {
    // calendar에 바뀐 total nutrition과 total carlories를 업데이트한다다.
    await updateCalendarNutrientInfo({ year, month, day, userId, newTotalCalories, newNutrientInfo });
    // consumed_foods에서 tag를 지운다
    await deleteFoodTagData({ tagId });
  } catch (error) {
    throw new Error(`${error}`);
  }
}

interface createTagAndUpdateParams {
  userId: string | undefined;
  calendarId: string;
  foodTagData: FoodTagDataType;
  amount: number;
}
export async function createTagAndUpdateCalendar({
  calendarId,
  userId,
  foodTagData,
  amount
}: createTagAndUpdateParams) {
  try {
    //기존 정보를 받아와 새 정보를 넣어서 영양 정보를 계산한다.
    const { year, month, day, name, calorie, nutritions, servingSize } = foodTagData;
    const { total_calories: totalCalories, total_nutritions: totalNutritions } = await getCalendarDate({
      year,
      month,
      day,
      userId
    });
    const { calculatedCalories: newTotalCalories, calculatedNutrients: newNutrientInfo } = calculateNewNutrients({
      totalCalories,
      totalNutritions: totalNutritions as NutrientsJson,
      nutritions,
      calorie,
      consumedAmount: amount,
      mode: 'update'
    });

    // calendar에 바뀐 total nutrition과 total carlories를 업데이트한다.
    await updateCalendarNutrientInfo({ year, month, day, userId, newTotalCalories, newNutrientInfo });

    // consumed_foods에서 tag를 생성한다
    await createConsumedFoods({
      calendarId,
      name,
      calorie,
      nutritions,
      servingSize,
      amount
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
}

interface CreateFirstTag {
  year:number;
  month:number;
  day:number;
  userId:string;
  foodTagData:FoodTagDataType;
  amount:number;
}
export async function createFirstTag({ year, month, day, userId, foodTagData, amount }: CreateFirstTag) {
  //캘린더 생성
  const { id: calendarId } = await createCalendarRow({ userId, year, month, day });
  //태그 추가
  createTagAndUpdateCalendar({
    calendarId,
    userId,
    foodTagData,
    amount
  });
}