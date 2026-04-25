import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseById } from "../api/course.api";
import { enrollCourse } from "../api/userCourse.api";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    const res = await getCourseById(id);
    setCourse(res);
  };

  const enroll = async () => {
    await enrollCourse(id);
    alert("Enrolled!");
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>

      <button onClick={enroll}>Enroll</button>
    </div>
  );
}
