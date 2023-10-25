const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch total questions
    const totalQuestionsResult = await pool.query(`SELECT COUNT(*) as total FROM "questions" WHERE "author_id" = $1`, [userId]);
    const totalQuestions = totalQuestionsResult.rows[0].total;

    // Fetch total answers
    const totalAnswersResult = await pool.query(`SELECT COUNT(*) as total FROM "answers" WHERE "author_id" = $1`, [userId]);
    const totalAnswers = totalAnswersResult.rows[0].total;

    // Send back user object from the session with additional data
    res.send({
      ...req.user,
      totalQuestions,
      totalAnswers
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Internal Server Error');
  }
});


// router.get('/', rejectUnauthenticated, (req, res) => {
//   // Send back user object from the session (previously queried from the database)
//   res.send(req.user);
// });

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});



// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});


// Route to get questions for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const queryText = `
      SELECT 
        questions.id, 
        questions.title, 
        questions.content, 
        questions.created_at, 
        questions.author_id,
        u.username AS author
      FROM "questions"
      JOIN "user" AS u ON u.id = questions.author_id
      WHERE questions.author_id = $1
      ORDER BY questions.created_at DESC;
    `;

    const result = await pool.query(queryText, [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching questions for user:', error);
    res.status(500).send('Internal Server Error');
  }
});



// Route to get answers for a specific user
router.get('/answers/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const queryText = `
      SELECT 
        answers.id, 
        answers.content, 
        answers.created_at, 
        answers.author_id,  
        questions.title AS question_title, 
        u.username AS author  
      FROM "answers"
      JOIN questions ON answers.question_id = questions.id 
      JOIN "user" AS u ON u.id = answers.author_id  
      WHERE answers."author_id" = $1
      ORDER BY answers."created_at" DESC;
    `;

    const result = await pool.query(queryText, [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching answers for user:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Handles PUT request to update user profile
router.put('/', rejectUnauthenticated, async (req, res) => {
  try {
      const userId = req.user.id; 
      console.log("User ID:", userId);

      const { name, username, githubLink, bio } = req.body;

      const queryText = `
          UPDATE "user"
          SET 
              name = $1,
              username = $2,
              githubLink = $3,
              bio = $4
          WHERE id = $5
          RETURNING *;
      `;

      const result = await pool.query(queryText, [name, username, githubLink, bio, userId]);

      if (result.rowCount === 0) {
          res.status(404).send('User not found');
      } else {
          res.json(result.rows[0]);
      }
  } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

