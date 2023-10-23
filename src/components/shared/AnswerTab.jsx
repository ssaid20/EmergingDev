import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnswerCard from "../Cards/AnswerCard";

const AnswersTab = ({ userId }) => {
  const dispatch = useDispatch();
  const answers = useSelector((store) => store.answer.userAnswers);

  useEffect(() => {
    // Dispatch an action to fetch the user's questions
    dispatch({ type: "FETCH_USER_ANSWERS_REQUEST", payload: { userId } });
  }, [dispatch, userId]);

  console.log("answers: ", answers);

  return (
    <>
      {answers.map((answer) => (
        <AnswerCard
          key={answer.id}
          id={answer.id}
          question_id={answer.question_id}
          question_title={answer.question_title}
          content={answer.content}
          author={answer.author}
          upvotes={answer.upvotes}
          created_at={answer.created_at}
        />
      ))}
    </>
  );
};

export default AnswersTab;
