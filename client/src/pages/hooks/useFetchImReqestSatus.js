import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetImReuestStatusData() {
  const imId = localStorage.getItem("inventorymanagerid");
  const hospitalId = localStorage.getItem("hospitalid");

  const [fetchingStatus, setFetchingStatus] = useState("ideal");
  const [resData, setResData] = useState([]);

  useEffect(() => {
    setFetchingStatus("loading");

    async function getRequest() {
      try {
        const urls = [
          `${process.env.REACT_APP_BASE_URL}requestbyImId/${imId}`,
          `${process.env.REACT_APP_BASE_URL}productbyhospitalid/${hospitalId}`,
        ];

        const responses = await Promise.all(urls.map((url) => axios.get(url)));

        const [requestRes, productRes] = responses;

        // if (requestRes.status !== 200 || productRes.status !== 200) {
        //   throw new Error();
        // }

        const requestData = requestRes.data.document;
        const productData = productRes.data.products;

        const rows = [];

        requestData.forEach((el) => {
          const productId = el.productid;

          const product = productData.find((pr) => pr._id === productId);
          const obj = {
            date: el.requestdate,
            productName: "",
            status: el.status,
          };

          rows.push(obj);
        });

        setFetchingStatus("success");
        console.log(rows);
        setResData(rows);
      } catch (error) {
        setFetchingStatus("error");
        console.log("ERRORRRRRRR");
        console.log(error);
      }
    }

    if (imId) {
      getRequest();
    }
  }, [imId, hospitalId]);

  return { status: fetchingStatus, resData };
}
