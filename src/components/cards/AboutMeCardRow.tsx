import React from "react";
import styled from "styled-components";
import { themes } from "../../styles/ColorStyles";
import { MediumText } from "../../styles/TextStyles";
import { AboutMe } from './../../model/aboutme';

interface AboutMeCardRowProps {
  title: string;
  value: string | number;
  aboutMe : AboutMe;
}

const AboutMeCardRow = (props: AboutMeCardRowProps) => {
  const {aboutMe} = props;

    const formatDate = (value: string | number): string => {
      if(typeof value === "number") {
        let date = new Date(value);
        return date.toLocaleDateString();
      } else {
        return value;
      }
  }

  return (
    <Wrapper href={aboutMe.github} target="_blank" rel="noopener">
    <InfoDetailBox>
      <InfoKey>{props.title}</InfoKey>
      <InfoValueWrapper>
          <InfoValue>{
          formatDate(props.value)
          }</InfoValue>
      </InfoValueWrapper>
    </InfoDetailBox>
    </Wrapper>
  );
};
 const Wrapper = styled.a`
 cursor: pointer;
 width: 280px;
 height: 20px;
 @media (max-width: 450px) {
     width: auto;
     min-width: 240px;
     margin: 0px 0px;
 }

 @media (max-width: 700px) {
     min-width: 240px;
     width: auto;
     max-width: 450px;
     margin: 0px 0px;
 }

 transition: all 0.8s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
 box-shadow: rgb(24 32 79 / 25%) 0px 40px 80px,
 rgb(255 255 255 / 50%) 0px 0px 0px 0.5px inset;
 animation: fadein 0.4s;

 :hover {
   transform: scale(1.03);
 }
 :active {
   transform: scale(1.01);
 }

 @keyframes fadein {
   from { opacity: 0; }
   to   { opacity: 1; }
 }
`



const InfoDetailBox = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: start;
  column-gap: 6px;
`;

const InfoValueWrapper = styled.div`
    
`;

const InfoKey = styled(MediumText)`
  font-weight: bold;
  color: ${themes.light.text1};

  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
  }
`;

const InfoValue = styled(MediumText)`
  color: ${themes.light.text1};
  margin-bottom: 8px;

  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
  }
`;

export default AboutMeCardRow
;
