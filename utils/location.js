const KEY = process.env.GOOGLE_API_KEY;

export function getMapPreview(lat, long) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${long}&key=${KEY}`;
  
  return imagePreviewUrl;
}
