import React from "react";
import Hero from "../components/Hero";
import Content from "../components/Content";

function AboutPage(props) {
  return (
    <div>
      <Hero title={props.title}></Hero>
      <Content>
        <p>
          I'm graduating UMass Amherst with a BS in Computer Science in May of
          2021
        </p>
        <p>I'm proficent in Java, C/C++, Javascript, React.js</p>
        <p>I work with Docker, Node.js, MongoDB, Ubuntu, AWS EC2 and S3</p>
        <p>
          I'm passionate about snowboarding, basketball, and learning new
          technologies
        </p>
      </Content>
    </div>
  );
}

export default AboutPage;
