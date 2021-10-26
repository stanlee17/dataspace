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
    const apod = document.getElementById('apod');
    apod.innerHTML = `
    <div class="apod-wrapper">
      <h1 class="apod-title">${this.title}</h1>
      <img src="${this.imageUrl}" alt="${this.title}">
      <h3 class="apod-copyright">${this.copyright}</h3>
      <h3 class="apod-date">${this.date}</h3>
      <p class="apod-explanation">${this.explanation}</p>
    </div>
    `;
  }
}
