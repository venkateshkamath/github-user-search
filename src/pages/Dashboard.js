import React, { useContext } from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import loadingGif from "../images/preloader.gif";
import { GithubContext } from "../context/context";
const Dashboard = () => {
  const { loading } = useContext(GithubContext);
  if (loading) {
    // loading is on
    return (
      <main>
        <Navbar />
        <Search />
        <img className="loading-img" alt="loading the page" src={loadingGif} />
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
