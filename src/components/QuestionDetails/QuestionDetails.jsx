import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Metric from "../shared/Metric";
import { formatAndDivideNumber, getTimestamp } from "../../lib/utils";
import RenderTag from "../shared/RenderTag";
import ParseHTML from '../shared/ParseHTML';

export default function QuestionDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_QUESTION_DETAILS", payload: { id } });
  }, [id]);

  const questionDetails = useSelector(
    (store) => store.question.questionDetails[0]
  );
  const user = useSelector((store) => store.user);
  const question = useSelector((store) => store.question.allQuestions);
  const isUserAuthor = user.id === question.author_id;

  if (!questionDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <a href={isUserAuthor ? `/user` : `/user/${questionDetails.author_id}`} className="flex items-center justify-start gap-1">
            <img 
              src={user.profilePicture} 
              className="rounded-full"
              width={22}
              height={22}
              alt="profile"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {user.username}
            </p>
          </a>
          <div className="flex justify-end">
            {/* Placeholder for VOTING */}
            VOTING
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {questionDetails.title}
        </h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric 
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimestamp(questionDetails.created_at)}`}
          title=" Asked"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric 
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(questionDetails.answers.length)} // Assuming answers is an array
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

      <ParseHTML data={questionDetails.content} /> 


      {/* <div className="mt-8 flex flex-wrap gap-2">
        {questionDetails.tags.map((tag) => (
          <RenderTag 
            key={tag.id}
            _id={tag.id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div> */}


      {/* <Answer /> */}
    </>
  );
}
