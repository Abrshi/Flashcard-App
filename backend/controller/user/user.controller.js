import { prisma } from "../../lib/prisma.js";


export const getsubjects = async (req, res) => {
  try {
    const subjects = await prisma.subject.findMany();
    if (subjects) {
      console.log("Subjects found:", subjects);
      res.status(200).json(subjects);
    } else {
      console.warn("No subjects found");
      res.status(404).json({ error: "No subjects found" });
    }

  } catch (err) {
    console.error("Get Subjects error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
export const getquestion = async (req, res) => {
  const { subject_id } = req.query;

  try {
    const questions = await prisma.question.findMany({
      where: {
        subject_id: Number(subject_id),
      },
    });
    console.log("Questions found for subject_id", subject_id, ":", questions);
    res.status(200).json(questions);
  } catch (err) {
    console.error("Get Question error:", err);
    res.status(500).json({ error: "Server error" });
  }
};