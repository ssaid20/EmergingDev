// Required modules and middleware
const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// Route to handle saving a question
router.post("/:id", rejectUnauthenticated, (req, res) => {
  const questionId = req.params.id;
  const userId = req.user.id;

  // Check if user has already saved the question
  pool
    .query(
      `SELECT * FROM "user_saved_questions" WHERE "question_id" = $1 AND "user_id" = $2`,
      [questionId, userId]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        // User hasn't saved, so insert save
        pool
          .query(
            `INSERT INTO "user_saved_questions" ("question_id", "user_id") VALUES ($1, $2);`,
            [questionId, userId]
          )
          .then(() => res.sendStatus(200))
          .catch((err) => {
            console.log("Error saving question:", err);
            res.sendStatus(500);
          });
      } else {
        // User has already saved, so remove save
        pool
          .query(
            `DELETE FROM "user_saved_questions" WHERE "question_id" = $1 AND "user_id" = $2;`,
            [questionId, userId]
          )
          .then(() => res.sendStatus(200))
          .catch((err) => {
            console.log("Error removing save:", err);
            res.sendStatus(500);
          });
      }
    })
    .catch((err) => {
      console.log("Error checking save:", err);
      res.sendStatus(500);
    });
});

// Route to fetch saved questions for a user
router.get("/saved", rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;
  const query = `
    SELECT questions.* 
    FROM questions
    JOIN user_saved_questions ON questions.id = user_saved_questions.question_id
    WHERE user_saved_questions.user_id = $1;
  `;

  pool
    .query(query, [userId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error fetching saved questions:", err);
      res.sendStatus(500);
    });
});

module.exports = router;
