import { useState, useEffect } from "react";

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState(null);
  const [direction, setDirection] = useState("asc");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  const handleSortingChange = (column) => {
    if (sort === column) {
      setDirection(direction === "asc" ? "desc" : "asc");
    } else {
      setSort(column);
      setDirection("asc");
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.courseName.toLowerCase().includes(filter.toLowerCase()) ||
      course.courseNumber.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    let valueA = a[sort];
    let valueB = b[sort];

    // Comparing values based on the type of data in column
    if (typeof valueA === "string") {
      // String comparison
      const comparison = valueA.localeCompare(valueB);
      return direction === "asc" ? comparison : -comparison;
    } else {
      // numbers comparison
      const comparison = valueA - valueB;
      return direction === "asc" ? comparison : -comparison;
    }
  });

  const currentPage = sortedCourses.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const hasMore = sortedCourses.length > page * PAGE_SIZE;
  const hasLess = page > 1;

  useEffect(() => {
    setPage(1);
  }, [filter]);

  useEffect(() => {
    fetch("/api/courses.json")
      .then((response) => response.json())
      .then((data) => setCourses(data));
  }, []);

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setFilter(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSortingChange("trimester")}>Trimester</th>
            <th onClick={() => handleSortingChange("courseNumber")}>
              Course Number
            </th>
            <th onClick={() => handleSortingChange("courseName")}>
              Courses Name
            </th>
            <th onClick={() => handleSortingChange("semesterCredits")}>
              Semester Credits
            </th>
            <th onClick={() => handleSortingChange("totalClockHours")}>
              Total Clock Hours
            </th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {currentPage.map((course) => (
            <tr key={course}>
              <td>{course.trimester}</td>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>{course.semesterCredits}</td>
              <td>{course.totalClockHours}</td>
              <td>
                <button>Enroll</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={!hasLess} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <button disabled={!hasMore} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
