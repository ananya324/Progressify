import MotivationBanner from "../components/MotivationBanner";
import ScrollingRecommendations from "../components/ScrollingRecommendations";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiBookOpen, FiTrendingUp, FiTarget } from "react-icons/fi";

export default function Home() {
  const navigate = useNavigate();

  const steps = [
    {
      word: "Save",
      desc: "Collect learning resources from YouTube, courses, blogs, and more",
      color: "text-indigo-300",
    },
    {
      word: "Track",
      desc: "Monitor your learning progress in a structured way",
      color: "text-indigo-400",
    },
    {
      word: "Complete",
      desc: "Turn scattered learning into real skill development",
      color: "text-indigo-500",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % steps.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const courses = [
    {
      _id: "gfg-dsa",
      title: "GeeksforGeeks DSA Self-Paced",
      description: "Structured DSA course with theory + practice problems",
      platform: "GeeksforGeeks",
      platformIcon:
        "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200817185016/gfg_complete_logo_2x-min.png",
      image:
        "https://static.startuptalky.com/2021/06/GeeksforGeeks-StartupTalky.jpg",
      link: "https://practice.geeksforgeeks.org/courses/dsa-self-paced",
      category: "dsa",
    },
    {
      _id: "tuf-dsa",
      title: "Take U Forward DSA",
      description: "Striver’s highly recommended DSA playlist",
      platform: "YouTube",
      platformIcon:
        "https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png",
      image: "https://img.youtube.com/vi/N0MgLvceX7M/hqdefault.jpg",
      link: "https://www.youtube.com/watch?v=N0MgLvceX7M",
      category: "dsa",
    },
    {
      _id: "ml-basics",
      title: "Machine Learning Basics",
      description: "Beginner-friendly ML introduction",
      platform: "YouTube",
      platformIcon:
        "https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png",
      image: "https://www.freecodecamp.org/news/content/images/size/w2000/2022/09/machinelearning.png",
      link: "https://youtu.be/i_LwzRVP7bg?si=g-6nm6XenvPF3fnY",
      category: "machine learning",
    },
    {
      _id: "harkirat-cohort",
      title: "100xDevs Web Dev Cohort",
      description: "Full stack + DevOps cohort by Harkirat Singh",
      platform: "100xDevs",
      platformIcon: "https://100xdevs.com/favicon.ico",
      image: "https://appxcontent.kaxa.in/paid_course3/2024-07-07-0.8201249093606604.png",
      link: "https://harkirat.classx.co.in/new-courses/12-complete-web-development-devops-cohort",
      category: "web development",
    },
  ];

  const recommendations = [
    {
      _id: 1,
      title: "Striver DSA Playlist",
      description: "Most recommended DSA playlist in developer community",
    },
    {
      _id: 2,
      title: "Harkirat Backend Cohort",
      description: "Best structured backend + system design learning path",
    },
    {
      _id: 3,
      title: "FastAI Practical ML",
      description: "Hands-on ML course widely recommended on Reddit",
    },
  ];

  return (
    
    <div className="min-h-screen px-6 md:px-12 py-10 text-white bg-gradient-to-b from-[#0b0f1a] via-[#0a0e17] to-black">

      {/* MOTIVATION BANNER */}
      <MotivationBanner />

      {/* HERO */}
      <section className="text-center mt-20 mb-20 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
          Your learning, organized.
        </h1>

        <p className="mt-4 text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
          Stop losing track of courses, playlists, and resources.
          Build a structured learning system that actually keeps you consistent.
        </p>

        <div className="mt-10">
          <h2 className={`text-3xl md:text-4xl font-semibold ${steps[index].color} transition-all duration-500`}>
            {steps[index].word}
          </h2>
          <p className="text-gray-400 mt-2 text-sm md:text-base">
            {steps[index].desc}
          </p>
        </div>

        <button
          onClick={() => navigate("/register")}
          className="mt-8 flex items-center gap-2 mx-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium shadow-lg shadow-indigo-600/20 transition"
        >
          Start Your Journey
          <FiArrowRight />
        </button>
      </section>

      {/* WHY THIS EXISTS */}
      <section className="max-w-5xl mx-auto mb-24 text-center">
        <h2 className="text-xl font-semibold text-gray-200 mb-4">
          Why this exists
        </h2>
        <p className="text-gray-400 text-sm md:text-base">
          Most students don’t fail because of lack of content — they fail because everything is scattered.
          This platform brings all your learning into one structured system so you can focus on actually learning.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-5xl mx-auto mb-24">
        <h2 className="text-center text-xl font-semibold mb-10 text-gray-200">
          How it works
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <FiBookOpen className="text-indigo-400 mb-3" />
            <h3 className="font-medium mb-2">Save everything</h3>
            <p className="text-gray-400 text-sm">
              Store courses, videos, blogs, and resources in one place.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <FiTrendingUp className="text-green-400 mb-3" />
            <h3 className="font-medium mb-2">Track progress</h3>
            <p className="text-gray-400 text-sm">
              Know exactly what you’ve completed and what’s next.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <FiTarget className="text-orange-400 mb-3" />
            <h3 className="font-medium mb-2">Stay consistent</h3>
            <p className="text-gray-400 text-sm">
              Build discipline with structured learning habits.
            </p>
          </div>
        </div>
      </section>

      {/* RESOURCES */}
      <section className="mb-24 max-w-6xl mx-auto">
  <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-6">
    Popular learning resources
  </h2>

  <div className="overflow-hidden">
    <div className="flex gap-4 w-max animate-scroll-reverse">
      {[...courses, ...courses].map((course, i) => (
        <a
          key={i}
          href={course.link}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-[260px] bg-white/5 border border-white/10 rounded-xl overflow-hidden
                     hover:border-indigo-500/40 transition"
        >
          <img src={course.image} className="h-40 w-full object-cover" />

          <div className="p-4">
            <h3 className="text-sm font-medium">{course.title}</h3>
            <p className="text-gray-500 text-xs mt-2 line-clamp-2">
              {course.description}
            </p>
          </div>
        </a>
      ))}
    </div>
  </div>
</section>

      {/* COMMUNITY */}
      <section className="max-w-6xl mx-auto mb-10">
        <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-6">
          Community picks
        </h2>

        <ScrollingRecommendations recommendations={recommendations} />
      </section>

    </div>
  );
}
