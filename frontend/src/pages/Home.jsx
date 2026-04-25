import MotivationBanner from "../components/MotivationBanner";
import ScrollingRecommendations from "../components/ScrollingRecommendations";
import { useEffect, useState } from "react";
import QuickAddCourse from "../components/QuickAddCourse";
import { useNavigate } from "react-router-dom";


const words = ["Save", "Track", "Complete"];
export default function Home() {
  const navigate = useNavigate();
  const courses = [
    {
      _id: "striver-dsa",
      title: "Striver A2Z DSA Playlist",
      description: "Complete DSA playlist by Striver on YouTube",
      platform: "YouTube",
      platformIcon:
        "https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png",
      image: "https://img.youtube.com/vi/V5hIcmIiXng/hqdefault.jpg",
      link: "https://www.youtube.com/playlist?list=PLgUwDviBIf0qUlt5H_kiKYaNSqJ81PMMY",
    },
    {
      _id: "tuf-dsa",
      title: "Take U Forward DSA",
      description: "Popular TUF DSA lessons on YouTube",
      platform: "YouTube",
      platformIcon:
        "https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png",
      image: "https://img.youtube.com/vi/N0MgLvceX7M/hqdefault.jpg",
      link: "https://www.youtube.com/watch?v=N0MgLvceX7M",
    },
    {
      _id: "ml-basics",
      title: "Machine Learning Intro",
      description: "Machine Learning beginner video",
      platform: "YouTube",
      platformIcon:
        "https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png",
      image: "https://img.youtube.com/vi/GwIo3gDZCVQ/hqdefault.jpg",
      link: "https://www.youtube.com/watch?v=GwIo3gDZCVQ",
    },
    {
      _id: "harkirat-cohort",
      title: "100xDevs Web Dev Cohort",
      description: "Web Dev + DevOps Cohort",
      platform: "100xDevs",
      platformIcon: "https://100xdevs.com/favicon.ico",
      image: "https://picsum.photos/300/200",
      link: "https://harkirat.classx.co.in/new-courses/12-complete-web-development-devops-cohort",
    },
  ];

  const recommendations = [
    {
      _id: 1,
      title: "Striver DSA Playlist",
      description: "Most recommended DSA playlist by developers",
    },
    {
      _id: 2,
      title: "Harkirat Backend Cohort",
      description: "Highly recommended backend learning cohort",
    },
    {
      _id: 3,
      title: "FastAI Practical ML",
      description: "Top ML learning resource shared on Reddit",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);


  const [resourceName, setResourceName] = useState("");
  const [resourceUrl, setResourceUrl] = useState("");

  const handleAddResource = () => {
    if (!resourceName || !resourceUrl) return;
    console.log({ name: resourceName, url: resourceUrl });
    setResourceName("");
    setResourceUrl("");
  };




  return (
  <div className="min-h-screen px-6 md:px-12 py-10 text-white 
                  bg-gradient-to-b from-[#0b0f1a] via-[#0a0e17] to-black">

    <MotivationBanner />

    {/* HERO */}
    <section className="text-center mt-24 mb-28 max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
        <span className="text-indigo-400 transition-all duration-500">
          {words[index]}
        </span>
        <span className="ml-3 text-gray-300">
          your learning journey
        </span>
      </h1>

      <p className="text-gray-400 mt-6 text-base md:text-lg leading-relaxed">
        Stop losing track of your learning.
        Save courses, track progress, and stay consistent — all in one place.
      </p>

      <button
        onClick={() => navigate("/register")}
        className="mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 
                   rounded-lg text-sm font-medium
                   shadow-lg shadow-indigo-600/20
                   transition-all duration-300"
      >
        Start Tracking Now →
      </button>
    </section>

    {/* HOW IT WORKS */}
    <section className="max-w-5xl mx-auto mb-28">
      <h2 className="text-center text-xl font-semibold mb-12 text-gray-200">
        How it works
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Save Resources",
            desc: "Add courses from YouTube, blogs, or cohorts in one place.",
          },
          {
            title: "Track Progress",
            desc: "Update your progress and stay consistent daily.",
          },
          {
            title: "Stay Motivated",
            desc: "Visualize activity and build learning streaks.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/5 backdrop-blur-md p-6 rounded-xl 
                       border border-white/10
                       hover:border-indigo-500/40
                       transition-all duration-300"
          >
            <h3 className="text-base font-medium mb-2 text-white">
              {item.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>

    {/* POPULAR */}
    <section className="mb-28 max-w-6xl mx-auto">
      <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-8">
        Popular resources
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <a
            key={course._id}
            href={course.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white/[0.03] border border-white/10
                       rounded-xl overflow-hidden
                       hover:border-indigo-500/40
                       hover:bg-white/[0.06]
                       transition-all duration-300"
          >
            <div className="overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover
                           group-hover:scale-105
                           transition-transform duration-500"
              />
            </div>

            <div className="p-4">
              <h3 className="text-sm font-medium mb-1 text-white">
                {course.title}
              </h3>

              <p className="text-gray-500 text-xs mb-3 line-clamp-2">
                {course.description}
              </p>

              <div className="flex items-center gap-2 text-xs text-gray-400">
                <img
                  src={course.platformIcon}
                  alt={course.platform}
                  className="w-4 h-4"
                />
                {course.platform}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>

    {/* COMMUNITY */}
    {recommendations?.length > 0 && (
      <section className="max-w-6xl mx-auto pb-10">
        <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-6">
          Community picks
        </h2>

        <ScrollingRecommendations recommendations={recommendations} />
      </section>
    )}
  </div>
);
}
