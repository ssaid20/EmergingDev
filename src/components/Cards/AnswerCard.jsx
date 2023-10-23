import { Link } from "react-router-dom";
import Metric from "../shared/Metric";
import { formatAndDivideNumber, getTimestamp } from "../../lib/utils";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ParseHTML from "../shared/ParseHTML";

const AnswerCard = ({ id, author_id, question_id, upvotes, created_at, question_title, content }) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  // const question = useSelector((store) => store.question.allQuestions);
  const isUserAuthor = user.id === author_id;

  useEffect(() => {
    dispatch({ type: "FETCH_ANSWER_SUCCESS", payload: { id } });
  }, [id, dispatch]);

  return (
    <Link
      to={`/question/${question_id}`}
      className="card-wrapper rounded-[10px] px-11 py-9"
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(created_at)}
          </span>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {question_title}
          </h3>
          <div className="answer-content mt-4">
            <ParseHTML data={content} />
          </div>
        </div>
        {isUserAuthor && <div>{/* Add your edit/delete actions here */}</div>}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl="/assets/icons/avatar.svg"
          alt="user"
          value={user.username}
          title={` • answered ${getTimestamp(created_at)}`}
          href={isUserAuthor ? `/profile` : `/profile/${author_id}`}
          textStyles="body-medium text-dark400_light700"
          isAuthor
        />

        <div className="flex-center gap-3">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="like icon"
            value={formatAndDivideNumber(upvotes)}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </Link>
  );
};

export default AnswerCard;
