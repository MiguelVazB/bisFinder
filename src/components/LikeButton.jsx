import React, { useEffect, useState } from "react";
import useAuthStore from "../store/auth";
import LikeIcon from "../assets/loveRed.png";
import UnLikeIcon from "../assets/loveGray.png";
import axios from "axios";

async function handleClick(bisId, user, likes, updateUser) {
  try {
    if (!likes.includes(bisId)) {
      likes.push(bisId);

      const response = await axios.put(
        "https://bisfinderserver.onrender.com/user/likes",
        {
          user,
          likes,
        }
      );

      updateUser(response.data);
    } else {
      likes.splice(likes.indexOf(bisId), 1);
      const response = await axios.put(
        "https://bisfinderserver.onrender.com/user/likes",
        {
          user,
          likes,
        }
      );
      updateUser(response.data);
    }
  } catch (error) {
    console.log(error)
  }
}

async function getLikes(user) {
  try {
    const response = await axios.get(
      "https://bisfinderserver.onrender.com/user/getLikes",
      {
        params: { user: user },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

function LikeButton({ bisId, user }) {
  const { updateUser } = useAuthStore();
  const [userLikes, setUserLikes] = useState([]);

  useEffect(() => {
    async function fetchLikes() {
      try {
        const likes = await getLikes(user);
        setUserLikes(likes);
      } catch (error) {
        setUserLikes([]);
      }
    }

    fetchLikes();
  }, [user, updateUser]);

  const styles = {
    container: {
      margin: "20px",
      cursor: "pointer",
    },
  };

  return (
    <div onClick={() => handleClick(bisId, user, userLikes, updateUser)}>
      <img
        style={styles.container}
        src={userLikes?.includes(bisId) ? LikeIcon : UnLikeIcon}
        alt="Like or Unlike button"
      />
    </div>
  );
}

export default LikeButton;
