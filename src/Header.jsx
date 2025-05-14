import { useContext } from "react";
import logo from "./assets/logo.png";
import { AppContext } from "./App";

export default function Header() {
  const { enrolled, setEnrolled } = useContext(AppContext);
  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      <div className="enrollment">
        Classes Enrolled: {Array.isArray(enrolled) ? enrolled.length : 0}
      </div>
    </div>
  );
}
