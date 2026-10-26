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

  if (loading) {
    return <p className="text-ink-soft">Loading profile</p>;
  }

  return (
    <>
      {showPopup && (
        <div role="status" className="fixed right-5 top-20 z-50 border-[1.5px] border-ink bg-mark px-5 py-3 font-semibold shadow-[4px_4px_0_var(--color-ink)]">
          Profile saved. Taking you to the dashboard.
        </div>
      )}

      {error && (
        <div role="alert" className="fixed right-5 top-20 z-50 border-[1.5px] border-alert bg-sheet px-5 py-3 font-semibold text-alert">
          {error}
        </div>
      )}

      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-extrabold md:text-4xl">Profile</h1>
        <p className="mt-1 text-ink-soft">
          Your GitHub and LeetCode usernames feed the charts on your dashboard.
        </p>

        <section className="mt-10 border-t-[1.5px] border-ink pt-5">
          <h2 className="mb-4 text-lg font-bold">Account</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="p-name" className="mb-1.5 block text-sm font-semibold">Name</label>
              <input id="p-name" value={user?.name || ""} disabled className="field" />
            </div>
            <div>
              <label htmlFor="p-email" className="mb-1.5 block text-sm font-semibold">Email</label>
              <input id="p-email" value={user?.email || ""} disabled className="field" />
            </div>
          </div>
        </section>

        <section className="mt-10 border-t-[1.5px] border-ink pt-5">
          <h2 className="mb-4 text-lg font-bold">Coding profiles</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="githubUsername" className="mb-1.5 block text-sm font-semibold">GitHub username</label>
              <input
                id="githubUsername"
                type="text"
                name="githubUsername"
                value={form.githubUsername}
                onChange={handleChange}
                className="field"
              />
              {form.githubUsername && (
                <a href={`https://github.com/${form.githubUsername}`} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm font-semibold text-pen underline underline-offset-4">
                  Open github.com/{form.githubUsername}
                </a>
              )}
            </div>

            <div>
              <label htmlFor="leetcodeUsername" className="mb-1.5 block text-sm font-semibold">LeetCode username</label>
              <input
                id="leetcodeUsername"
                type="text"
                name="leetcodeUsername"
                value={form.leetcodeUsername}
                onChange={handleChange}
                className="field"
              />
              {form.leetcodeUsername && (
                <a href={`https://leetcode.com/${form.leetcodeUsername}`} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm font-semibold text-pen underline underline-offset-4">
                  Open leetcode.com/{form.leetcodeUsername}
                </a>
              )}
            </div>

            <div>
              <label htmlFor="bio" className="mb-1.5 block text-sm font-semibold">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="What are you learning right now?"
                className="field h-28 resize-none"
              />
            </div>

            <button onClick={handleSave} disabled={saving} className="btn btn-primary">
              {saving ? "Saving" : "Save changes"}
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
