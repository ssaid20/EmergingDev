import { Link } from "react-router-dom";
import React from 'react'
import { useSelector } from "react-redux";
import Metric from "../shared/Metric";
import { formatAndDivideNumber, getTimestamp } from '../../lib/utils';
import RenderTag from '../shared/RenderTag';

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt
}) => {
  const user = useSelector((store) => store.user);

  const isUserAuthor = user.id === author._id;

  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link to={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>

        {isUserAuthor && (
          <div>
            {/* Add your edit/delete actions here */}
          </div>
        )}
      </div>
      
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
          <Metric 
            imgUrl="/assets/icons/avatar.svg"
            alt="user"
            value={author.name}
            title={` - asked ${getTimestamp(createdAt)}`}
            href={isUserAuthor ? `/profile` : `/profile/${author._id}`}
            isAuthor
            textStyles="body-medium text-dark400_light700"
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
            value={formatAndDivideNumber(answers.length)}
            title=" Answers"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric 
            imgUrl="/assets/icons/eye.svg"
            alt="eye"
            value={formatAndDivideNumber(views)}
            title=" Views"
            textStyles="small-medium text-dark400_light800"
          />
      </div>
      
    </div>
  )
}

export default QuestionCard;
