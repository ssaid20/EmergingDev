const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.post("/", rejectUnauthenticated, (req, res) => {
  const { answer } = req.body;
  const insertAnswerQuery = `
        INSERT INTO "answers" ("content", "author_id", "question_id")
        VALUES ($1, $2, $3);
    `;

  pool
    .query(insertAnswerQuery, [answer, req.user.id, req.body.question_id])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error posting answer:", err);
      res.sendStatus(500);
    });
});
// to get all answers to that question
router.get('/:id', (req, res) => {
  const question_id = req.params.id;
//updated query to include upvotes, downvotes, and author
  const queryText = `
    SELECT 
      answers.id, 
      answers.content, 
      answers.created_at, 
      answers.upvotes,
      answers.downvotes,
      u.username AS author,
      CASE WHEN usq.question_id IS NOT NULL THEN TRUE ELSE FALSE END AS hassaved
    FROM "answers"
    JOIN "user" AS u ON u.id = answers.author_id
    LEFT JOIN "user_saved_questions" AS usq ON usq.question_id = answers.question_id AND usq.user_id = $2
    WHERE answers.question_id = $1;
  `;

  pool.query(queryText, [question_id, req.user.id]) 
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error fetching answers:', err);
      res.sendStatus(500);
    });
});




// router.get('/:id', (req, res) => {
//   const question_id = req.params.id;
//   console.log("Request Params:", req.params);

//   const queryText = `
//     SELECT 
//       answers.id, 
//       answers.content, 
//       answers.created_at, 
//       u.username AS author
//     FROM "answers"
//     JOIN "user" AS u ON u.id = answers.author_id
//     WHERE answers.question_id = $1;
//   `;

//   pool.query(queryText, [question_id])
//     .then((result) => {
//       res.send(result.rows);
//     })
//     .catch((err) => {
//       console.log('Error fetching answers:', err);
//       res.sendStatus(500);
//     });
// });




// Route to edit a specific answer by ID
router.put("/:id", rejectUnauthenticated, (req, res) => {
  const { content } = req.body; // Destructure the updated content from the request body
  const answerId = req.params.id;

  // SQL query to update the answer details
  const updateAnswerQuery = `
    UPDATE "answers"
    SET "content" = $1
    WHERE "id" = $2;
  `;

  // Execute the query
  pool
    .query(updateAnswerQuery, [content, answerId])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log("Error updating answer:", err);
      res.sendStatus(500);
    });
});

// Route to delete a specific answer by ID
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const answerId = req.params.id;

  // SQL query to delete the answer
  const deleteAnswerQuery = `
    DELETE FROM "answers"
    WHERE "id" = $1;
  `;

  // Execute the query
  pool
    .query(deleteAnswerQuery, [answerId])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log("Error deleting answer:", err);
      res.sendStatus(500);
    });
});

module.exports = router;
