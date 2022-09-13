import axios from "axios";
import Movie from "./Movie";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";
export default function List() {
  // const query = "avengers";
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  // console.log(useLocation());
  const searchMovie = qs.parse(location.search, { ignoreQueryPrefix: true }).movie; //ignoreQueryPrefix: 물음표무시하기
  // console.log(searchMovie);
  // const test = qs.parse(location.search, { ignoreQueryPrefix: true }).movie;
  // console.log("test===", test);
  // useLocation()에 있는 search에 query string 정보가 들어가 있음.

  useEffect(() => {
    // state가 바꼈을때 실행하는 함수
    console.log("state가 바꼈을때 실행하는 함수");

    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=ko-KR&page=1&query=${searchMovie}`).then((res) => {
      console.log(res.data.results);
      setMovies(res.data.results);
    });
  }, [searchMovie]);

  return (
    <>
      <div className="container">
        <h2 className="title">
          <strong>popular movie</strong>
        </h2>
        <ul className="movieList">
          {movies.map((item, idx) => {
            // return <Movie imgSrc={item.poster_path} point={item.vote_average} />;
            console.log({ ...item });
            return <Movie movieInfo={item} key={idx} />;
          })}
        </ul>
      </div>
    </>
  );
}
