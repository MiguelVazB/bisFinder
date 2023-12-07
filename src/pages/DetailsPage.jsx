import React, { useEffect, useState } from "react";
import axios from "axios";
import noProfilePic from "../assets/noProfilePic.png";
import { useLocation } from "react-router-dom";
import useAuthStore from "../store/auth";
import LikeButton from "../components/LikeButton";
import "../styles/DetailsPage.css";

const DetailsPage = () => {
  const locationHook = useLocation();
  const { userProfile } = useAuthStore();
  const { id, name, rating, location, display_address, categories, image_url } =
    locationHook.state;

  const [reviews, setReviews] = useState("");
  const [reviewsDetails, setReviewsDetails] = useState("");

  useEffect(() => {
    if (id) {
      const options = {
        method: "GET",
        url: `https://bisfinderserver.onrender.com/businesses/bis/${id}`,
      };

      axios
        .request(options)
        .then(function (response) {
          setReviews(response.data.reviews);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    if (reviews.length > 0) {
      let formattedReviews = reviews.map((review) => {
        const { id, rating, text, time_created, user } = review;
        return (
          <div className="reviewBox" key={id}>
            <div className="reviewInfo">
              <div className="userReviewInfo">
                <div className="imageContainer">
                  <img
                    src={user?.image_url ? user.image_url : noProfilePic}
                    alt="profile picture"
                  />
                </div>
                <div className="nameAndRating">
                  <p>{user.name}</p>
                  <p className="userRating">{`${rating} ${getNumberOfStars(
                    rating
                  )}`}</p>
                </div>
              </div>
            </div>
            <div className="reviewAndDate">
              <div>{text}</div>
              <div className="reviewTimeCreated">{time_created}</div>
            </div>
          </div>
        );
      });
      setReviewsDetails(formattedReviews);
    }
  }, [reviews]);

  function getNumberOfStars(ratingValue) {
    return "⭐".repeat(ratingValue);
  }

  return (
    <div className="detailsPage">
      <div className="businessInfoContainer">
        <div className="businessNameAndLikeBtn">
          <h1 className="businessName">{name}</h1>
          {userProfile ? <LikeButton bisId={id} user={userProfile} /> : ""}
        </div>
        <p>{`Rating: ${rating} ${getNumberOfStars(rating)}`}</p>
        <p>
          Address:{" "}
          {display_address
            ? display_address[0] + display_address[1]
            : `${location.address1}, ${location.city}, ${location.zip_code}`}
        </p>
        <ul>
          {categories.map((category) => {
            return <li key={category.alias}>{category.title}</li>;
          })}
        </ul>
        <div className="reviewsContainer">{reviewsDetails}</div>
      </div>
      <div className="businessImageContainer">
        <img
          src={image_url}
          alt={`Picture of ${name} or food served at that location`}
        />
      </div>
    </div>
  );
};

export default DetailsPage;
