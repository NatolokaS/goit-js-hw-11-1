import axios from "axios";

axios.defaults.baseURL = 'https://api.thecatapi.com';
axios.defaults.headers.common["x-api-key"] = "live_kLsh5OzxVa9G4oQzgl97AYvDHLAGEX0BuYhgo9STyQX8ZuGlVqYmcKO95KV2QLXH";

export async function fetchBreeds() {
  const response = await axios.get('/v1/breeds');
  return response.data;
}

export async function fetchCatByBreed(breedId) {
  const response = await axios.get(`/v1/images/search?breed_ids=${breedId}`);
  return response.data;
}