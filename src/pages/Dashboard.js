import React, { useContext } from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import loadingImage from "../images/preloader.gif";
import { GithubContext } from "../context/context";
const Dashboard = () => {
  const { loading } = useContext(GithubContext);
  if (loading) {
    // loading is on
    return (
      <main>
        <Navbar />
        <Search />
        <img
          className="loading-img"
          alt="loading the page"
          src={loadingImage}
        />
      </main>
    );
  } else
    return (
      <main>
        <Navbar />
        <Search />
        <Info />
        <User />
        <Repos />
      </main>
    );
};

export default Dashboard;
