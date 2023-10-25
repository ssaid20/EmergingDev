const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// Route to handle voting on a question
router.post("/:id", rejectUnauthenticated, async (req, res) => {
    const questionId = req.params.id;
    const userId = req.user.id; 
    const { action } = req.body; // action can be 'upvote' or 'downvote'
  
    let voteTable = action === 'upvote' ? "question_upvotes" : "question_downvotes";
    let oppositeVoteTable = action === 'upvote' ? "question_downvotes" : "question_upvotes";
    let voteColumn = action === 'upvote' ? "upvotes" : "downvotes";

    try {
        // Check if user has already voted in the opposite direction
        const oppositeVoteResult = await pool.query(`SELECT * FROM "${oppositeVoteTable}" WHERE "question_id" = $1 AND "user_id" = $2`, [questionId, userId]);
        if (oppositeVoteResult.rows.length > 0) {
            throw new Error(`User has already ${action === 'upvote' ? 'downvoted' : 'upvoted'}.`);
        }

        // Check if user has already voted in the current direction
        const voteResult = await pool.query(`SELECT * FROM "${voteTable}" WHERE "question_id" = $1 AND "user_id" = $2`, [questionId, userId]);
        if (voteResult.rows.length > 0) {
            throw new Error("User has already voted in this direction.");
        }

        // User hasn't voted in either direction, so insert vote
        await pool.query(`INSERT INTO "${voteTable}" ("question_id", "user_id") VALUES ($1, $2);`, [questionId, userId]);

        // Update vote count
        await pool.query(`UPDATE "questions" SET "${voteColumn}" = "${voteColumn}" + 1 WHERE "id" = $1;`, [questionId]);

        // Fetch the updated question data after updating the vote count
        const updatedQuestionResult = await pool.query(`SELECT * FROM "questions" WHERE "id" = $1;`, [questionId]);

        // Send the updated question data in the response
        res.json(updatedQuestionResult.rows[0]);
    } catch (err) {
        if (err.message.includes("User has already")) {
            res.status(400).send({ message: err.message });
        } else {
            console.log("Error:", err);
            res.sendStatus(500);
        }
    }
});

module.exports = router;
