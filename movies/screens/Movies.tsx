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

const API_KEY = "83af6f85f29b6467ef7f4bd87e80b297";

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const Container = styled.ScrollView``;

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
//화면의 높이를 알려줌 : dimension
const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);
  const [refresing, setRefresing] = useState(false);

  //api fetch
  const getTrending = async () => {
    const {results} = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
    ).json();
    setTrending(results);
  };

  //api fetch
  const getUpcoming = async () => {
    const {results} = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setUpcoming(results);
  };

  //api fetch
  const getNowPlaying = async () => {
    const {results} = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
      )
    ).json();
    setNowPlaying(results);
    setLoading(false);
  };

  //wait for all api fetch
  const getData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  const onRefresh = async () => {
    setRefresing(true);
    await getData();
    setRefresing(false);
  };
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
              keyExtractor={(item) => item.id + ""}
              //scrollview처럼 스타일을 외부에서 입히는 것이 아닌 FlatList는  내부에서 입힘!
              ItemSeparatorComponent={() => {
                return <View style={{width: 30}} />;
              }}
              renderItem={({item}) => (
                <VMedia
                  posterPath={item.poster_path}
                  originalTitle={item.original_title}
                  voteAverage={item.vote_average}
                />
              )}
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
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={() => {
        return <View style={{height: 20}} />;
      }}
      renderItem={({item}) => (
        <HMedia
          posterPath={item.poster_path}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
        />
      )}
    />
  );
};

export default Movies;
