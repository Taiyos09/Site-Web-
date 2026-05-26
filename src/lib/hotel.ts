export async function
getHotelData() {

  const roomsResponse =
    await fetch(

      "http://localhost:3000/api/rooms",

      {
        cache: "no-store",
      }
    )

  const rooms =
    await roomsResponse.json()

  const settingsResponse =
    await fetch(

      "http://localhost:3000/api/hotel-settings",

      {
        cache: "no-store",
      }
    )

  const settings =
    await settingsResponse.json()

  return {
    rooms,
    settings,
  }
}