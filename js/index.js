import APOD from './apod.js';
import MarsPhotos from './marsphotos.js';
import Search from './search.js';

const apod = new APOD();
const marsPhotos = new MarsPhotos();
const search = new Search();

apod.getData();
marsPhotos.getData();
search.getData();

const mymap = L.map('issMap').setView([0, 0], 2);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

const marker = L.marker([0, 0])
  .addTo(mymap)
  .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
  .openPopup();

const getISS = async () => {
  const res = await fetch(`https://api.wheretheiss.at/v1/satellites/25544`);
  const data = await res.json();
  console.log(data.latitude, data.longitude);
  marker.setLatLng([data.latitude, data.longitude]);
};

getISS();
setInterval(getISS, 1000);
