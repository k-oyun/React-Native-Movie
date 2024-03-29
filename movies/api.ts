const API_KEY = "83af6f85f29b6467ef7f4bd87e80b297";
import Movies from "./screens/Movies";

const BASE_URL = "https://api.themoviedb.org/3";

export const trending = () =>
  fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((res) =>
    res.json()
  );

export const upcoming = () =>
  fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
  ).then((res) => res.json());

export const nowPlaying = () =>
  fetch(
    `${BASE_URL}/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
  ).then((res) => res.json());

export const moviesApi = {trending, upcoming, nowPlaying};
