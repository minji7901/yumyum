'use server';

import { Tables } from '@/types/supabase';
import { createClient } from '../supabase/server';
import { NutrientsJson } from '@/types/NutrientsJson';

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
  // 음식 태그를 삭제하면 재렌더링 과정에서 여기서 에러가 발생한다. 
  // 태그 아이디가 사라졌을 때는 초기 화면으로 돌아가도록 하자

  return data;
}

interface UpdateCalendarParams extends FoodTagMeta {
  newTotalCalories: number | null;
  newNutrientInfo: NutrientsJson | null;
}

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
    const newNutrientJson = JSON.stringify(newNutrientInfo);
    await supabase
      .from('calendars')
      .update({ total_calories: newTotalCalories, total_nutritions: newNutrientJson })
      .eq('user_id', userId)
      .eq('year', year)
      .eq('month', month)
      .eq('day', day);
  } catch (error) {
    throw console.error('supabase calendar update error!', error);
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
