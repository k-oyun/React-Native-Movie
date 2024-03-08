//api로 받은 이미지를 만드는 함수
export const makeImgPath = (img: string, width: string = "w500") =>
  `https://image.tmdb.org/t/p/${width}${img}`;
