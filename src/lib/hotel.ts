import { supabase } from "@/lib/supabase"

export async function getHotelData() {

  const { data: rooms, error: roomsError } =
    await supabase
      .from("rooms")
      .select("*")
      .order("id")

  const {
    data: settings,
    error: settingsError,
  } = await supabase
    .from("hotel_settings")
    .select("*")
    .single()

  if (roomsError) {
    console.error(roomsError)
  }

  if (settingsError) {
    console.error(settingsError)
  }

  return {
    rooms: rooms || [],
    settings: settings || null,
  }
}