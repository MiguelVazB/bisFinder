import { React, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth";
import LaPic from "../assets/LA.jpg";
import SdPic from "../assets/SD.jpg";
import FresnoPic from "../assets/Fresno.jpg";
import SfPic from "../assets/SF.jpg";
import SjPic from "../assets/SJ.jpg";
import LikeButton from "../components/LikeButton";
import "../styles/BusinessPage.css";

const BusinessPage = ({ city }) => {
  const navigate = useNavigate();

  const [businesses, setBusinesses] = useState("");
  const [businessesNames, setBusinessesNames] = useState("");
  const [showLikeButton, setShowLikeButton] = useState(false);

  const { userProfile } = useAuthStore();

  useEffect(() => {
    userProfile !== null ? setShowLikeButton(true) : setShowLikeButton(false);
  }, [userProfile]);

  useEffect(() => {
    if (city) {
      const options = {
        method: "GET",
        url: `https://bisfinderserver.onrender.com/businesses/${city}`,
      };

      axios
        .request(options)
        .then(function (response) {
          setBusinesses(response.data.businesses);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    if (businesses.length > 0) {
      let names = businesses.map((business, index) => {
        return (
          <div className="businessBox" key={business.id}>
            <div
              className="businessInfo"
              onClick={() =>
                navigate(`./bis/${business.name}`, { state: businesses[index] })
              }
            >
              <img src={business.image_url} />
              <p>{business.name}</p>
            </div>
            {showLikeButton && (
              <LikeButton bisId={business.id} user={userProfile} />
            )}
          </div>
        );
      });
      setBusinessesNames(names);
    }
  }, [businesses, showLikeButton, userProfile]);

  function getCityImage() {
    switch (city) {
      case "Los Angeles":
        return LaPic;
      case "San Francisco":
        return SfPic;
      case "San Diego":
        return SdPic;
      case "Fresno":
        return FresnoPic;
      case "San Jose":
        return SjPic;
      default:
        return null;
    }
  }

  return (
    <div className="businessPage">
      <div className="cityInfo">
        <h1>{city}</h1>
        <img src={getCityImage()} alt={`${city} Image`} />
      </div>
      <div className="businessesContainer">
        {businessesNames.length > 0 && businessesNames}
      </div>
    </div>
  );
};

export default BusinessPage;
