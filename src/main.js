import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const searchInput = form.elements['search-text'];

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }

      createGallery(data.hits);
    })
    .catch(error => {
      iziToast.error({
        message: 'Something went wrong. Please try again later.',
        position: 'topRight',
      });
      console.error(error);
    })
    .finally(() => {
      hideLoader();
    });

  form.reset();
}
