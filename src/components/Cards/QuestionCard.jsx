import { Link, useParams } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import Metric from "../shared/Metric";
import { formatAndDivideNumber, getTimestamp } from "../../lib/utils";
import RenderTag from "../shared/RenderTag";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import EditDeleteAction from "../shared/EditDeleteAction";
const QuestionCard = ({
  title,
  id,
  tags,
  created_at,
  author_id,
  author,
  upvotes,
  views,
  answers,
}) => {
  console.log("id: ", id);
  const dispatch = useDispatch();
  // Access question and user from the Redux store
  const user = useSelector((store) => store.user);
  console.log("username", user)
  const question = useSelector((store) => store.question.allQuestions);
  console.log('author_id', author_id)
  const isUserAuthor = user.id === author_id;
  console.log("User:", isUserAuthor, user.id , author_id);
  // console.log("Author:", author_id);
const store = useSelector((store)=> store)
  useEffect(() => {
    dispatch({ type: "FETCH_QUESTION_DETAILS", payload: { id } });
  }, [id, dispatch]);
console.log("store", store)
  console.log("tags", tags);
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(created_at)}
          </span>
          <Link to={`/question/${id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
        {isUserAuthor && <div>
          <EditDeleteAction type="Question" itemId={id.toString()} />
        </div>}
        
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags &&
          tags.map((tag) => (
            
            <RenderTag key={tag.id} id={tag.id} name={tag} />
          ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl="/assets/icons/avatar.svg"
          alt="user"
          value={author}
          title={` - asked ${getTimestamp(created_at)}`}
          href={isUserAuthor ? `/profile` : `/profile/${author_id}`}
          isAuthor
          textStyles="body-medium text-dark400_light800"
        />

        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="Upvotes"
          value={formatAndDivideNumber(upvotes)}
          title=" Votes"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(answers)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
};

export default QuestionCard;
