import axios from "axios";
import { jwtDecode } from "jwt-decode";

const createOrGetUser = async (res, addUser) => {
  const { name, picture, sub } = jwtDecode(res.credential);

  const user = {
    id: sub,
    name: name,
    picture: picture,
  };

  addUser(user);

  await axios.post("https://bisfinderserver.onrender.com/user/login", user);
};

export default createOrGetUser;
