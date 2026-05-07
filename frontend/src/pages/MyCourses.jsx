import { useEffect, useState } from "react";
import { getMyCourses } from "../api/userCourse.api";
import QuickAddCourse from "../components/QuickAddCourse";
import CourseMenu from "../components/CourseMenu";
import { logActivity } from "../api/activity.api";

function isYouTubePlaylist(url) {
  return url?.includes("list=");
}

function isYouTubeVideo(url) {
  return url?.includes("watch?v=") || url?.includes("youtu.be/");
}

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

  // ✅ YouTube video
  const ytId = getYouTubeId(link);
  if (ytId) {
    return {
      type: "image",
      src: `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
    };
  }

  // ❌ Playlist → no thumbnail
  if (isYouTubePlaylist(link)) {
    return { type: "playlist" };
  }

  // ❌ Other links → no thumbnail
  return { type: "fallback" };
}

export default function MyCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await getMyCourses();
      setCourses(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 text-white">

      {/* ADD COURSE */}
      <QuickAddCourse onCourseAdded={fetchCourses} />

      {/* HEADER */}
      <div className="flex items-center justify-between mt-10 mb-6">
        <h2 className="text-2xl font-semibold">Your Courses</h2>
        <span className="text-sm text-gray-400">
          {courses.length} courses
        </span>
      </div>

      {/* EMPTY STATE */}
      {courses.length === 0 ? (
        <div className="text-gray-400 text-center mt-16">
          No courses added yet 🚀
        </div>
      ) : (
        
        /* GRID */
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
              const thumb = getThumbnail(course);

            return (
              <div
                key={course._id}
                className="relative bg-gray-900 border border-gray-800 rounded-xl overflow-hidden 
                hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10 
                transition-all duration-300 group flex flex-col"
              >

                {/* MENU */}
                <div className="absolute top-2 right-2 z-10">
                  <CourseMenu
                    courseId={course._id}
                    onDelete={fetchCourses}
                  />
                </div>

                {/* THUMBNAIL */}
                <div className="h-40 w-full bg-gray-900 overflow-hidden relative">

  {/* ✅ REAL IMAGE (only for videos) */}
  
  {thumb.type === "image" && (
    <img
      src={thumb.src}
      alt="thumbnail"
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
  )}

  {/* 🔥 PLAYLIST UI */}
  {thumb.type === "playlist" && (
    <div className="absolute inset-0 flex flex-col items-center justify-center
      bg-gradient-to-br from-red-500/20 to-orange-500/20">

      <p className="text-sm font-semibold text-white">
        📺 YouTube Playlist
      </p>
      <p className="text-xs text-gray-400 mt-1">
        Structured learning
      </p>

    </div>
  )}

  {/* 🔥 GENERIC FALLBACK */}
  {thumb.type === "fallback" && (
    <div className="absolute inset-0 flex flex-col items-center justify-center
      bg-gradient-to-br from-indigo-500/20 to-purple-500/20">

      <p className="text-sm font-semibold text-white text-center px-2 line-clamp-2">
        {title}
      </p>

      <p className="text-xs text-gray-400 mt-1">
        {domain}
      </p>

    </div>
  )}

</div>

                {/* CONTENT */}
                <div className="p-4 flex flex-col flex-1">

                  {/* TITLE */}
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
                          await logActivity(`Opened ${title}`);
                        } catch {
                          console.log("log failed");
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