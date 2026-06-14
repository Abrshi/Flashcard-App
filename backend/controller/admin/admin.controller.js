import { prisma } from "../../lib/prisma.js";

export const addsubject = async (req, res) => {
  const { name, description } = req.body;
   console.log("Add Subject Request Body:", name, description);
 try {
    const subject = await prisma.subject.create({
      data: {
        name,
        description,
      },
    });
    res.status(201).json({ message: "Subject added", subject });
  } catch (err) {
    console.error("Add Subject error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
export const getsubjects = async (req, res) => {
  try {
    const subjects = await prisma.subject.findMany();
    if (subjects) {
      res.status(200).json(subjects);
    } else {
      res.status(404).json({ error: "No subjects found" });
    }
  } catch (err) {
    console.error("Get Subjects error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const addquestion = async (req, res) => {
  const { question, answer, subject_id } = req.body;
    try {
    const questionEntry = await prisma.question.create({
      data: {
        question,
        answer,
        subject_id: Number(subject_id),
      },
    });
    res.status(201).json({ message: "Question added", questionEntry });
  } catch (err) {
    console.error("Add Question error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

