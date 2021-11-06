import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <Wrapper>
      <h1>404</h1>
      <h2>Sorry, page you are looking does not exist.</h2>
      <Link to="/" className="btn">
        Go Back
      </Link>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: var(--clr-primary-10);
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    color: var(--clr-grey-3);
    margin-bottom: 1.6rem;
  }
`;
export default Error;
