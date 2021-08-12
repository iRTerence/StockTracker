import React from "react";
import googleImage from "../../../src/assets/Googleimage.png";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const googleLogin = () => {
    window.open("http://localhost:3001/auth/google", "_self");
  };

  return (
    <div className={styles.loginPage}>
      <h1>LoginPage</h1>
      <div className={styles.loginForm}></div>
      <h1>Login</h1>
      <div className={styles.googleContainer} onClick={googleLogin}>
        <img src={googleImage} alt='Google Icon' />
        Login with Google
      </div>
    </div>
  );
}
