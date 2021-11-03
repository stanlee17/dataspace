export default class APOD {
  async getData() {
    try {
      const result = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=ZnfBKm3UIHE7QMuadjbpbXSmghb5PSeYoI3lUEUi`
      );
      const data = await result.json();

      this.copyright = data.copyright;
      this.title = data.title;
      this.date = data.date;
      this.explanation = data.explanation;
      this.imageUrl = data.url;

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
        <h3 class="apod-copyright">${
          this.copyright ? `By ${this.copyright}` : ''
        }</h3>
        <p class="apod-explanation">${this.explanation}</p>
      </div>
    </div>
    `;
  }
}
