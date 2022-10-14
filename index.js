// The url from which we are getting our json object
const countries = fetch("https://restcountries.com/v3.1/all");

// get the main container for all the elements
let card = document.querySelector(".countries-card");

// Get the search input
let searchCountry = document.getElementById("search-country");

// Get the container for a single card country
let countryCard = document.querySelectorAll(".card");

// Get the loader element
let loader = document.querySelector(".loading");

async function getCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

// get countries from our promise object and show our render our data
getCountries().then((data) => {
  displayCountries(data);
  loader.style.display = "none";
});

// Display the countries
let displayCountries = (countries) => {
  const allCountries = countries
    .map(
      (country) => `
      <div class="card">
        <img src=${country.flags.png}>
        <article>
            <header>${country.name.official}</header>
            <ul>
                <li>Capital: ${country.capital}</li>
                <li>Region: ${country.region}</li>
                <li>Flag: ${country.flag}</li>
                <li>Population: ${country.population}</li>
                <li>Continent: ${country.region}</li>
                <li>Timezone: ${country.timezones}</li>
                <li>TLD: ${country.tld}</li>
             </ul>
        </article>
    </div>
    `
    )
    .join("");
  card.innerHTML = allCountries;
};

// search for a specific country
searchCountry.addEventListener("keyup", (e) => {
  let searchedCountry = e.target.value.toLowerCase();
  let countryname = document.querySelectorAll("header");

  countryname.forEach((country) => {
    let lowerCaseCountry = country.textContent.toLowerCase();
    if (lowerCaseCountry.includes(searchedCountry)) {
      country.parentNode.parentNode.style.display = "block";
    } else {
      country.parentNode.parentNode.style.display = "none";
    }
  });
});
