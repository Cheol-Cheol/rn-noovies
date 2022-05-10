import React, { useState, useEffect } from "react";
import { Dimensions, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { makeImgPath } from "../utils";
// import { BlurView } from "expo-blur";

const API_KEY = "354af52aee70782be0a6e4c9d4057d64";

const Container = styled.ScrollView``;
const View = styled.View`
  flex: 1;
`;
const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
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

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setNowPlaying(results);
    setLoading(false);
  };

  useEffect(() => {
    getNowPlaying();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      <Swiper
        horizontal
        loop
        autoplayTimeout={3.45}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 5 }}
      >
        {nowPlaying.map((movie) => (
          <View key={movie.id}>
            <BgImg source={{ url: makeImgPath(movie.backdrop_path) }} />
            <Wrapper>
              <Poster source={{ url: makeImgPath(movie.poster_path) }}></Poster>
              <Column>
                <Title>{movie.original_title}</Title>
                {movie.vote_average > 0 ? (
                  <Votes>⭐️{movie.vote_average}/10</Votes>
                ) : null}
                <Overview>{movie.overview.slice(0, 90)}...</Overview>
              </Column>
            </Wrapper>
          </View>
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;
