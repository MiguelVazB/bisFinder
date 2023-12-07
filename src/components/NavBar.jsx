import React from "react";
import { Link } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import createOrGetUser from "../utils/createOrGetUser";
import useAuthStore from "../store/auth";
import "../styles/NavBar.css";

const NavBar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();

  return (
    <nav>
      <Link to="/">Home</Link>
      {userProfile ? (
        <div className="loggedInContainer">
          <img
            src={userProfile.picture}
            alt="profile picture"
            referrerPolicy="no-referrer"
          />
          <button
            onClick={() => {
              googleLogout();
              removeUser();
              window.location.reload(false);
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            createOrGetUser(credentialResponse, addUser);
            // window.location.reload(false);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      )}
    </nav>
  );
};

export default NavBar;
