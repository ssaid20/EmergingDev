import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionCard from "../Cards/QuestionCard";

const QuestionTab = ({ userId }) => {
  const dispatch = useDispatch();
  const questions = useSelector((store) => store.question.allQuestions);

  useEffect(() => {
    // Dispatch an action to fetch the user's questions
    dispatch({ type: "FETCH_USER_QUESTIONS_REQUEST", payload: { userId } });
  }, [dispatch, userId]);
 

  return (
    <>
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          id={question.id}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes}
          views={question.views}
          answers={question.answers}
          created_at={question.created_at}
        />
      ))}
    </>
  );
};

export default QuestionTab;
