// Required modules and middleware
const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");


// Get all tags
// Get all tags with the count of associated questions
router.get('/', (req, res) => {
  const queryText = `
      SELECT tags.id, tags.name, tags.description, tags.created_on, COUNT(tag_questions.question_id) AS questions_count
      FROM "tags"
      LEFT JOIN "tag_questions" ON tags.id = tag_questions.tag_id
      GROUP BY tags.id
      ORDER BY tags.name;
  `;

  pool.query(queryText)
      .then((result) => {
          // Convert questions_count from string to integer
          const tagsWithCount = result.rows.map(tag => ({
              ...tag,
              questions_count: parseInt(tag.questions_count, 10)
          }));
          res.send(tagsWithCount);
      })
      .catch((err) => {
          console.log('Error fetching tags with questions count', err);
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
