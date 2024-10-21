import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import MenuItem from "../../components/UI/MenuItem";
import LoaderOverlay from "../../components/Loader/LoaderOverlay.js";

export default function SearchProductScreen() {
  const [proFilters, setProfilters] = useState({
    manu: false,
    origin: false,
    emergency: false,
    proType: false,
    category: false,
    subCat: false,
  });
  let [loading, setLoading] = useState(false);
  const hospitalid = localStorage.getItem("hospitalid");
  const getprod = async () => {
    const filterParams = {};
    try {
      setLoading(true);
      const url = `${process.env.REACT_APP_BASE_URL}productsdata/${hospitalid}`;
      const { data } = await axios.get(url, { params: { yoo: 4 } });
      setLoading(false);
      console.log(data.documents);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getprod();
  }, []);

  const originFilters = [{ field: "origin", label: "Origin" }];
  function onFilterChange() {
    alert("hello");
  }

  return (
    <main className="main-container">
      <LoaderOverlay loading={loading} />
      <div>
        <section
          className="p-5 w-100"
          style={{
            backgroundColor: "#eeeee",
            borderRadius: ".5rem .5rem 0 0",
          }}
        >
          <div className="row">
            <div className="col">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-3">
                  <Typography
                    variant="h4"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "20px",
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      color: "black",
                      padding: "10px",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                    }}
                  >
                    Products
                  </Typography>
                </div>
                <MenuItem
                  filters={originFilters}
                  selectedFiltersState={proFilters}
                  onChange={onFilterChange}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
