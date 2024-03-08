import {NativeStackScreenProps} from "@react-navigation/native-stack";
import React from "react";
import {Dimensions} from "react-native";

//swiper를 이용하면 스크롤뷰와 달리 자동으로 스크롤이되는 효과를 가지고 있다
import Swiper from "react-native-web-swiper";
import styled from "styled-components/native";

const API_KEY = "83af6f85f29b6467ef7f4bd87e80b297";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const View = styled.View`
  flex: 1;
`;

//화면의 높이를 알려줌 : dimension
const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const getNowPlaying = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    );
  };
  return (
    <Container>
      <Swiper
        //반복
        loop
        //몇초마다 반복할지
        timeout={3.5}
        //스크롤을 하지 못하도록
        controlsEnabled={false}
        containerStyle={{width: "100%", height: SCREEN_HEIGHT / 4}}
      >
        <View style={{backgroundColor: "red"}}></View>
        <View style={{backgroundColor: "blue"}}></View>
        <View style={{backgroundColor: "red"}}></View>
        <View style={{backgroundColor: "blue"}}></View>
      </Swiper>
    </Container>
  );
};

export default Movies;
