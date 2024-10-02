import { useEffect, useState } from "react";
import Axios from "axios";

export default function useGetProductViewData(id) {
  const [fetchingState, setFetchingState] = useState("idle");
  const [resData, setResData] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [issueData, setIssueData] = useState(null);

  const bufferToBase64 = (buf) => {
    let binary = "";
    const bytes = [].slice.call(new Uint8Array(buf));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  };

  async function getProductData() {
    setFetchingState("loading");
    const urls = [
      `${process.env.REACT_APP_BASE_URL}productbyid/${id}`,
      `${process.env.REACT_APP_BASE_URL}stockbyproductid/${id}`,
      `${process.env.REACT_APP_BASE_URL}issuebyproductid/${id}`,
    ];
    try {
      const [
        { data: proData, statusText: statusTextPro },
        { data: stoData, statusText: statusTextStok },
        { data: issData, statusText: statusTextIss },
      ] = await Axios.all(urls.map((l) => Axios.get(l)));

      if (
        statusTextPro === "OK" &&
        statusTextStok === "OK" &&
        statusTextIss === "OK" &&
        proData.product.length !== 0 &&
        stoData.documents.length !== 0 &&
        issData.issueDetails.length !== 0
      ) {
        const product = proData.product[0];
        const imgSrc = bufferToBase64(product.productImage.data);
        product.productImage = "data:image/jpeg;base64," + imgSrc;
        setFetchingState("success");
        setStockData(stoData.documents);
        setResData(product);
        setIssueData(issData.issueDetails);
        return;
      }

      throw new Error();
    } catch (err) {
      setFetchingState("error");
      console.log(err);
    }
  }

  useEffect(() => {
    getProductData();
  }, []);

  return { resData, fetchingState, stockData, issueData };
}

