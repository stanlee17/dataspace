export default class APOD {
  async getData() {
    try {
      let res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=ZnfBKm3UIHE7QMuadjbpbXSmghb5PSeYoI3lUEUi`
      );
      res = await res.json();

      this.copyright = res.copyright;
      this.title = res.title;
      this.date = res.date;
      this.explanation = res.explanation;
      this.imageUrl = res.url;

      this.displayData();
    } catch (err) {
      return err;
    }
  }

  displayData() {
    const apod = document.querySelector('.apod');
    apod.innerHTML = `
    <h1 class="apod-heading">Picture of the Day</h1>
    <div class="apod-wrapper">
      <img class="apod-image" src="${this.imageUrl}" alt="${this.title}">
      <div class="apod-content">
        <h1 class="apod-title">${this.title}</h1>
        <h3 class="apod-copyright">By ${this.copyright}</h3>
        <p class="apod-explanation">${this.explanation}</p>
      </div>
    </div>
    `;
  }
}
