import {NativeStackScreenProps} from "@react-navigation/native-stack";
import React, {useEffect, useState} from "react";
import {BlurView} from "expo-blur";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";
//swiper를 이용하면 스크롤뷰와 달리 자동으로 스크롤이되는 효과를 가지고 있다
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import {makeImgPath} from "../utils";
import Slide from "../components/Slide";
import Poster from "../components/Poster";

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

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;

const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;
const Votes = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

//화면의 높이를 알려줌 : dimension
const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

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

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
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
      <ListTitle>Trending movie</ListTitle>
      <TrendingScroll
        contentContainerStyle={{paddingLeft: 30}}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {trending.map((movie) => (
          <Movie key={movie.id}>
            <Poster path={movie.poster_path} />
            {/* 제목이 긴 영화는 13까지만 */}
            {/* 13보다 길면 ...로 대체 */}
            <Title>
              {movie.original_title.slice(0, 13)}
              {movie.original_title.length > 13 ? "..." : null}
            </Title>
            <Votes>⭐️{movie.vote_average}</Votes>
          </Movie>
        ))}
      </TrendingScroll>
    </Container>
  );
};

export default Movies;
