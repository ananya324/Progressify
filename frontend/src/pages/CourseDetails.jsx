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

  if (!course) return <p className="text-ink-soft">Loading course</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-extrabold md:text-4xl">{course.title}</h1>
      <p className="mt-3 text-ink-soft">{course.description}</p>

      <button onClick={enroll} className="btn btn-primary mt-8">Enroll</button>
    </div>
  );
}
