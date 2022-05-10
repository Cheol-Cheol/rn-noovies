import React from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import { makeImgPath } from "../utils";

const BgImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;
const Title = styled.Text`
  font-weight: 600;
  color: white;
`;
const Poster = styled.Image`
  width: 100px;
  height: 155px;
  border-radius: 5px;
`;
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;
const Overview = styled.Text`
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.8);
`;
const Votes = styled(Overview)`
  font-size: 12px;
`;

const Slide = ({
  backdrop_path,
  poster_path,
  original_title,
  vote_average,
  overview,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <BgImg source={{ url: makeImgPath(backdrop_path) }} />
      <Wrapper>
        <Poster source={{ url: makeImgPath(poster_path) }}></Poster>
        <Column>
          <Title>{original_title}</Title>
          {vote_average > 0 ? <Votes>⭐️{vote_average}/10</Votes> : null}
          <Overview>{overview.slice(0, 90)}...</Overview>
        </Column>
      </Wrapper>
    </View>
  );
};

export default Slide;
