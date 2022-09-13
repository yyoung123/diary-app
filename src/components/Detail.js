import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Detail() {
  const params = useParams();
  const movieID = params.id;
  const [detail, setDetail] = useState({});
  const [genres, setGenres] = useState([]);
  const [cast, setCast] = useState([]); //get / set getCast() setCast()
  const [crew, setCrew] = useState([]);
  // usestate는 배열을 던져준다. 화면 렌더링에 관여할때 선언
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=ko-KR&page=1`).then((res) => {
      console.log(res.data);
      setDetail(res.data);
      setGenres(res.data.genres);
    });
  }, []);
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=ko-KR&page=1`).then((res) => {
      console.log(res.data);
      setCast(res.data.cast);
      setCrew(res.data.crew);
    });
  }, []);

  return (
    <>
      <div id="detail" className="detail">
        <div className="container">
          <h2 className="title">
            <strong>Detail</strong>
          </h2>
          <div className="detailBox">
            <div className="img">
              <img src={`https://image.tmdb.org/t/p/w200/${detail.poster_path}`} alt="" />
            </div>
            <div className="info">
              <div className="titleBox ">
                <h3>{detail.title}</h3>
                <p className="originalTitle">{detail.original_title}</p>
                <p className="release">{detail.release_date}</p>
              </div>
              <div className="summary">
                <dl>
                  <dt>장르</dt>
                  <dd className="genre">
                    {genres.map((item, idx) => {
                      return <span key={idx}>{item.name}</span>;
                    })}
                  </dd>
                </dl>
                <dl>
                  <dt>개봉일</dt>
                  <dd>{detail.release_date}</dd>
                </dl>
                <dl>
                  <dt>상영시간</dt>
                  <dd>{detail.runtime}분</dd>
                </dl>
                <dl>
                  <dt>관객평점</dt>
                  <dd>{detail.vote_average}</dd>
                </dl>
                <dl>
                  <dt>관객투표</dt>
                  <dd>{detail.vote_count}</dd>
                </dl>
                <dl>
                  <dt>cast</dt>
                  <dd>
                    <Swiper className="profileList" spaceBetween={10} slidesPerView={"auto"}>
                      {cast.map((item, idx) => {
                        return (
                          <SwiperSlide className="item">
                            <Profile key={idx} profileInfo={item} />
                          </SwiperSlide>
                          // <Profile key={idx} profile_path={item.profile_path} name={item.name} />
                          // <li key={idx}>
                          //   <img src={`https://image.tmdb.org/t/p/w185/${item.profile_path}`} />
                          //   <span>{item.name}</span>
                          // </li>
                        );
                      })}
                    </Swiper>
                  </dd>
                </dl>
                <dl>
                  <dt>crew</dt>
                  <dd>
                    <Swiper className="profileList" spaceBetween={10} slidesPerView={"auto"}>
                      {crew.map((item, idx) => {
                        return (
                          <SwiperSlide className="item">
                            <Profile key={idx} profileInfo={item} />
                          </SwiperSlide>
                          // <Profile key={idx} profile_path={item.profile_path} name={item.name} /> 1,2번째 컴포넌트 만들어서 처리
                          // <li key={idx}>
                          //   <img src={`https://image.tmdb.org/t/p/w185/${item.profile_path}`} />
                          //   <span>{item.name}</span>
                          // </li> 3번째 방법
                        );
                      })}
                    </Swiper>
                  </dd>
                </dl>
              </div>
              <div className="overviewBox">
                <p className="overview">{detail.overview}</p>
                {/* <p className="vote">{detail.vote_count}</p> */}
              </div>
            </div>
          </div>
          <div className="btns">
            <button
              className="btn btnBack"
              onClick={function () {
                navigate(-1);
              }}
            >
              List
            </button>
          </div>
        </div>
        <div className="bg" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${detail.backdrop_path})` }}></div>
      </div>
    </>
  );
}
