import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Search() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  console.log("this===", this);
  return (
    <div id="search" className="search">
      <input
        type="text"
        placeholder="search movie"
        onChange={(e) => {
          // console.log(e);
          setSearch(e.target.value);
        }}
        onKeyUp={(e) => {
          console.log(e.key);
          if (e.key === "Enter") {
            navigate(`/search?movie=${search}`);
          }
        }}
      />
      <Link to={`/search?movie=${search}`} className="btnSearch">
        search
      </Link>
    </div>
  );
}
