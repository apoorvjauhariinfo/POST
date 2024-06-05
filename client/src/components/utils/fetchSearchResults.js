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

<<<<<<< HEAD
export default fetchSearchResults;
=======
export default fetchSearchResults;
>>>>>>> 8f93ccfe1b20f4f1f15a0d4506f6509ab9b37bc5
