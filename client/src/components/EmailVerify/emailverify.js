import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../assets/success.png";
import styles from "./style.module.css";
import { Fragment } from "react";
import LoaderOverlay from "../Loader/LoaderOverlay.js";
const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        setLoading(true);
        const url = `${process.env.REACT_APP_BASE_URL}api/users/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <Fragment>
      {validUrl ? (
        <div className={styles.container}>
          <img src={success} alt="success_img" className={styles.success_img} />
          <h1>Email verified successfully</h1>
          <Link to="/login">
            <button className={styles.green_btn}>Login</button>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
      <LoaderOverlay loading={loading} />
    </Fragment>
  );
};

export default EmailVerify;
