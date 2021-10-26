export default class Search {
  async getData() {
    try {
      let res = await fetch(`https://images-api.nasa.gov/search?q=venus`);
      res = await res.json();
      console.log(res);
    } catch (err) {
      return err;
    }
  }
}
