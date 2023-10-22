import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Metric from "../shared/Metric";
import { formatAndDivideNumber, getTimestamp } from "../../lib/utils";
import RenderTag from "../shared/RenderTag";
import { useEffect } from "react";

export default function QuestionDetails() {
  const { id } = useParams(); // Extract the question ID from the URL parameters
  console.log("Qid", id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_QUESTION_DETAILS", payload: { id } });
  }, [id]);

  // Access question details and user from the Redux store
  const questionDetails = useSelector(
    (store) => store.question.questionDetails[0]
  );
  // const questions = questionDetails[0];
  console.log("questions", questionDetails);
  const user = useSelector((store) => store.user);
  const question = useSelector((store) => store.question.allQuestions);
  const isUserAuthor = user.id === question.author_id;

  if (!questionDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <h2 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
        {questionDetails.title}
      </h2>
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(questionDetails.created_at)}
          </span>
        </div>

        {isUserAuthor && <div>{/* Add your edit/delete actions here */}</div>}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl="/assets/icons/avatar.svg"
          alt="user"
          value={user.username}
          title={` - asked ${getTimestamp(questionDetails.created_at)}`}
          href={isUserAuthor ? `/profile` : `/profile/${questionDetails.author_id}`}
          isAuthor
          textStyles="body-medium text-dark400_light700"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="Upvotes"
          value={formatAndDivideNumber(questionDetails.upvotes)}
          title=" Votes"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(questionDetails.answers)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(questionDetails.views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
}
