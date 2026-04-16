
const addCustomCourse = async (req, res) => {
  try {
    const { title, url } = req.body;

    const newCourse = await UserCourse.create({
      user: req.user._id,
      title,
      url,
      progress: 0,
    });

    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};