import { supabase } from "../src/lib/supabase";

export async function createWish(name, wish) {
  const { data, error } = await supabase
    .from("wishes")
    .insert({
      name: name,
      wish: wish,
      approved: true,
    })
    .select()
    .single();

    if (error) {
    throw error;
  }

  return data;
}

  export async function getWishes() {
  const { data, error } = await supabase
    .from("wishes")
    .select("*")
    .eq("approved", true)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data;
}
