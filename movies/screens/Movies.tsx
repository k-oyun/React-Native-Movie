import {NativeStackScreenProps} from "@react-navigation/native-stack";
import React, {useEffect, useState} from "react";
import {BlurView} from "expo-blur";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
//swiper를 이용하면 스크롤뷰와 달리 자동으로 스크롤이되는 효과를 가지고 있다
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import {makeImgPath} from "../utils";
import Slide from "../components/Slide";
import Poster from "../components/Poster";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const CommingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const renderHVMedia = ({item}) => (
  <VMedia
    posterPath={item.poster_path}
    originalTitle={item.original_title}
    voteAverage={item.vote_average}
  />
);

const renderHMedia = ({item}) => (
  <HMedia
    posterPath={item.poster_path}
    originalTitle={item.original_title}
    overview={item.overview}
    releaseDate={item.release_date}
  />
);

const VSeperator = styled.View`
  width: 20px;
`;
const HSeperator = styled.View`
  width: 20px;
`;

//화면의 높이를 알려줌 : dimension
const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [refresing, setRefresing] = useState(false);

  const onRefresh = async () => {};

  const movieKeyExtractor = (item) => item.id + "";

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refresing}
      //ListHeaderComponent 안에 존재하는 컴포넌트들은 상단에 고정된다.
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            //반복
            loop
            //몇초마다 반복할지
            autoplay
            autoplayTimeout={3.5}
            //스크롤을 하지 못하도록
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              marginBottom: 30,
              width: "100%",
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlaying.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path}
                posterPath={movie.poster_path}
                originalTitle={movie.origin_title}
                overview={movie.overview}
                voteAverage={movie.vote_average}
              />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending movie</ListTitle>
            {/* scrollview와 달리 데이터를 직접 넣어주지 않아도된다. */}
            <TrendingScroll
              data={trending}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 20}}
              //scrollview와 달리 Flatlist는 각 item의 key를 지정해줘야함 | 똑똑하지않음
              keyExtractor={movieKeyExtractor}
              //scrollview처럼 스타일을 외부에서 입히는 것이 아닌 FlatList는  내부에서 입힘!
              ItemSeparatorComponent={VSeperator}
              renderItem={renderHVMedia}
            />
          </ListContainer>
          <CommingSoonTitle>Comming Soon</CommingSoonTitle>
        </>
      }
      //위 방향으로 드래그하여 새로고침하기
      // refreshControl={
      //   <RefreshControl onRefresh={onRefresh} refreshing={refresing} />
      // }
      data={upcoming}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeperator}
      renderItem={renderHMedia}
    />
  );
};

export default Movies;
