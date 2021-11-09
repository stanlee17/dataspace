const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const searchResults = document.getElementById('search-results');
const errorElement = document.getElementById('error');

class Search {
  constructor() {
    searchForm.addEventListener('submit', this._searchInputHandler.bind(this));
  }

  _searchInputHandler(e) {
    e.preventDefault();

    const query = searchInput.value;

    if (query.trim() == '') {
      setInterval;
      errorElement.innerHTML = 'Search box cannot be blank';
    } else {
      errorElement.innerHTML = '';
      this._getData(query);
      searchInput.value = '';
    }
  }

  async _getData(query) {
    try {
      const result = await fetch(
        `https://images-api.nasa.gov/search?q=${query}&media_type=image`
      );
      const { collection } = await result.json();
      this.items = collection.items;

      this._displayData(this.items.slice(0, 40));

      searchResults.innerHTML = `Showing results for <strong>"${query}"</strong>`;
    } catch (err) {
      return err;
    }
  }

  _displayData(data) {
    let output = '';

    data.forEach((element) => {
      this.date_created = element.data[0].date_created;
      this.title = element.data[0].title;
      this.image = element.links[0].href;
      this.description = element.data[0].description;
      this.location = element.data[0].location;

      const date = new Date(this.date_created);
      this.formattedDate = date.toLocaleString('en-US', {
        weekday: 'long',
        day: 'numeric',
        year: 'numeric',
        month: 'long',
      });

      output += `
      <div class="searched">
        <img class="searched-image" src="${this.image}" alt="${this.title}">
        <div class="searched-content">
          <h2>${this.title}</h2>
          <h4>Date Created: ${this.formattedDate}</h4>
          ${
            this.location
              ? `
          <h4>Location: ${this.location}</h4>
          `
              : ``
          }
          <p>${this.description}</p>
        </div>
      </div>
      `;
    });

    if (output != null) {
      document.getElementById('content').innerHTML = output;
    }
  }
}

const search = new Search();
