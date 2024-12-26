'use server';

import { Tables } from '@/types/supabase';
import { createClient } from '../supabase/server';

interface FoodTagMeta {
  year: number;
  month: number;
  day: number;
  userId: string;
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

export async function getFoodTags({ year, month, day, userId }: FoodTagMeta): Promise<Tables<'consumed_foods'>[] | null> {
  try {
    const supabase = createClient();

    const { id } = await getCalendarDate({ year, month, day, userId });
    if (id === null) return null;

    const { data } = await supabase.from('consumed_foods').select().eq('calendar_id', id);
    //console.log('tags', data);

    return data;
  } catch {
    return null;
  }
}

export async function getFoodTagById(id: string): Promise<Tables<'consumed_foods'>> {
  const supabase = createClient();

  const { data, error } = await supabase.from('consumed_foods').select().eq('id', id).single();
  if (error) console.error('supabase error!', error);
  //console.log('tags', data);

  return data;
}
