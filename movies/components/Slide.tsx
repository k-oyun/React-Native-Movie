import React from "react";
import {StyleSheet, View} from "react-native";
import styled from "styled-components/native";
import {makeImgPath} from "../utils";
import {BlurView} from "expo-blur";
import {useColorScheme} from "react-native";
import Poster from "./Poster";

const BgImg = styled.Image``;

const Title = styled.Text`
  font-weight: 600;
  font-size: 16px;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
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

//다른 요소의 style을 가져옴 : extend style
const Votes = styled(Overview)`
  font-size: 12px;
`;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  overview: string;
  voteAverage: number;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  overview,
  voteAverage,
}) => {
  const isDark = useColorScheme() === "dark";
  return (
    <View style={{flex: 1}}>
      <BgImg
        style={StyleSheet.absoluteFill}
        source={{uri: makeImgPath(backdropPath)}}
      />
      <BlurView
        tint={isDark ? "dark" : "light"}
        intensity={80}
        style={StyleSheet.absoluteFill}
      >
        {/* uri : 웹에 이쓴ㄴ 이미지를 불러오는 방법 */}
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title isDark={isDark}>{originalTitle}</Title>

            {voteAverage > 0 ? (
              <Votes isDark={isDark}>⭐️{voteAverage}/10</Votes>
            ) : null}

            {/* overview가 너무 긴 경우에는 잘라야함 */}
            {/* 80까지 자름 */}
            <Overview isDark={isDark}>{overview.slice(0, 90)}...</Overview>
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;
