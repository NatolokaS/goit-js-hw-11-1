
import ref from './js/references';
import { fetchError } from './js/errorHandler';
import './styles.css';
import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const { catSelector, catInfo, loaderText, errorText } = ref;

loaderText.classList.replace('loader', 'is-hidden');
errorText.classList.add('is-hidden');
catInfo.classList.add('is-hidden');

let arrBreedsId = [];
fetchBreeds()
  .then(data => {
    data.forEach(element => {
      arrBreedsId.push({ text: element.name, value: element.id });
    });
    new SlimSelect({
      select: catSelector,
      data: arrBreedsId,
    });
  })
  .catch(fetchError);

catSelector.addEventListener('change', selectBreed);

function selectBreed(event) {
  loaderText.classList.replace('is-hidden', 'loader');
  catSelector.classList.add('is-hidden');
  catInfo.classList.add('is-hidden');

  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      const { url, breeds } = data[0];

      catInfo.innerHTML = `<div class="box-img">
      <img src="${url}" alt="${breeds[0].name}" width="400"/></div>
      <div class="box">
      <h1>${breeds[0].name}</h1>
      <p>${breeds[0].description}</p>
      <p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;
      catInfo.classList.remove('is-hidden');

      loaderText.classList.replace('loader', 'is-hidden');
      catSelector.classList.remove('is-hidden');
    })
    .catch(fetchError);
}