import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  RefreshControl,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
// components
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
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
const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;
const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;
const ListContainer = styled.View`
  margin-bottom: 40px;
`;
const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const Movies = () => {
  const [refreshing, setRefreshing] = useState(false);
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
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
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

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              marginBottom: 30,
              width: "100%",
              height: SCREEN_HEIGHT / 5,
            }}
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

          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll
              data={trending}
              horizontal
              contentContainerStyle={{ paddingHorizontal: 30 }}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => {
                return <View style={{ width: 30 }} />;
              }}
              renderItem={({ item }) => {
                return (
                  <VMedia
                    posterPath={item.poster_path}
                    originalTitle={item.original_title}
                    voteAverage={item.vote_average}
                  />
                );
              }}
            />
          </ListContainer>
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      data={upcoming}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={() => {
        return <View style={{ height: 20 }} />;
      }}
      renderItem={({ item }) => {
        return (
          <HMedia
            key={item.id}
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            overview={item.overview}
            releaseDate={item.release_date}
          />
        );
      }}
    />
  );
};

export default Movies;
