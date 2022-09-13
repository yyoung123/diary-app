import { useState, useRef } from "react";
export default function DiaryEditor({ insertDiary }) {
  // const [writer, setWriter] = useState("");
  // const [contents, setContents] = useState("");
  // const [emotion, setEmotion] = useState(1);
  const [diaryItem, setDiaryItem] = useState({
    writer: "",
    contents: "",
    emotion: 1,
  });
  const writerRef = useRef();
  const contentsRef = useRef();
  const insertDiaryItem = function () {
    // console.log(diaryItem.writer); //.writer->value값
    // console.log(diaryItem.contents);
    // console.log(diaryItem.emotion);
    if (diaryItem.writer.length < 3) {
      alert("글쓴이는 최소 3글자 이상이어야 합니다.");
      writerRef.current.focus();
      return false;
    } else if (diaryItem.contents.length < 10) {
      alert("내용은 최소 10글자 이상이어야 합니다.");
      contentsRef.current.focus();
      return false;
    }
    //자식이 부모에게 데이터 전달하는 방법
    insertDiary(diaryItem.writer, diaryItem.contents, diaryItem.emotion);

    alert("일기가 저장되었습니다.");
    setDiaryItem({
      writer: "",
      contents: "",
      emotion: 1,
    }); //-> 초기화시켜주기
  };
  /*
  const changeWriter = function (e) {
    setWriter(e.target.value);
    console.log(e.target.value);
  };
  const changeContents = function (e) {
    setContents(e.target.value);
    console.log(e.target.value);
  };
  const changeEmotion = function (e) {
    setEmotion(e.target.value);
    console.log(e.target.value);
  };*/
  const changeDiaryItem = function (e) {
    console.log(e.target.name);
    //흩뿌리기(...사용하기)
    setDiaryItem({
      ...diaryItem,
      [e.target.name]: e.target.value,
    });
  };
  // const testObj = { name: "장동건", age: 30, weight: 80 };
  // console.log(testObj.name); //. 대신에 [""]로도 출력 할수 있다.
  // console.log(testObj["age"]);
  // const spreadObj = { ...testObj };
  // console.log(spreadObj.name);
  return (
    <div className="container">
      <div className="section">
        <input type="text" name="writer" id="" placeholder="이름을 입력해주세요" value={diaryItem.writer} onChange={changeDiaryItem} ref={writerRef} />
      </div>
      <div className="contents">
        <textarea name="contents" id="" cols="30" rows="10" placeholder="내용을 입력해주세요" value={diaryItem.contents} onChange={changeDiaryItem} ref={contentsRef}></textarea>
      </div>
      <div className="section">
        <label>오늘 하루 어땠나요?</label>
        <select name="emotion" id="" value={diaryItem.emotion} onChange={changeDiaryItem}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        {/* <label>
          <span>좋아요</span>
          <input type="radio" name="emotion" value="1" id="" checked />
        </label>
        <label>
          <span>나빠요</span>
          <input type="radio" name="emotion" value="2" id="" />
        </label>
        <label>
          <span>슬퍼요</span>
          <input type="radio" name="emotion" value="3" id="" />
        </label>
        <label>
          <span>감동이에요</span>
          <input type="radio" name="emotion" value="4" id="" />
        </label>
        <label>
          <span>화나요</span>
          <input type="radio" name="emotion" value="5" id="" />
        </label> */}
      </div>
      <div className="btns section">
        <button className="btn btnSave" onClick={insertDiaryItem}>
          SAVE
        </button>
      </div>
    </div>
  );
}
