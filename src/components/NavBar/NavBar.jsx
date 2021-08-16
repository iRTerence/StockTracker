import React from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function NavBar() {
  const logout = () => {
    axios.get("http://localhost:3001/auth/users/logout").then((res) => {
      if (res.data) {
        window.location.href = "/";
      }
    });
  };

  return (
    <div className={styles.navBarWrapper}>
      <ul className={styles.navBar}>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li onClick={logout}>Logout</li>
      </ul>
    </div>
  );
}
