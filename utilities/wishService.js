import { supabase } from "../src/lib/supabase";

export async function createWish(name, wish) {
  const { data, error } = await supabase
    .from("wishes")
    .insert({
      name,
      wish,
      approved: true,
    })
    .select()
    .single();

  if (error) {
    console.error("CREATE WISH ERROR:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
      fullError: error,
    });

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
    console.error("GET WISHES ERROR:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
      fullError: error,
    });

    throw error;
  }

  return data;
}