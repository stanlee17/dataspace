export default class MarsPhotos {
  async getData() {
    try {
      const result = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?api_key=ZnfBKm3UIHE7QMuadjbpbXSmghb5PSeYoI3lUEUi`
      );
      const data = await result.json();
      console.log(data);
    } catch (err) {
      return err;
    }
  }
}
