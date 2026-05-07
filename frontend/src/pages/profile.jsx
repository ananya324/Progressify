import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../api/profile.api";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    githubUsername: "",
    leetcodeUsername: "",
    bio: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Success & Error Popup States
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");

  // Load Profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await getProfile();
        const data = res?.data || res;

        setUser(data);

        setForm({
          githubUsername: data.githubUsername || "",
          leetcodeUsername: data.leetcodeUsername || "",
          bio: data.bio || "",
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // Redirect after success popup
  useEffect(() => {
    let timer;

    if (showPopup) {
      timer = setTimeout(() => {
        setShowPopup(false);
        navigate("/dashboard");
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [showPopup, navigate]);

  // Handle Input Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Save Profile
  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");

      await updateProfile({
        githubUsername: form.githubUsername.trim(),
        leetcodeUsername: form.leetcodeUsername.trim(),
        bio: form.bio.trim(),
      });

      setShowPopup(true);
    } catch (err) {
      console.error(err);
      setError("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  // Loading Screen
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0b1220] text-gray-400">
        Loading profile...
      </div>
    );
  }

  return (
    <>
      {/* Success Popup */}
      {showPopup && (
        <div className="fixed top-5 right-5 z-50 animate-bounce">
          <div className="bg-green-600 text-white px-5 py-3 rounded-xl shadow-2xl font-medium">
            ✅ Profile Updated Successfully
          </div>
        </div>
      )}

      {/* Error Popup */}
      {error && (
        <div className="fixed top-20 right-5 z-50">
          <div className="bg-red-600 text-white px-5 py-3 rounded-xl shadow-2xl font-medium">
            ❌ {error}
          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#0b1220] text-white px-4 md:px-10 py-10">
        
        {/* Header */}
        <div className="max-w-5xl mx-auto mb-6">
          <h1 className="text-3xl font-bold">Profile Settings</h1>

          <p className="text-gray-400 text-sm">
            Manage your public and coding profiles
          </p>
        </div>

        {/* Main Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Card */}
          <div className="bg-[#111827] p-6 rounded-2xl shadow-lg space-y-4">
            <h2 className="text-lg font-semibold">Account Info</h2>

            {/* Name */}
            <div>
              <label className="text-gray-400 text-sm">Name</label>

              <input
                value={user?.name || ""}
                disabled
                className="w-full mt-1 p-3 rounded bg-gray-800 text-gray-300 cursor-not-allowed"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-400 text-sm">Email</label>

              <input
                value={user?.email || ""}
                disabled
                className="w-full mt-1 p-3 rounded bg-gray-800 text-gray-300 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Right Card */}
          <div className="lg:col-span-2 bg-[#111827] p-6 rounded-2xl shadow-lg space-y-5">
            <h2 className="text-lg font-semibold">Coding Profiles</h2>

            {/* GitHub */}
            <div>
              <label className="text-gray-400 text-sm">
                GitHub Username
              </label>

              <input
                type="text"
                name="githubUsername"
                value={form.githubUsername}
                onChange={handleChange}
                placeholder="Enter GitHub username"
                className="w-full mt-1 p-3 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />

              {form.githubUsername && (
                <a
                  href={`https://github.com/${form.githubUsername}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 text-sm mt-2 inline-block hover:underline"
                >
                  View GitHub →
                </a>
              )}
            </div>

            {/* LeetCode */}
            <div>
              <label className="text-gray-400 text-sm">
                LeetCode Username
              </label>

              <input
                type="text"
                name="leetcodeUsername"
                value={form.leetcodeUsername}
                onChange={handleChange}
                placeholder="Enter LeetCode username"
                className="w-full mt-1 p-3 rounded bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />

              {form.leetcodeUsername && (
                <a
                  href={`https://leetcode.com/${form.leetcodeUsername}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-yellow-400 text-sm mt-2 inline-block hover:underline"
                >
                  View LeetCode →
                </a>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="text-gray-400 text-sm">Bio</label>

              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Write something about yourself..."
                className="w-full mt-1 p-3 rounded bg-gray-800 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={saving}
              className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${
                saving
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}