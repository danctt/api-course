import React from "react";
import ContentLoader from "react-content-loader";

const DotsLoader = (props) => (
  <ContentLoader
    viewBox="0 0 1000 160"
    height={160}
    width={1000}
    speed={2}
    backgroundColor="transparent"
    {...props}
  >
    <circle cx="20" cy="75" r="7" />
    <circle cx="100" cy="75" r="7" />
    <circle cx="180" cy="75" r="7" />
    <circle cx="260" cy="75" r="7" />
    <circle cx="340" cy="75" r="7" />
    <circle cx="420" cy="75" r="7" />
    <circle cx="500" cy="75" r="7" />
    <circle cx="580" cy="75" r="7" />
    <circle cx="640" cy="75" r="7" />
    <circle cx="720" cy="75" r="7" />
    <circle cx="800" cy="75" r="7" />
    <circle cx="880" cy="75" r="7" />
    <circle cx="960" cy="75" r="7" />
  </ContentLoader>
);

export default DotsLoader;
