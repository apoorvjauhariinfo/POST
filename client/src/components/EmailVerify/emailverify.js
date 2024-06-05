import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../assets/success.png";
import styles from "./style.module.css";
import { Fragment } from "react";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

<<<<<<< HEAD
	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `http://localhost:4000/api/users/${param.id}/verify/${param.token}`;
				const { data } = await axios.get(url);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);
=======
  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `${process.env.REACT_APP_BASE_URL}api/users/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);
>>>>>>> 8f93ccfe1b20f4f1f15a0d4506f6509ab9b37bc5

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
    </Fragment>
  );
};

export default EmailVerify;
