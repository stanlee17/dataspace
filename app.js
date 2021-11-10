// DOM Variables & API key is initialized
const apod = document.querySelector('.apod');
const roversOption = document.querySelectorAll('.latest-rovers ul li');
const roverImage = document.getElementById('rover-image');
const showAnotherImage = document.getElementById('show-another');
const api_key = config.API_KEY;

class App {
  // Class object variables is initialized in order to make these object variables be accesible globally
  #marker;
  #option;

  /* To ensure that APOD, leaflet map, ISS location, latest mars photos code is loaded and rendered 
  to the UI */
  constructor() {
    // These method will be executed and displayed to the UI
    this._getAPOD();
    this._loadMap();
    this._getISS();

    // ISS location, latitude, longitude and velocity data will be updated every 1 second
    setInterval(this._getISS.bind(this), 1000);

    this._getLatestPhotos();
    this._roversOptionHandler();

    // When show another button is clicked, new/another latest mars photo will be shown to UI
    showAnotherImage.addEventListener('click', () =>
      this._getLatestPhotos(this.#option)
    );
  }

  /* To fetch and display Picture of the Day (APOD) data to UI */
  async _getAPOD() {
    try {
      // Fetch APOD from the NASA API
      const result = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${api_key}`
      );
      const data = await result.json();

      // Copyright, title, date, explanation, image data is stored and is ready is be displayed
      this.copyright = data.copyright;
      this.title = data.title;
      this.date = data.date;
      this.explanation = data.explanation;
      this.imageUrl = data.url;

      // displayAPOD Method is called to display apod data shown above
      this._displayAPOD();
    } catch (err) {
      return err;
    }
  }

  /* This method contains HTML template to display APOD data to UI */
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

  /* 
    This method is implemented to validate whether this.imageUrl url is a youtube video or an image, the method will 
    return true if it is a youtube url, otherwise will return false
  */
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

  /* This method is to fetch ISS through wheretheiss API in order to obtain ISS location data (latitude, longitude, velocity) */
  async _getISS() {
    // API is fetched and data is obtained
    const res = await fetch(`https://api.wheretheiss.at/v1/satellites/25544`);
    const data = await res.json();

    // Data is stored and ready to be displayed to UI
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.velocity = data.velocity;

    // To set the location marker based on ISS latitude and longitude
    this.#marker.setLatLng([this.latitude, this.longitude]);

    // To display popup. The data API containing latitude, longitude and velocity will be displayed inside the popup
    this.#marker
      .bindPopup(
        `Latitude: ${this.latitude} <br /> Longitude: ${
          this.longitude
        } <br /> Velocity: ${Math.round(this.velocity)} km`
      )
      .openPopup();
  }

  /* This method is to load the map from the leaflet library */
  _loadMap() {
    const mymap = L.map('issMap').setView([0, 0], 2);
    const attribution =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(mymap);

    // iss icon is added ready to display to the marker
    const issIcon = L.icon({
      iconUrl: './images/iss200.png',
      iconSize: [75, 48],
      iconAnchor: [37.5, 10],
    });

    this.#marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);
  }

  /* To toggle active class to the button and receive data-options attribute value */
  _roversOptionHandler() {
    roversOption.forEach((rover) => {
      rover.addEventListener('click', () => {
        // Toggle active class to one of the buttons
        roversOption.forEach((rover) => {
          rover.classList.remove('active');
        });
        rover.classList.add('active');

        // Get data-options attribute rover value e.g. perseverance
        this.#option = rover.getAttribute('data-options');

        // Pass on data option attribute to getLatestPhotos method
        this._getLatestPhotos(this.#option);
      });
    });
  }

  /* To fetch & display latest mars photos based on rovers (perseverance, curiosity, opportunity or spirit)  */
  _getLatestPhotos = async (option) => {
    try {
      // API is fetched, rover option will be set to perseverance by default when the page loads
      const result = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${
          option ? option : 'perseverance'
        }/latest_photos?api_key=${api_key}`
      );
      const { latest_photos } = await result.json();

      /* 
         latest_photos variables will contain an array of objects, those objects will be randomised 
         each time this method is executed 
      */
      const randomImage =
        latest_photos[Math.floor(Math.random() * latest_photos.length)];

      // Image url data is stored ready to be displayed
      this.img_src = randomImage.img_src;

      // Rover image will be displayed to the UI
      roverImage.src = this.img_src;
    } catch (err) {
      return err;
    }
  };
}

const app = new App();
