import SchoolCatalog from "./SchoolCatalog";
import Header from "./Header";
import ClassSchedule from "./ClassSchedule";
import { createContext, useState } from "react";

export const AppContext = createContext();

export default function App() {
  const [enrolled, setEnrolled] = useState([]);
  return (
    <div>
      <AppContext.Provider value={{ enrolled, setEnrolled }}>
        <Header />
        <SchoolCatalog />
        <ClassSchedule />
      </AppContext.Provider>
    </div>
  );
}
