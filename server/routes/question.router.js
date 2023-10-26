// Required modules and middleware
const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// Route to post a new question
router.post("/", rejectUnauthenticated, async (req, res) => {
  const { title, explanation, tags } = req.body;

  const insertQuestionQuery = `
        INSERT INTO "questions" ("title", "content", "author_id")
        VALUES ($1, $2, $3)
        RETURNING "id";
    `;

  try {
    const result = await pool.query(insertQuestionQuery, [title, explanation, req.user.id]);
    const createdQuestionId = result.rows[0].id;

    if (tags && tags.length > 0) {
      for (let tagName of tags) {
        // Check if tag exists in the tags table
        let tagResult = await pool.query('SELECT id FROM "tags" WHERE name = $1', [tagName]);

        let tagId;
        if (tagResult.rows.length === 0) {
          // If tag doesn't exist, insert it
          const insertTagResult = await pool.query('INSERT INTO "tags" (name) VALUES ($1) RETURNING id', [tagName]);
          tagId = insertTagResult.rows[0].id;
        } else {
          tagId = tagResult.rows[0].id;
        }

        // Associate the tag with the question
        await pool.query('INSERT INTO "tag_questions" ("tag_id", "question_id") VALUES ($1, $2)', [tagId, createdQuestionId]);
      }
    }

    res.sendStatus(201);
  } catch (err) {
    console.log("Error posting question:", err);
    res.sendStatus(500);
  }
});


// router.post("/", rejectUnauthenticated, (req, res) => {
//   // Destructure the request body
//   const { title, explanation, tags } = req.body;

//   // SQL query to insert a new question into the database
//   const insertQuestionQuery = `
//         INSERT INTO "questions" ("title", "content", "author_id")
//         VALUES ($1, $2, $3)
//         RETURNING "id";
//     `;

//   // Execute the query
//   pool
//     .query(insertQuestionQuery, [title, explanation, req.user.id])
//     .then((result) => {
//       const createdQuestionId = result.rows[0].id;

//       // If there are tags, associate them with the question
//       if (tags && tags.length > 0) {
//         const insertTagQuery = `
//                     INSERT INTO "tag_questions" ("tag_id", "question_id")
//                     VALUES ($1, $2);
//                 `;
//         tags.forEach((tagId) => {
//           pool
//             .query(insertTagQuery, [tagId, createdQuestionId])
//             .catch((err) =>
//               console.log("Error associating tag with question:", err)
//             );
//         });
//       }

//       // Send a success status
//       res.sendStatus(201);
//     })
//     .catch((err) => {
//       console.log("Error posting question:", err);
//       res.sendStatus(500);
//     });
// });

router.get("/:id", (req, res) => {
  const questionId = req.params.id;
  console.log("Question ID:", questionId);

  // SQL query to fetch question details, tags, answers, author's username, votes, and saved status
  const queryText = `
  SELECT 
  questions.id, 
  questions.title, 
  questions.content, 
  questions.created_at, 
  questions.upvotes,
  questions.downvotes,
  EXISTS(SELECT 1 FROM question_upvotes WHERE question_id = questions.id AND user_id = $2) AS hasupVoted,
  EXISTS(SELECT 1 FROM question_downvotes WHERE question_id = questions.id AND user_id = $2) AS hasdownVoted,
  EXISTS(SELECT 1 FROM user_saved_questions WHERE question_id = questions.id AND user_id = $2) AS hassaved,
  ARRAY_AGG(DISTINCT tags.name) AS tags,
  ARRAY_AGG(DISTINCT answers.content) AS answers,
  u.username AS author,
  u.id AS author_id
FROM questions
LEFT JOIN tag_questions ON tag_questions.question_id = questions.id
LEFT JOIN tags ON tags.id = tag_questions.tag_id
LEFT JOIN answers ON answers.question_id = questions.id
JOIN "user" AS u ON u.id = questions.author_id
WHERE questions.id = $1
GROUP BY questions.id, u.username, u.id;`;

  const userId = req.user.id;

  // Execute the query
  pool
    .query(queryText, [questionId, userId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error on server-side question details GET", error);
      res.sendStatus(500);
    });
});

// Route to get all questions
///TODO: Update it to access votes
router.get("/", (req, res) => {
  const queryText = `
    SELECT 
      questions.id, 
      questions.title, 
      questions.content, 
      questions.created_at, 
      questions.views,
      questions.upvotes,
      questions.downvotes,
      u.username AS author,
      u.id AS author_id,
      COUNT(answers.id) AS total_answers,
      ARRAY_AGG(DISTINCT tags.name) FILTER (WHERE tags.name IS NOT NULL) AS tags
    FROM questions
    LEFT JOIN tag_questions ON tag_questions.question_id = questions.id
    LEFT JOIN tags ON tags.id = tag_questions.tag_id
    LEFT JOIN answers ON answers.question_id = questions.id
    JOIN "user" AS u ON u.id = questions.author_id
    GROUP BY questions.id, u.username, u.id
    ORDER BY questions.created_at DESC;`;

  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log("error on router get all questions", err);
      res.sendStatus(500);
    });
});



// router.get("/", (req, res) => {
//   const queryText = `
//     SELECT 
//       questions.id, 
//       questions.title, 
//       questions.content, 
//       questions.created_at, 
//       u.username AS author
//     FROM questions
//     JOIN "user" AS u ON u.id = questions.author_id;`;

//   pool
//     .query(queryText)
//     .then((result) => res.send(result.rows))
//     .catch((err) => {
//       console.log("error on router get all questions", err);
//       res.sendStatus(500);
//     });
// });

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

  // SQL query to delete references in user_saved_questions
  const deleteUserSavedQuestionQuery = `
    DELETE FROM "user_saved_questions"
    WHERE "question_id" = $1;
  `;

  // SQL query to delete upvotes references in question_upvotes
  const deleteQuestionUpvotesQuery = `
    DELETE FROM "question_upvotes"
    WHERE "question_id" = $1;
  `;

  // SQL query to delete the question
  const deleteQuestionQuery = `
    DELETE FROM "questions"
    WHERE "id" = $1;
  `;

  // First, delete references in user_saved_questions
  pool
    .query(deleteUserSavedQuestionQuery, [questionId])
    .then(() => {
      // Then, delete upvotes references in question_upvotes
      return pool.query(deleteQuestionUpvotesQuery, [questionId]);
    })
    .then(() => {
      // Finally, delete the question
      return pool.query(deleteQuestionQuery, [questionId]);
    })
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log("Error deleting question:", err);
      res.sendStatus(500);
    });
});


// router.delete("/:id", rejectUnauthenticated, (req, res) => {
//   const questionId = req.params.id;

//   // SQL query to delete the question
//   const deleteQuestionQuery = `
//     DELETE FROM "questions"
//     WHERE "id" = $1;
//   `;

//   // Execute the query
//   pool
//     .query(deleteQuestionQuery, [questionId])
//     .then(() => res.sendStatus(200))
//     .catch((err) => {
//       console.log("Error deleting question:", err);
//       res.sendStatus(500);
//     });
// });


// Route to handle voting on a question
router.post("/:id/vote", rejectUnauthenticated, (req, res) => {
  const questionId = req.params.id;
  const userId = req.user.id; 
  const { action } = req.body; // action can be 'upvote' or 'downvote'

  let voteTable = action === 'upvote' ? "question_upvotes" : "question_downvotes";
  let voteColumn = action === 'upvote' ? "upvotes" : "downvotes";

  // Check if user has already voted
  pool.query(`SELECT * FROM "${voteTable}" WHERE "question_id" = $1 AND "user_id" = $2`, [questionId, userId])
    .then(result => {
      if (result.rows.length === 0) {
        // User hasn't voted, so insert vote and update vote count
        pool.query(`INSERT INTO "${voteTable}" ("question_id", "user_id") VALUES ($1, $2);
                    UPDATE "questions" SET "${voteColumn}" = "${voteColumn}" + 1 WHERE "id" = $1;`, [questionId, userId])
          .then(() => res.sendStatus(200))
          .catch(err => {
            console.log("Error voting on question:", err);
            res.sendStatus(500);
          });
      } else {
        // User has already voted
        res.status(400).send({ message: "User has already voted." });
      }
    })
    .catch(err => {
      console.log("Error checking vote:", err);
      res.sendStatus(500);
    });
});


// Route to handle saving a question
router.post("/:id/save", rejectUnauthenticated, (req, res) => {
  const questionId = req.params.id;
  const userId = req.user.id; 

  // Check if user has already saved the question
  pool.query(`SELECT * FROM "user_saved_questions" WHERE "question_id" = $1 AND "user_id" = $2`, [questionId, userId])
    .then(result => {
      if (result.rows.length === 0) {
        // User hasn't saved, so insert save
        pool.query(`INSERT INTO "user_saved_questions" ("question_id", "user_id") VALUES ($1, $2);`, [questionId, userId])
          .then(() => res.sendStatus(200))
          .catch(err => {
            console.log("Error saving question:", err);
            res.sendStatus(500);
          });
      } else {
        // User has already saved, so remove save
        pool.query(`DELETE FROM "user_saved_questions" WHERE "question_id" = $1 AND "user_id" = $2;`, [questionId, userId])
          .then(() => res.sendStatus(200))
          .catch(err => {
            console.log("Error removing save:", err);
            res.sendStatus(500);
          });
      }
    })
    .catch(err => {
      console.log("Error checking save:", err);
      res.sendStatus(500);
    });
});


router.get("/search", (req, res) => {
  const searchTerm = req.query.q;

  // SQL query to search for the term in the database
  const searchQuery = `
      SELECT * FROM "questions"
      WHERE "title" ILIKE $1 OR "content" ILIKE $1;
  `;

  pool
      .query(searchQuery, [`%${searchTerm}%`])
      .then((result) => res.send(result.rows))
      .catch((err) => {
          console.log("Error searching questions:", err);
          res.sendStatus(500);
      });
});


module.exports = router;

