const nasaSearchForm = document.querySelector('.nasa-search-form');
const nasaSearchInput = document.querySelector('.nasa-search-input');
const nasaSearchButton = document.querySelector('.nasa-search-button');
const cardList = document.querySelector('.card-list');
const detailSection = document.querySelector('.parent-details');

const nasaApiKey = 'dA9Chq6KexNxyJM2R3yDt1N3RIto1TsbB5FqrDz2';
const today = new Date().getTime();

const getAPODImage = async (date, month, year) => {
  try {
    const apodImagePromise = await fetch(
      `https://api.nasa.gov/planetary/apod/?api_key=${nasaApiKey}&date=${year}-${month}-${date}`
    );
    const apodImage = await apodImagePromise.json();
    return apodImage;
  } catch {
    return null;
  }
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
            <p>${nasaCardData.date}</p>
            <h2>${nasaCardData.title}</h2>
            <img src="${nasaCardData.url}" />
            <div class="author-name">
                <div class="author-name-prefix"></div>
                <br>
                ${nasaCardData.explanation}
            </div>
        </article>
    `;
  }
})();

cardList.addEventListener('click', async (e) => {
  if (e.target.tagName !== 'SECTION') {
    let card = null;
    if (e.target.tagName === 'ARTICLE') {
      card = e.target.childNodes[1].innerText;
    } else {
      card = e.target.parentElement.childNodes[1].innerText;
    }

    const year = card[0] + card[1] + card[2] + card[3];
    const month = card[5] + card[6];
    const day = card[8] + card[9];

    const cardDetails = await getAPODImage(day, month, year);
    console.log(cardDetails);
    if (cardDetails.explanation) {
      detailSection.innerHTML = `
        <div class="details container">
            <img src="${cardDetails.url}" />
            <p>${cardDetails.date}</p>
            <div class="author-name">
                <h3>Explination: </h3>
                ${cardDetails.explanation}
            </div>
        </div>
    `;
    } else {
      detailSection.innerHTML = `
        <h3>Sorry... there is nothing for that day :(</h3>
    `;
    }
  }
  window.scrollBy(0, 790);
});

// nasa search
nasaSearchButton.addEventListener('click', async () => {
  const card = nasaSearchInput.value;
  const year = card[0] + card[1] + card[2] + card[3];
  const month = card[5] + card[6];
  const day = card[8] + card[9];
  const cardDetails = await getAPODImage(day, month, year);
  if (!cardDetails) {
    detailSection.innerHTML = `
    <div class="details container">
    <div class="details container">
        <img src="${cardDetails.url}" />
        <p>${cardDetails.date}</p>
        <div class="author-name">
            <h3>Explination: </h3>
            ${cardDetails.explanation}
        </div>
    </div>
  </div>
`;
  } else {
    detailSection.innerHTML = `<h3>We are Sorry...</h3>
    <h3>nothing to show for that date.</h3><br/><br/><br/><br/>`;
  }

  window.scrollBy(0, 790);
});
