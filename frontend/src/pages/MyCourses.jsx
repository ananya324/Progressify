import { useEffect, useState } from "react";
import { getMyCourses } from "../api/userCourse.api";
import QuickAddCourse from "../components/QuickAddCourse";
import CourseMenu from "../components/CourseMenu";
import { logActivity } from "../api/activity.api";


function getYouTubeId(url) {
  if (!url) return null;
  const regExp =
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}


function getThumbnail(course) {
  const link =
    course.type === "custom"
      ? course.url
      : course.course?.link;

  const ytId = getYouTubeId(link);

  if (ytId) {
    return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  }

  if (link) {
    return `https://www.google.com/s2/favicons?sz=128&domain_url=${link}`;
  }

  return "https://picsum.photos/300/200";
}

export default function MyCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await getMyCourses();
    setCourses(res);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <QuickAddCourse onCourseAdded={fetchCourses} />

      <h2 className="text-2xl font-semibold mt-10 mb-6 text-white">
        Your Courses
      </h2>

      {courses.length === 0 ? (
        <div className="text-gray-400 text-center mt-10">
          You haven’t added any courses yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
          {courses.map((course) => {
            
            const title =
              course.type === "custom"
                ? course.title
                : course.course?.title;

            const link =
              course.type === "custom"
                ? course.url
                : course.course?.link;

            const domain = link
              ?.replace("https://", "")
              ?.replace("http://", "")
              ?.split("/")[0];

            return (
              <div
                key={course._id}
                className="relative bg-gray-900 border border-gray-800 rounded-xl overflow-hidden 
                hover:border-cyan-500/40 hover:shadow-md hover:shadow-cyan-500/10 
                transition-all duration-300 group flex flex-col"
              >
                {/* 🔥 DELETE BUTTON TOP RIGHT */}
                <div className="absolute top-2 right-2 z-10">
                  <CourseMenu
                    courseId={course._id}
                    onDelete={fetchCourses}
                  />
                </div>

                {/* THUMBNAIL */}
                <div className="h-40 w-full bg-gray-800 overflow-hidden">
                  <img
                    src={getThumbnail(course)}
                    alt="thumbnail"
                    onError={(e) => {
                      e.target.src = "https://picsum.photos/300/200";
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-4 flex flex-col flex-1">
                  
                  {/* TEXT */}
                  <div className="mb-3">
                    <h3 className="text-base font-semibold text-white line-clamp-2">
                      {title}
                    </h3>

                    <p className="text-xs text-gray-400 mt-1 truncate">
                      {domain}
                    </p>
                  </div>

                  {/* ACTION */}
                  <div className="mt-auto">
<button
  onClick={async (e) => {
    e.stopPropagation();

    
    try {
      await logActivity(`Watched ${title}`);
    } catch (err) {
      console.error("Activity log failed");
    }

    let finalUrl = link;
    if (!finalUrl?.startsWith("http")) {
      finalUrl = "https://" + finalUrl;
    }

    window.open(finalUrl, "_blank");
  }}
  className="w-full px-3 py-2 text-sm rounded-md 
  bg-cyan-500 hover:bg-cyan-400 text-black font-medium transition"
>
  Open Course
</button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}