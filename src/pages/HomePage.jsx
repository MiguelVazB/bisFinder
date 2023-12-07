import { React } from "react";
import { Link } from "react-router-dom";
import LaPic from "../assets/LA.jpg";
import SdPic from "../assets/SD.jpg";
import FresnoPic from "../assets/Fresno.jpg";
import SfPic from "../assets/SF.jpg";
import SjPic from "../assets/SJ.jpg";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="homePage">
      <Link to="/city/LA">
        <p>Los Angeles</p>
        <img src={LaPic} />
      </Link>
      <Link to="/city/SD">
        <p>San Diego</p>
        <img src={SdPic} />
      </Link>
      <Link to="/city/SJ">
        <p>San Jose</p>
        <img src={SjPic} />
      </Link>
      <Link to="/city/SF">
        <p>San Francisco</p>
        <img src={SfPic} />
      </Link>
      <Link to="/city/Fresno">
        <p>Fresno</p>
        <img src={FresnoPic} />
      </Link>
    </div>
  );
};

export default HomePage;
