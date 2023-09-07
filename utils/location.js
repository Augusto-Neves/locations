const KEY = process.env.GOOGLE_API_KEY;

export function getMapPreview(lat, long) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${long}&key=${KEY}`;

  return imagePreviewUrl;
}

export async function getAddress(lat, long) {
  // const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${KEY}}`;
  // const response = await fetch(url);

  // if (!response.ok) throw new Error('Fail to fetch address!');

  // const data = await response.json();
  // const address = data.results[0].formatted_address;

  // return address;
  return 'St Thurusbango Thurusbago, 450, Brazil';
}
