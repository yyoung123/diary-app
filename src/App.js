import "./App.css";
import "./css/layout.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DiaryEditor from "./components/DiaryEditor";
import DiaryList from "./components/DiaryList";
import { useMemo, useRef, useState } from "react";

function App() {
  const dataId = useRef(0);
  // useRef는 화면이 렌더링 되어서 값이 초기화 되는걸 막고 싶을때 또는 Dom제어할때
  let count = 0;
  const deleteDiary = function (id) {
    console.log("id===", id);
    const filteredDiaryData = diaryData.filter((item, idx) => {
      return item.id !== id;
    });
    setDiaryData(filteredDiaryData);
  }; //고유번호(id)를 이용해 지운다
  const modifyDiary = function (id, localContents) {
    console.log(localContents);
    const modifiedDiaryData = diaryData.map((item) => {
      return item.id === id ? { ...item, contents: localContents } : item;
    });
    setDiaryData(modifiedDiaryData);
  };
  const insertDiary = function (writer, contents, emotion) {
    console.log("writer===", writer);
    console.log("contents===", contents);
    console.log("emotion===", emotion);
    const insertDiaryData = {
      writer: writer,
      contents: contents,
      emotion: emotion,
      date: new Date().getTime(),
      id: dataId.current,
    };
    dataId.current += 1;
    count += 1;
    console.log(dataId.current);
    setDiaryData([insertDiaryData, ...diaryData]); //배열흩뿌려서 추가하기
  };

  const [diaryData, setDiaryData] = useState([]);
  // const diaryData = [
  //   {
  //     id: 1,
  //     writer: "장성호",
  //     contents: "날씨가 조아요",
  //     emotion: 1,
  //     date: 1662512920819,
  //   },
  //   {
  //     id: 2,
  //     writer: "정우성",
  //     contents: "날씨가 조아요",
  //     emotion: 1,
  //     date: 1662512920819,
  //   },
  //   {
  //     id: 3,
  //     writer: "원빈",
  //     contents: "날씨가 조아요",
  //     emotion: 1,
  //     date: 1662512920819,
  //   },
  //   {
  //     id: 4,
  //     writer: "김우빈",
  //     contents: "날씨가 조아요",
  //     emotion: 1,
  //     date: 1662512920819,
  //   },
  // ];
  const diaryAnalysis = useMemo(() => {
    console.log("일기분석을 시작합니다.");
    const total = diaryData.length;
    const good = diaryData.filter((item, idx) => {
      return item.emotion >= 3; //3이상이면 기분이 좋다.
    }).length;
    const bad = total - good;
    const percent = Math.floor((good / total) * 100 * 100) / 100;
    return {
      good: good,
      bad: bad,
      percent: percent,
      total: total,
    };
  }, [diaryData]); //usememo 렌더링을 최소화 하기위해서 쓴다.
  //의존성 배열
  return (
    <div className="App">
      <Header />
      <DiaryEditor insertDiary={insertDiary} />
      <div className="infoBox container">
        <dl>
          <dt>전체 :</dt>
          <dd>
            <strong>{diaryAnalysis.total}</strong>
          </dd>
        </dl>
        <dl>
          <dt>기분 좋은 날 :</dt>
          <dd>
            <strong>{diaryAnalysis.good}</strong>
          </dd>
        </dl>
        <dl>
          <dt>기분 더러운 날 :</dt>
          <dd>
            <strong>{diaryAnalysis.bad}</strong>
          </dd>
        </dl>
        <dl>
          <dt>퍼센트 :</dt>
          <dd>
            <strong>{diaryAnalysis.percent}%</strong>
          </dd>
        </dl>
      </div>
      <DiaryList diaryList={diaryData} deleteDiary={deleteDiary} modifyDiary={modifyDiary} />
      <Footer />
    </div>
  );
}

export default App;
