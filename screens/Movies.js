import React, { useState, useEffect } from "react";
import { Dimensions, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
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
  color: #eee;
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
        loop
        timeout={3.45}
        controlsEnabled={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 5 }}
      >
        {nowPlaying.map((movie) => (
          <View key={movie.id}>
            <BgImg source={{ url: makeImgPath(movie.backdrop_path) }} />
            <Title>{movie.original_title}</Title>
          </View>
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;
