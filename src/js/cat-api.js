import axios from "axios";
var API_KEY = '39471314-85991d945a1adbb62f327094b';
export async function getCards(searchValue, page, perPage) {
  var URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(searchValue) +"&page="+page+"&per_page="+perPage+ "&image_type=photo&orientation=horizontal&safesearch=true";
  const response = await axios.get(URL);
  return response.data;
}