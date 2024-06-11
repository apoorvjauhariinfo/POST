import axios from "axios";

const fetchSearchResults = async (searchTerm) => {
  const hospitalid = localStorage.getItem("hospitalid");

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}api/products/search?q=${searchTerm}&hospitalid=${hospitalid}`
    );
    // console.log("Search Results:", response.data);
    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default fetchSearchResults;
