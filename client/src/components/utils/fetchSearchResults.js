import axios from "axios";

const fetchSearchResults = async (searchTerm) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}api/products/search?q=${searchTerm}`
    );
    // console.log("Search Results:", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};


export default fetchSearchResults;
