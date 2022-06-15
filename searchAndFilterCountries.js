const url = "https://restcountries.com/v2/all";

const itemsContainer = document.querySelector(".items-container");
const searchField = document.querySelector(".search");
const select = document.querySelector(".select");

function useState() {
  let _state = null;

  function getState() {
    return _state;
  }

  function setState(data) {
    _state = [...data];
  }

  return [getState, setState];
}

const [getState, setState] = useState();

function cardTemplate(data) {
  const { flag, name, population, region, capital, alpha3Code } = data;

  return `
  <a href="/${alpha3Code}" class="item">
  <article class='country-container'>
  <ul class='country-item'>
  <li>
  <div class='country-flag' style='background-image: url(${flag}); background-repeat: no-repeat; background-size: cover; background-position: center;'>
  </li>
  <li>
  <h2 class="country-name">${name}</h2>
  </li>
  <li>
  <div class="country-info">
  <p class="country-population"><span>Population:</span> ${population.toLocaleString()}</p>
  <p class="country-region"><span>Region:</span> ${region}</p>
  <p class="country-capital"><span>Capital:</span> ${capital}</p>
  </div>
  </li>
  </ul>
  </article>
  </a>
  `;
}

function getRegionNames(data) {
  const names = data.map((item) => item.region);
  const uniqueNames = [...new Set(names)];
  return uniqueNames;
}

async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function handleSearchInputChange(e) {
  const value = e.target.value.toLowerCase();
  const data = getState();
  const filteredItems = data.filter((item) =>
    item.name.toLowerCase().includes(value)
  );
  renderProjectsToDom(filteredItems);
}

function handleSelectInputChange(e) {
  const value = e.currentTarget.value.toLowerCase();
  const data = getState();
  const filteredItems = data.filter((item) =>
    value.toLowerCase() === "all"
      ? item
      : item.region.toLowerCase() === value.toLowerCase()
  );
  renderProjectsToDom(filteredItems);
}

function renderProjectsToDom(data) {
  let items = data.map((item) => cardTemplate(item)).join("");
  itemsContainer.innerHTML = items;
}

function renderSelectItemsToDom(data) {
  let items = ['<option selected value="all">Filter by Region</option>'];
  data.forEach((item) => {
    items.push(`<option value="${item}">${item}</option>`);
  });
  select.innerHTML = items.join("");
}

async function handleInitialLoad() {
  const data = await getData(url);
  setState(data);

  const regionNames = getRegionNames(getState());
  renderSelectItemsToDom(regionNames);

  renderProjectsToDom(getState());
}

window.addEventListener("DOMContentLoaded", handleInitialLoad);
searchField.addEventListener("keyup", handleSearchInputChange);
select.addEventListener("change", handleSelectInputChange);
