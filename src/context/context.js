import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  // loadig and requests
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState(0);
  // error state
  const [error, setError] = useState({ show: false, msg: "" });
  // requestHandler

  const checkRequests = async () => {
    const resp = await fetch(`${rootUrl}/rate_limit`);
    const data = await resp.json();
    let {
      rate: { remaining },
    } = data;

    setRequests(remaining);

    //if remaining is 0 do something
    if (remaining === 0) {
      // we call in the toggleError and pass the arguments
      toggleError(true, "You have exceeded the request limit");
    }
  };

  // errorToggler, put the default values
  const toggleError = (show = false, msg = "") => {
    setError({ show: show, msg: msg }); // I pass true or false when I call, that will be assigned
  };

  const searchGithubUser = async (user) => {
    // we fetch the user
    setLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );

    if (response) {
      // setthe toggle with default
      toggleError();
      // set the response
      setGithubUser(response.data);
      const { login, followers_url } = response.data;
      //repos, got with login of the response,data and not the user passed
      // axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((repos) =>
      //   setRepos(repos.data)
      // );
      // // followers
      // axios(`${followers_url}?per_page=100`).then((res) =>
      //   setFollowers(res.data)
      // );
      //Promise.allSettled, this will fulfill both and give op together, pass in array
      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
        // destructure the arrays
        const [repos, followers] = results;
         
          if(repos.status='fulfilled')
          setRepos(repos.value.data)

          if(followers.status='fulfilled')
          setFollowers(followers.value.data)
      })
        .catch((err) => console.log(err));
      // set the loading
    } else {
      toggleError(true, "The user is not found");
    }
    setLoading(false);
    checkRequests();
  };

  useEffect(() => {
    checkRequests();
  }, []); // useEffect on loading

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        followers,
        repos,
        requests,
        error,
        searchGithubUser,
        loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
