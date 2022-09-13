import { Link } from "react-router-dom";
import Search from "./Search";
export default function Header() {
  return (
    <>
      <header id="header" className="header">
        <h1>
          diary app
          {/* <Link to="/">diary App</Link> */}
        </h1>
        {/* <Search /> */}
      </header>
    </>
  );
}
