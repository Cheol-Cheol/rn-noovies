import React, { useState, useEffect } from "react";
import { Dimensions, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
// components
import Slide from "../components/Slide";

// cst
const API_KEY = "354af52aee70782be0a6e4c9d4057d64";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// styled-components
const Container = styled.ScrollView``;
const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Movies = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);
  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
    ).json();
    setTrending(results);
  };
  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setUpcoming(results);
  };

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setNowPlaying(results);
  };

  const getData = async () => {
    try {
      // wait for all of them
      await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
      setLoading(false);
    } catch (e) {
      console.log("API호출에러", e);
    }
  };
  useEffect(() => {
    getData();
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
        autoplayTimeout={3.5}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 5 }}
      >
        {nowPlaying.map((movie) => (
          <Slide
            key={movie.id}
            backdrop_path={movie.backdrop_path}
            poster_path={movie.poster_path}
            original_title={movie.original_title}
            vote_average={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;
