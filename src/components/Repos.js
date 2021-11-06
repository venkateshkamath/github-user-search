import React from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  const { repos } = React.useContext(GithubContext);

  const languages = repos.reduce((total, current) => {
    const { language, stargazers_count } = current;

    if (!language) return total; // if lang is null, then return total

    // total is an object, that is returned
    if (!total[language]) {
      // if instance is not present then create as 1, we need in terms of label and value
      total[language] = {
        label: language,
        value: 1, // initial value
        stars: stargazers_count, // if empty create a star object
      };
    } else
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: stargazers_count + total[language].stars,
      };

    // total must be returned, no matter what
    return total;
  }, {}); // return value is an object
  // create an array, since the setup is for array and then sort the array and pass 1st five langs(slice)

  const mostUsed = Object.values(languages)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
  // sort based on stars
  const mostStars = Object.values(languages)
    .sort((a, b) => b.stars - a.stars)
    .map((item) => {
      const { stars } = item; // reassign stars to value, because charts take in values not other props
      return { ...item, value: stars };
    })
    .slice(0, 5);

  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, forks, name } = item;
      //creating an object, stars[2], dynamically
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks] = { label: name, value: forks };
      return total;
    },
    { stars: {}, forks: {} }
  );
  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsed} />
        <Column3D data={stars} />
        <Doughnut2D data={mostStars} />
        <Bar3D data={forks} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
