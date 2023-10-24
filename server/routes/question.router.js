// Required modules and middleware
const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// Route to post a new question
router.post("/", rejectUnauthenticated, (req, res) => {
  // Destructure the request body
  const { title, explanation, tags } = req.body;

  // SQL query to insert a new question into the database
  const insertQuestionQuery = `
        INSERT INTO "questions" ("title", "content", "author_id")
        VALUES ($1, $2, $3)
        RETURNING "id";
    `;

  // Execute the query
  pool
    .query(insertQuestionQuery, [title, explanation, req.user.id])
    .then((result) => {
      const createdQuestionId = result.rows[0].id;

      // If there are tags, associate them with the question
      if (tags && tags.length > 0) {
        const insertTagQuery = `
                    INSERT INTO "tag_questions" ("tag_id", "question_id")
                    VALUES ($1, $2);
                `;
        tags.forEach((tagId) => {
          pool
            .query(insertTagQuery, [tagId, createdQuestionId])
            .catch((err) =>
              console.log("Error associating tag with question:", err)
            );
        });
      }

      // Send a success status
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error posting question:", err);
      res.sendStatus(500);
    });
});

// Route to get details of a specific question by ID
router.get("/:id", (req, res) => {
  const questionId = req.params.id;

  // SQL query to fetch question details, tags, answers, and author's username
  const queryText = `
  SELECT 
  questions.id, 
  questions.title, 
  questions.content, 
  questions.created_at, 
  ARRAY_AGG(DISTINCT tags.name) AS tags,
  ARRAY_AGG(DISTINCT answers.content) AS answers,
  u.username AS author
FROM questions
LEFT JOIN tag_questions ON tag_questions.question_id = questions.id
LEFT JOIN tags ON tags.id = tag_questions.tag_id
LEFT JOIN answers ON answers.question_id = questions.id
JOIN "user" AS u ON u.id = questions.author_id
WHERE questions.id = $1
GROUP BY questions.id, u.username;`;

  // Execute the query
  pool
    .query(queryText, [questionId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error on server-side question details GET", error);
      res.sendStatus(500);
    });
});

// // Route to get all questions
// router.get("/", (req, res) => {
//   const queryText = `SELECT * FROM "questions";`;
//   pool
//     .query(queryText)
//     .then((result) => res.send(result.rows))
//     .catch((err) => {
//       console.log("error on router get all questions", err);
//       res.sendStatus(500);
//     });
// });

router.get("/", (req, res) => {
  const queryText = `
    SELECT 
      questions.id, 
      questions.title, 
      questions.content, 
      questions.created_at, 
      u.username AS author
    FROM questions
    JOIN "user" AS u ON u.id = questions.author_id;`;

  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log("error on router get all questions", err);
      res.sendStatus(500);
    });
});


// Route to edit a specific question by ID
router.put("/:id", rejectUnauthenticated, (req, res) => {
  const { title, explanation, tags } = req.body;
  const questionId = req.params.id;

  // SQL query to update the question details
  const updateQuestionQuery = `
    UPDATE "questions"
    SET "title" = $1, "content" = $2
    WHERE "id" = $3;
  `;

  // Execute the query
  pool
    .query(updateQuestionQuery, [title, explanation, questionId])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log("Error updating question:", err);
      res.sendStatus(500);
    });
});

// Route to delete a specific question by ID
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const questionId = req.params.id;

  // SQL query to delete the question
  const deleteQuestionQuery = `
    DELETE FROM "questions"
    WHERE "id" = $1;
  `;

  // Execute the query
  pool
    .query(deleteQuestionQuery, [questionId])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log("Error deleting question:", err);
      res.sendStatus(500);
    });
});

module.exports = router;

