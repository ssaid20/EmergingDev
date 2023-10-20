const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

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

module.exports = router;
