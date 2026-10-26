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
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-6 text-3xl font-extrabold md:text-4xl">My courses</h1>

      <QuickAddCourse onCourseAdded={fetchCourses} />

      <div className="mb-6 mt-12 flex items-baseline justify-between border-b-[1.5px] border-ink pb-3">
        <h2 className="text-xl font-bold">Saved</h2>
        <span className="text-sm text-ink-soft">
          {courses.length} {courses.length === 1 ? "course" : "courses"}
        </span>
      </div>

      {courses.length === 0 ? (
        <p className="max-w-md py-10 text-ink-soft">
          Nothing saved yet. Paste a course or playlist link above, or find one in Discover.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const title =
              course.type === "custom" ? course.title : course.course?.title;
            const link =
              course.type === "custom" ? course.url : course.course?.link;
            const domain = link
              ?.replace("https://", "")
              ?.replace("http://", "")
              ?.split("/")[0];
            const thumb = getThumbnail(course);

            const open = async () => {
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
            };

            return (
              <article key={course._id} className="group relative flex flex-col">
                <div className="absolute right-2 top-2 z-10">
                  <CourseMenu courseId={course._id} onDelete={fetchCourses} />
                </div>

                <div className="relative aspect-video w-full overflow-hidden border-[1.5px] border-ink bg-sheet">
                  {thumb.type === "image" && (
                    <img src={thumb.src} alt="" className="h-full w-full object-cover" />
                  )}
                  {thumb.type === "playlist" && (
                    <div className="flex h-full flex-col justify-center bg-mark-soft px-5">
                      <p className="font-bold">YouTube playlist</p>
                      <p className="text-sm text-ink-soft line-clamp-2">{title}</p>
                    </div>
                  )}
                  {thumb.type === "fallback" && (
                    <div className="flex h-full flex-col justify-center bg-mark-soft px-5">
                      <p className="font-bold line-clamp-2">{title}</p>
                      <p className="text-sm text-ink-soft">{domain}</p>
                    </div>
                  )}
                </div>

                <h3 className="mt-3 text-lg font-bold leading-snug line-clamp-2">{title}</h3>
                <p className="mt-0.5 truncate text-sm text-ink-soft">{domain}</p>

                <button onClick={open} className="btn btn-ghost mt-4 self-start !py-1.5 text-sm">
                  Open course
                </button>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
