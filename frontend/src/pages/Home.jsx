import MotivationBanner from "../components/MotivationBanner";
import ScrollingRecommendations from "../components/ScrollingRecommendations";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import demoVideo from "../assets/Demo.mp4";

import {
  FiArrowRight,
  FiBookOpen,
  FiTrendingUp,
  FiTarget,
  FiPlay,
} from "react-icons/fi";

export default function Home() {
  const navigate = useNavigate();

  const steps = [
    {
      word: "Save",
      desc: "Collect courses, playlists, blogs, and resources in one place.",
      color: "text-indigo-300",
    },
    {
      word: "Track",
      desc: "Monitor your progress and stay consistent while learning.",
      color: "text-indigo-400",
    },
    {
      word: "Complete",
      desc: "Turn scattered learning into real skill development.",
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
      image:
        "https://static.startuptalky.com/2021/06/GeeksforGeeks-StartupTalky.jpg",
      link: "https://practice.geeksforgeeks.org/courses/dsa-self-paced",
    },
    {
      _id: "tuf-dsa",
      title: "Take U Forward DSA",
      description: "Striver’s highly recommended DSA playlist",
      image: "https://img.youtube.com/vi/N0MgLvceX7M/hqdefault.jpg",
      link: "https://www.youtube.com/watch?v=N0MgLvceX7M",
    },
    {
      _id: "ml-basics",
      title: "Machine Learning Basics",
      description: "Beginner-friendly ML introduction",
      image:
        "https://www.freecodecamp.org/news/content/images/size/w2000/2022/09/machinelearning.png",
      link: "https://youtu.be/i_LwzRVP7bg?si=g-6nm6XenvPF3fnY",
    },
    {
      _id: "harkirat-cohort",
      title: "100xDevs Web Dev Cohort",
      description: "Full stack + DevOps cohort by Harkirat Singh",
      image:
        "https://appxcontent.kaxa.in/paid_course3/2024-07-07-0.8201249093606604.png",
      link:
        "https://harkirat.classx.co.in/new-courses/12-complete-web-development-devops-cohort",
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
    <div className="min-h-screen px-6 md:px-12 py-5 text-white bg-gradient-to-b from-[#0b0f1a] via-[#0a0e17] to-black overflow-hidden">

     

      {/* HERO */}
      <section className="text-center mt-10 mb-24 max-w-5xl mx-auto">

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300 mb-6">
          <span className="h-2 w-2 rounded-full bg-green-400"></span>
          Build your personal learning system
        </div>

        <h1 className="text-5xl md:text-7xl font-semibold leading-tight tracking-tight">
          Your learning,
          <br />
          <span className="text-indigo-400">
            finally organized.
          </span>
        </h1>

        <p className="mt-6 text-gray-400 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
          Organize courses, save resources, track progress,
          and stay consistent while learning web development,
          DSA, machine learning, and more.
        </p>

        {/* Animated Words */}
        <div className="mt-12 h-[90px] flex flex-col items-center justify-center">
          <h2
            className={`text-4xl md:text-5xl font-semibold transition-all duration-500 ${steps[index].color}`}
          >
            {steps[index].word}
          </h2>

          <p className="text-gray-500 mt-3 text-sm md:text-base">
            {steps[index].desc}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

          <button
            onClick={() => navigate("/register")}
            className="flex items-center gap-2 px-7 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-medium transition shadow-lg shadow-indigo-600/20"
          >
            Start Learning
            <FiArrowRight />
          </button>

          <a
            href="#demo"
            className="flex items-center gap-2 px-7 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm transition"
          >
            <FiPlay />
            Watch Demo
          </a>
        </div>
      </section>
            {/* FEATURES */}
      <section className="max-w-6xl mx-auto mb-28">

        <div className="text-center mb-14">
          <h2 className="text-3xl font-semibold">
            Everything you need to stay consistent
          </h2>

          <p className="text-gray-500 mt-3 text-sm md:text-base">
            Simple tools designed for focused learning.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-indigo-500/30 transition">

            <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-5">
              <FiBookOpen className="text-indigo-400 text-lg" />
            </div>

            <h3 className="text-lg font-medium mb-3">
              Save everything
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed">
              Keep all your courses, YouTube playlists,
              blogs, and learning resources organized
              in one place.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-green-500/30 transition">

            <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-5">
              <FiTrendingUp className="text-green-400 text-lg" />
            </div>

            <h3 className="text-lg font-medium mb-3">
              Track progress
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed">
              Monitor completed lessons and know exactly
              what to continue next without losing momentum.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-orange-500/30 transition">

            <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-5">
              <FiTarget className="text-orange-400 text-lg" />
            </div>

            <h3 className="text-lg font-medium mb-3">
              Stay consistent
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed">
              Build discipline and maintain a structured
              learning habit that actually lasts.
            </p>
          </div>

        </div>
      </section>

      {/* DEMO VIDEO */}
      <section
        id="demo"
        className="max-w-5xl mx-auto mb-28"
      >
        <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">

          
          <video
            className="w-full"
            src={demoVideo}
            controls
            muted
            autoPlay
            loop
          />

        </div>

        <p className="text-center text-gray-500 text-sm mt-4">
          A quick walkthrough of how the platform works.
        </p>
      </section>

      {/* POPULAR RESOURCES */}
      <section className="mb-28 max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold">
              Popular learning resources
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Add your favorite courses and track them easily.
            </p>
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="flex gap-5 w-max animate-scroll-reverse">

            {[...courses, ...courses].map((course, i) => (
              <a
                key={i}
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[290px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/40 hover:-translate-y-1 transition duration-300"
              >

                <img
                  src={course.image}
                  alt={course.title}
                  className="h-44 w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="font-medium text-base">
                    {course.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                    {course.description}
                  </p>
                </div>
              </a>
            ))}

          </div>
        </div>
      </section>



      {/* COMMUNITY PICKS */}
      <section className="max-w-6xl mx-auto mb-12">

        <div className="mb-6">
          <h2 className="text-2xl font-semibold">
            Community picks
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Popular recommendations from learners.
          </p>
        </div>

        <ScrollingRecommendations
          recommendations={recommendations}
        />
      </section>
    </div>
  );
}