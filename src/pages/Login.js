import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import loginImg from "../images/login-img.svg";
const Login = () => {
  // we have login with redirect property that redirects the page to start 
  const {loginWithRedirect} = useAuth0()
  return (
    <Wrapper>
      <div className="container">
        <img src={loginImg} alt="github" />
        <h1>Github  Engine</h1>
        <button onClick={loginWithRedirect} className="btn">Login</button>
      </div>
      
    </Wrapper>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
  img {
    margin-bottom: 2rem;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
`;
export default Login;
