const apod = document.querySelector('.apod');
const roversOption = document.querySelectorAll('.latest-rovers ul li');

class App {
  #marker;

  constructor() {
    this._getAPOD();
    this._loadMap();
    this._getISS();
    setInterval(this._getISS.bind(this), 1000);
    this._roversOptionHandler();
  }

  async _getAPOD() {
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

      this._displayAPOD();
    } catch (err) {
      return err;
    }
  }

  async _getISS() {
    const res = await fetch(`https://api.wheretheiss.at/v1/satellites/25544`);
    const data = await res.json();
    const { latitude, longitude, velocity } = data;

    this.#marker.setLatLng([latitude, longitude]);

    this.#marker
      .bindPopup(
        `Latitude: ${latitude} <br /> Longitude: ${longitude} <br /> Velocity: ${Math.round(
          velocity
        )} km`
      )
      .openPopup();
  }

  _displayAPOD() {
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

  _loadMap() {
    const mymap = L.map('issMap').setView([0, 0], 2);
    const attribution =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(mymap);

    const issIcon = L.icon({
      iconUrl: './images/iss200.png',
      iconSize: [50, 32],
      iconAnchor: [25, 16],
    });

    this.#marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);
  }

  _roversOptionHandler() {
    roversOption.forEach((rover) => {
      rover.addEventListener('click', () => {
        roversOption.forEach((rover) => {
          rover.classList.remove('active');
        });

        rover.classList.add('active');
      });
    });
  }

  _roversOption() {}
}

const app = new App();
