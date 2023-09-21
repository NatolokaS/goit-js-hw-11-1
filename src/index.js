import Notify from 'notiflix';
import ref from './js/references';
import { fetchError } from './js/errorHandler';
import './styles.css';
import { getCards } from "./js/cat-api";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const { gallery, searchForm, loaderText, errorText, moreButton } = ref;

loaderText.classList.replace('loader', 'is-hidden');
errorText.classList.add('is-hidden');
moreButton.classList.add('is-hidden');

const perPage = 40;
let page = 1;
let searchKey = '';

function onSubmit(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  page = 1;
  const { searchQuery } = event.currentTarget.elements;
  searchKey = searchQuery.value.trim().toLowerCase();

  if (searchKey === '') {
    Notify.info('Field is empty');
    return;
  }
  getCards(searchKey, page, perPage)
    .then(data => {
    const searchResults = data.hits;
      if (data.totalHits === 0) {
        
        Notify.failure(
          'Images was not found with such query.'
        ); 
      } else { 
        renderCards(searchResults);
        lightbox.refresh();
      };
  
    if (data.totalHits > perPage) {
      moreButton.classList.remove('is-hidden');
    } else if (data.totalHits < perPage) {
      moreButton.classList.add('is-hidden')
    }
  })
    .catch(fetchError);
  event.currentTarget.reset();
  renderCards(getCards(searchKey));
}

searchForm.addEventListener('submit', onSubmit);
moreButton.addEventListener('click', onClickMore);


function renderCards(searchResults) {
  const markup = searchResults.map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card"><div class="img_wrapper">
  <a href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a></div>
  <div class="info">
    <p class="info-item">
      <b>${likes} Likes</b>
    </p>
    <p class="info-item">
      <b>${views} Views</b>
    </p>
    <p class="info-item">
      <b>${comments} Comments</b>
    </p>
    <p class="info-item">
      <b>${downloads} Downloads</b>
    </p>
  </div>
</div>`}
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

let lightbox = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function onClickMore() {
  page += 1;
    getCards(searchKey, page, perPage)
    .then(data => {
      const searchResults = data.hits;
      const numberOfPage = Math.ceil(data.totalHits / perPage);

      renderCards(searchResults);
      if (page === numberOfPage) {
        moreButton.classList.add('is-hidden');
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        moreButton.removeEventListener('click', onClickMore);
      }
      lightbox.refresh();
    })
    .catch(fetchError);
};


function fetchError() {
  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or make another choice!'
  );
}

