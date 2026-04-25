import CourseCard from "./CourseCard";

export default function ScrollingCourses({ courses }) {
  return (
    <div className="overflow-x-auto scroll-smooth scrollbar-hide">
      <div className="flex gap-6 snap-x snap-mandatory">
        {courses.map((course) => (
          <div key={course._id} className="snap-start shrink-0 w-80">
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </div>
  );
}
