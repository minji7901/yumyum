'use server';

import { createClient } from '@/utils/supabase/server';

export const handleLogout = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
};

export const handleNicknameRename = async (user: { id: string }, newNickname: string): Promise<void> => {
  const supabase = await createClient();
  await supabase.from('users').update({ nickname: newNickname }).eq('id', user.id);
};
