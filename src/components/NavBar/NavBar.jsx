import React, { useContext } from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { myContext } from "../../contexts/UserContext";

export default function NavBar() {
  const userObject = useContext(myContext);

  const logout = () => {
    axios
      .get("http://localhost:3001/api/users/logout", { withCredentials: true })
      .then((res) => {
        if (res.data === "done") {
          window.location.href = "/";
        }
      });
  };

  let search = userObject ? <Link to='/search'>Search</Link> : null;

  let loggedIn = userObject ? (
    <li onClick={logout}>Logout</li>
  ) : (
    <li>
      <Link to='/login'>Login</Link>
    </li>
  );

  return (
    <div className={styles.navBarWrapper}>
      <ul className={styles.navBar}>
        <li>
          <Link to='/'>Home</Link>
        </li>
        {search}
        {loggedIn}
      </ul>
    </div>
  );
}
