const getAISummary = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Query required" });
    }

    const summaries = {
      devops:
        "Start with Linux basics → Learn Docker → Move to Kubernetes → Then CI/CD tools like Jenkins.",
      react:
        "Start with JavaScript fundamentals → Learn React basics → Hooks → Build projects.",
      python:
        "Learn syntax → Data structures → Practice problems → Build projects.",
      ai:
        "Start with Python → Learn ML basics → Work with models → Build real-world AI apps.",
    };

    const key = q.toLowerCase();

    res.json({
      summary:
        summaries[key] ||
        "Focus on fundamentals, practice consistently, and build real-world projects.",
    });
  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ message: "AI error" });
  }
};

module.exports = { getAISummary };