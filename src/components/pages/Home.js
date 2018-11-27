import React from "react";
import { Link } from "react-router-dom";
import Video from "../../images/Pexels Videos 2769.mp4";

const Home = () => (
  <div className="home">
    <div className="hero">
      <video autoPlay loop muted>
        <source src={Video} type="video/mp4" />
      </video>
      <div>
        <h1>GM Admin</h1>
        <h3>Find out how simple it is to manage your campaign!</h3>
        <Link className="button primary" to="/register">
          Register
        </Link>
        <Link className="button red" to="/login">
          Login
        </Link>
      </div>
    </div>
    <div className="home-info">
      <p>
        If you've ever struggled to keep track of your campaign notes and wished
        you could keep them all in one central location, this is for you. Making
        notes for your campaign has never been faster or easier since GM Codex
        allows you to use markdown to write your notes.
      </p>
      <p>
        In addition, GM Codex is system agnostic. We don't care what game you
        play as long as you enjoy playing it. Because of that, all of your notes
        will be a blank slate for you to create the world of your dreams.
      </p>
      <Link to="/register" className="button primary">
        Create your account!
      </Link>
    </div>
  </div>
);
export default Home;
