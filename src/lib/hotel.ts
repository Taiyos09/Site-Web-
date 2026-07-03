export async function getHotelData() {

  const roomsResponse =
    await fetch(
      "/api/rooms"
    )

  const rooms =
    await roomsResponse.json()

  const settingsResponse =
    await fetch(
      "/api/hotel-settings"
    )

  const settings =
    await settingsResponse.json()

  return {
    rooms,
    settings,
  }
}
