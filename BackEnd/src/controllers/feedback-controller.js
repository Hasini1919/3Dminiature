import Feedback from "../models/Feedback.js"


export const submitFeedback = async (req, res) => {
  try {
    const userId = req.user._id;
    const { responses } = req.body;

    if (!responses || Object.keys(responses).length === 0) {
      return res.status(400).json({ error: "At least one response is required." });
    }

    const feedback = new Feedback({
      userId,
      responses,
    });

    await feedback.save();

    res.status(201).json({ message: "Feedback submitted successfully." });
  } catch (err) {
    console.error("Submit Feedback Error:", err);
    res.status(500).json({ error: "Server error while submitting feedback." });
  }
};
