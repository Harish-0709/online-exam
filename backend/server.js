const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

// Sample examination data
const exam = {
    title: "Online Examination",
    subject: "Computer Science",
    duration: 30,
    questions: [
        {
            id: 1,
            question: "What does CPU stand for?",
            options: [
                "Central Processing Unit",
                "Computer Personal Unit",
                "Central Program Utility",
                "Control Processing Unit"
            ],
            answer: "Central Processing Unit"
        },
        {
            id: 2,
            question: "Which language is used for web pages?",
            options: [
                "HTML",
                "Java",
                "Python",
                "C++"
            ],
            answer: "HTML"
        }
    ]
};

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Online Examination System Backend is running"
    });
});

// Get examination
app.get("/api/exam", (req, res) => {
    res.json(exam);
});

// Submit examination
app.post("/api/submit", (req, res) => {
    const answers = req.body.answers || [];

    let score = 0;

    answers.forEach((answer) => {
        const question = exam.questions.find(q => q.id === answer.id);

        if (question && question.answer === answer.answer) {
            score++;
        }
    });

    res.json({
        message: "Examination submitted successfully",
        score: score,
        total: exam.questions.length
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});