import { Link } from "react-router-dom";

export default function RecommendationCard({ course }) {
  return (
    <a
      href={course.link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white border rounded-xl shadow hover:shadow-lg transition block"
    >
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-40 object-cover rounded-t-xl"
      />

      <div className="p-4">
        <h3 className="font-semibold">{course.title}</h3>
        <p className="text-sm text-gray-600 mt-2">
          {course.description}
        </p>

        <span className="text-xs text-indigo-600 mt-3 inline-block">
          {course.platform}
        </span>
      </div>
    </a>
  );
}
