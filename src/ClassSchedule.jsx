import { useContext } from "react";
import { AppContext } from "./App";

export default function ClassSchedule() {
  const { enrolled, setEnrolled } = useContext(AppContext);

  const dropCourse = (courseNumber) => {
    const updateEnrolled = enrolled.filter(
      (course) => course.courseNumber !== courseNumber
    );

    setEnrolled(updateEnrolled);
  };

  return (
    <div className="class-schedule">
      <h1>Class Schedule</h1>
      <table>
        <thead>
          <tr>
            <th>Course Number</th>
            <th>Course Name</th>
            <th>Drop</th>
          </tr>
        </thead>
        <tbody>
          {enrolled.map((course) => (
            <tr key={course.courseNumber}>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>
                <button onClick={() => dropCourse(course.courseNumber)}>
                  Drop
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
