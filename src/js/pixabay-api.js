import axios from 'axios';

const API_KEY = 'ТВІЙ_КЛЮЧ_PIXABAY'; // ← постав свій ключ з https://pixabay.com/api/docs/
const BASE_URL = 'https://pixabay.com/api/';

export function getImagesByQuery(query) {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data);
}
