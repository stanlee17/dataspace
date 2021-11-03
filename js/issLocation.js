export default class ISSLocation {
  _loadMap() {
    let map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([0, 0])
      .addTo(map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();
  }

  async getData() {
    try {
      let res = await fetch(`https://api.wheretheiss.at/v1/satellites/25544`);
      res = await res.json();
      console.log(res);
      this._loadMap();
    } catch (err) {
      return err;
    }
  }
}
