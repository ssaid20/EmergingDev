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

module.exports = router;
