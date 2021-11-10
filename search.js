// DOM Variables & API key is initialized
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const searchResults = document.getElementById('search-results');
const errorElement = document.getElementById('error');

class Search {
  constructor() {
    // When user submits, searchInputHandler method will be executed
    searchForm.addEventListener('submit', this._searchInputHandler.bind(this));
  }

  // This method is created for handling search input
  _searchInputHandler(e) {
    e.preventDefault();

    // Get query from the search input
    const query = searchInput.value;

    // Input/Data Validation to make sure that search box is not blank
    if (query.trim() == '') {
      setInterval;
      errorElement.innerHTML = 'Search box cannot be blank';
    } else {
      errorElement.innerHTML = '';

      // Query will be passed on to the getData method if query is not blank
      this._getData(query);

      // Search bar box is cleared after submit
      searchInput.value = '';
    }
  }

  /* To fetch images from the Image Library Search NASA API  */
  async _getData(query) {
    try {
      // Fetch Images from NASA API based on query from search input
      const result = await fetch(
        `https://images-api.nasa.gov/search?q=${query}&media_type=image`
      );
      const { collection } = await result.json();

      // Items data is stored and ready to be displayed to the UI
      this.items = collection.items;

      // Limit this.items array to 40
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

      // Format date to a readable date format
      const date = new Date(this.date_created);
      this.formattedDate = date.toLocaleString('en-US', {
        weekday: 'long',
        day: 'numeric',
        year: 'numeric',
        month: 'long',
      });

      // Display the data output to UI
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

    // If output is not null, display the output
    if (output != null) {
      document.getElementById('content').innerHTML = output;
    }
  }
}

const search = new Search();
