const api_key = 'ZnfBKm3UIHE7QMuadjbpbXSmghb5PSeYoI3lUEUi';

const apod = document.querySelector('.apod');
const roversOption = document.querySelectorAll('.latest-rovers ul li');
const roverImage = document.getElementById('rover-image');
const showAnotherImage = document.getElementById('show-another');

class App {
  #marker;
  #option;

  constructor() {
    this._getAPOD();
    this._loadMap();
    this._getISS();
    setInterval(this._getISS.bind(this), 1000);
    this._getLatestPhotos();
    this._roversOptionHandler();
    showAnotherImage.addEventListener('click', () =>
      this._getLatestPhotos(this.#option)
    );
  }

  async _getAPOD() {
    try {
      const result = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${api_key}`
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

  _validateYouTubeUrl(url) {
    if (url) {
      const regExp =
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      if (url.match(regExp)) {
        return true;
      }
    }
    return false;
  }

  async _getISS() {
    const res = await fetch(`https://api.wheretheiss.at/v1/satellites/25544`);
    const data = await res.json();

    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.velocity = data.velocity;

    this.#marker.setLatLng([this.latitude, this.longitude]);

    this.#marker
      .bindPopup(
        `Latitude: ${this.latitude} <br /> Longitude: ${
          this.longitude
        } <br /> Velocity: ${Math.round(this.velocity)} km`
      )
      .openPopup();
  }

  _displayAPOD() {
    apod.innerHTML = `
    <h1 class="apod-heading">Picture of the Day</h1>
    <div class="apod-wrapper">
      ${
        this._validateYouTubeUrl(this.imageUrl)
          ? `
      <iframe class="apod-iframe" src="${this.imageUrl}"></iframe>
      `
          : `
      <img class="apod-image" src="${this.imageUrl}" alt="${this.title}">
      `
      }
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
      iconSize: [75, 48],
      iconAnchor: [37.5, 10],
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
        this.#option = rover.getAttribute('data-options');
        this._getLatestPhotos(this.#option);
      });
    });
  }

  _getLatestPhotos = async (option) => {
    try {
      const result = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${
          option ? option : 'perseverance'
        }/latest_photos?api_key=${api_key}`
      );
      const { latest_photos } = await result.json();
      const randomImage =
        latest_photos[Math.floor(Math.random() * latest_photos.length)];

      this.img_src = randomImage.img_src;

      roverImage.src = this.img_src;
    } catch (err) {
      return err;
    }
  };
}

const app = new App();
