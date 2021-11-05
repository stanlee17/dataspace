import APOD from './apod.js';
import MarsPhotos from './marsphotos.js';
import Search from './search.js';

const apod = new APOD();
const marsPhotos = new MarsPhotos();
const search = new Search();

apod.getData();
marsPhotos.getData();
search.getData();

// Realtime ISS Location
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

const marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);

async function getISS() {
  const res = await fetch(`https://api.wheretheiss.at/v1/satellites/25544`);
  const data = await res.json();
  console.log(data.latitude, data.longitude);
  marker.setLatLng([data.latitude, data.longitude]);
}

getISS();
setInterval(getISS, 1000);
