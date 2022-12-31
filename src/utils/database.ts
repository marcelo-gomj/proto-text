import { supabase } from '../services/supabase';
import { Post } from '../types/models';

export async function addPost(content: Post): Promise<{ post_id: string } | undefined> {
   const { status, data, error } = await supabase
      .from('posts')
      .insert(content)
      .select("post_id");

   if (status === 201 && data) {
      return data[0];
   };

   return;
}

export async function checkUsernameExist(user_id: string) {
   const { data, error } = await supabase.from('profile')
      .select()
      .eq("user_reference", user_id)
      .single()

   return data
}
