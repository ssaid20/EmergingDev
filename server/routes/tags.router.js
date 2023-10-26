// Required modules and middleware
const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");


// Get all tags
router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM "tags"';
    pool.query(queryText)
        .then((result) => res.send(result.rows))
        .catch((err) => {
            console.log('Error fetching tags', err);
            res.sendStatus(500);
        });
});

// Get all questions related to a specific tag
router.get('/:tagId/questions', (req, res) => {
    const tagId = req.params.tagId;
    const queryText = `
        SELECT questions.*
        FROM questions
        JOIN tag_questions ON questions.id = tag_questions.question_id
        WHERE tag_questions.tag_id = $1;
    `;
    pool.query(queryText, [tagId])
        .then((result) => res.send(result.rows))
        .catch((err) => {
            console.log('Error fetching questions for tag', err);
            res.sendStatus(500);
        });
});

module.exports = router;
