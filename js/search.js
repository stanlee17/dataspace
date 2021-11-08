class Search {
  constructor() {
    this.getData();
  }

  async getData() {
    try {
      const result = await fetch(`https://images-api.nasa.gov/search?q=nasa`);
      const data = await result.json();
      console.log(data);
    } catch (err) {
      return err;
    }
  }
}

const search = new Search();
