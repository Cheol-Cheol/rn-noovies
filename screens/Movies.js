import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: blue;
`;

const Movies = ({ navigation: { navigate } }) => (
  <Btn onPress={() => navigate("Stack", { screen: "Three" })}>
    <Title>Movie</Title>
  </Btn>
);

export default Movies;
