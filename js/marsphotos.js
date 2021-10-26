export default class MarsPhotos {
  async getData() {
    try {
      let res = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?api_key=ZnfBKm3UIHE7QMuadjbpbXSmghb5PSeYoI3lUEUi`
      );
      res = await res.json();
      console.log(res);
    } catch (err) {
      return err;
    }
  }
}
