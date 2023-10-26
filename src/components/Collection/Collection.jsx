import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import QuestionCard from "../Cards/QuestionCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import NoResult from "../shared/NoResult";

const Collection = () => {
  const dispatch = useDispatch();
  const savedQuestions = useSelector(
    (store) => store.question.userSavedQuestions
  );
console.log("savedQuestions", savedQuestions);
  useEffect(() => {
    dispatch({ type: "FETCH_SAVED_QUESTIONS_REQUEST" });
  }, []);

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {savedQuestions && savedQuestions.length > 0 ? (
          savedQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              id={question.id}
              title={question.title}
              tags={question.tags}
              author_id={question.author_id}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.total_answers}
              created_at={question.created_at}
            />
          ))
        ) : (
          <NoResult
            title="You haven't saved any questions yet."
            description="Browse through the questions and save the ones you find interesting!"
            link="/"
            linkTitle="Browse Questions"
          />
        )}
      </div>
    </>
  );
};

export default Collection;
