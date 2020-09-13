const nasaSearchForm = document.querySelector('.nasa-search-form');
const nasaSearchInput = document.querySelector('.nasa-search-input');
const nasaSearchButton = document.querySelector('.nasa-search-button');
const cardList = document.querySelector('.card-list');
import { nasaApiKey } from './nasaApiKey.js';

export const nasaApiKey = 'dA9Chq6KexNxyJM2R3yDt1N3RIto1TsbB5FqrDz2';
const today = new Date().getTime();

const getAPODImage = async (date, month, year) => {
  const apodImagePromise = await fetch(
    `https://api.nasa.gov/planetary/apod/?api_key=${nasaApiKey}&date=${year}-${month}-${date}`
  );
  const apodImage = await apodImagePromise.json();
  return apodImage;
};

const thisWeeksTimeStamps = [
  today,
  today - 86400000,
  today - 172800000,
  today - 259200000,
  today - 345600000,
  today - 432000000,
  today - 518400000,
];

(async () => {
  for (let i = 0; i < thisWeeksTimeStamps.length; i++) {
    const date = new Date(thisWeeksTimeStamps[i]).getDate();
    const month = new Date(thisWeeksTimeStamps[i]).getMonth();
    const year = new Date(thisWeeksTimeStamps[i]).getFullYear();
    const nasaCardData = await getAPODImage(date, month, year);

    cardList.innerHTML += `
        <article class="card">
            <header class="card-header">
            <p>${nasaCardData.date}</p>
            <h2>${nasaCardData.title}</h2>
            </header>

            <div class="card-author">
            <a class="author-avatar" href="#">
                <img src="avatar.png" />
            </a>
            <svg class="half-circle" viewBox="0 0 106 57">
                <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
            </svg>

            <div class="author-name">
                <div class="author-name-prefix">Author</div>
                Jeff Delaney
            </div>
            </div>

            
        </article>
    `;
  }
})();

nasaSearchButton.addEventListener('click', (e) => {
  getAPODImage(nasaSearchInput.value);
  console.log(nasaSearchInput.value);
});
