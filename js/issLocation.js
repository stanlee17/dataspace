export default class ISSLocation {
  async getData() {
    try {
      let res = await fetch(`https://api.wheretheiss.at/v1/satellites/25544`);
      res = await res.json();
      console.log(res);
    } catch (err) {
      return err;
    }
  }
}
