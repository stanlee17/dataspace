export default class Search {
  async getData() {
    try {
      const result = await fetch(`https://images-api.nasa.gov/search?q=venus`);
      const data = await result.json();
      console.log(data);
    } catch (err) {
      return err;
    }
  }
}
