import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Metric from "../shared/Metric";
import { formatAndDivideNumber, getTimestamp } from "../../lib/utils";
import RenderTag from "../shared/RenderTag";
import { useEffect } from "react";


export default function QuestionDetails() {
  const { id } = useParams(); // Extract the question ID from the URL parameters
  const dispatch = useDispatch();
 

  // Access question details and user from the Redux store
  const questionDetails = useSelector(
    (store) => store.question.questionDetails
  );
  const questions = questionDetails[0];
  const user = useSelector((store) => store.user);
  const question = useSelector((store) => store.question.allQuestions);
  const isUserAuthor = user.id === question.author_id;

  useEffect(() => {
    dispatch({ type: "FETCH_QUESTION_DETAILS", payload: { id } });
  }, []);

  if (!questionDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <h2>{questions.title}</h2>
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(questions.created_at)}
          </span>
        </div>
        
        {isUserAuthor && <div>{/* Add your edit/delete actions here */}</div>}
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {/* remeber to change it to questions so it can display if this doesn't work */}
        {questionDetails.tags &&
          questionDetails.tags.map((tag) => (
            <RenderTag key={tag.id} id={tag.id} name={tag.name} />
          ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl="/assets/icons/avatar.svg"
          alt="user"
          value={user.username}
          title={` - asked ${getTimestamp(questions.created_at)}`}
          href={
            isUserAuthor ? `/profile` : `/profile/${questions.author_id}`
          }
          isAuthor
          textStyles="body-medium text-dark400_light700"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="Upvotes"
          value={formatAndDivideNumber(questions.upvotes)}
          title=" Votes"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(questions.answers)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(questions.views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
}
