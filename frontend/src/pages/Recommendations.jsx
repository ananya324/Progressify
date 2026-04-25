import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const Recommendations = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const { data } = await api.get("/recommendations");
        setCourses(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) return <h2>Loading recommendations...</h2>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recommended Courses</h1>

      <div className="grid grid-cols-3 gap-4">
        {courses.map((course) => (
          <Link
            key={course._id}
            to={`/courses/${course._id}`}
            className="border p-4 rounded shadow"
          >
            <h2 className="font-semibold">{course.title}</h2>
            <p className="text-sm text-gray-600 mt-2">
              {course.description?.slice(0, 80)}...
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
