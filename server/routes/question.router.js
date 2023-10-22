const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

//post
router.post("/", rejectUnauthenticated, (req, res) => {
  const { title, explanation, tags } = req.body;

  const insertQuestionQuery = `
        INSERT INTO "questions" ("title", "content", "author_id")
        VALUES ($1, $2, $3)
        RETURNING "id";
    `;

  pool
    .query(insertQuestionQuery, [title, explanation, req.user.id])
    .then((result) => {
      const createdQuestionId = result.rows[0].id;

      // associate tags with the question
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

      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error posting question:", err);
      res.sendStatus(500);
    });
});

//put
router.put("/:id", (req, res) => {
  const queryText = `UPDATE "questions"
    SET "title"=$1, "content"=$2, "tags"=$3
    WHERE "id"=$4;`;
  pool
    .query(queryText, [
      req.body.title,
      req.body.explanation,
      JSON.stringify(req.body.tags),
      req.params.id,
    ])
    .then((result) => res.sendStatus(200))
    .catch((err) => {
      console.log("error on router put", err);
      res.sendStatus(500);
    });
});
// // GET request to retrieve individual question details
// router.get('/:id', (req, res) => {
//   // Assign id key to send as variable on pool.query
//   const questionId = req.params.id;

//   // SQL join query for M2M table relationships, STRING_AGG shows tags as a list separated by commas
//   const queryText = `
//     SELECT 
//       questions.id, 
//       questions.title, 
//       questions.content, 
//       questions.created_at, 
//       STRING_AGG(tags.name, ', ') AS tags,
//       u.username AS author
//     FROM questions
//     JOIN tag_questions ON tag_questions.question_id = questions.id
//     JOIN tags ON tags.id = tag_questions.tag_id
//     JOIN "user" AS u ON u.id = questions.author_id
//     WHERE questions.id = $1
//     GROUP BY questions.id, u.username;`;

//   pool.query(queryText, [questionId])
//     .then(result => {
//       // Send our data back
//       res.send(result.rows);
//     }).catch(error => {
//       console.log("error on server-side question details GET", error);
//       res.sendStatus(500);
//     });
// });

router.get('/:id', (req, res) => {
  const questionId = req.params.id;

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

  pool.query(queryText, [questionId])
    .then(result => {
      res.send(result.rows);
    }).catch(error => {
      console.log("error on server-side question details GET", error);
      res.sendStatus(500);
    });
});



//all questions
router.get("/", (req, res) => {
  const queryText = `SELECT * FROM "questions";`;
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log("error on router get all questions", err);
      res.sendStatus(500);
    });
});

module.exports = router;
