import APOD from './apod.js';
import MarsPhotos from './marsphotos.js';
import Search from './search.js';
import ISSLocation from './issLocation.js';

const apod = new APOD();
const marsPhotos = new MarsPhotos();
const search = new Search();
const issLocation = new ISSLocation();

apod.getData();
marsPhotos.getData();
search.getData();
issLocation.getData();
