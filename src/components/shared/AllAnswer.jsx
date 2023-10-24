import React from "react";
import { Link, useParams } from "react-router-dom";
import { getTimestamp } from "../../lib/utils";
import ParseHTML from "./ParseHTML";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const AllAnswers = ({ author_id, totalAnswers }) => {
  const dispatch = useDispatch();
  const answers = useSelector((store) => store.answer.allanswers);
  const { id } = useParams();
  console.log("id", id);

  const integerQuestionId = parseInt(id, 10);
  useEffect(() => {
    dispatch({
      type: "FETCH_ANSWERS_FOR_QUESTION",
      payload: integerQuestionId,
    });
  }, [integerQuestionId]);

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
      </div>

      <div>
        {answers.map((answer) => (
          <article key={answer._id} className="light-border border-b py-10">
            <div className="flex items-center justify-between">
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link
                  href={`/user/${answer.author_id}`}
                  className="flex flex-1 items-start gap-1 sm:items-center"
                >
                  <img
                    src={answer.author}
                    width={18}
                    height={18}
                    alt="profile"
                    className="rounded-full object-cover max-sm:mt-0.5"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700">
                      {answer.author}
                    </p>

                    <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                      answered {getTimestamp(answer.created_at)}
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end">VOTING</div>
              </div>
            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>
    </div>
  );
};

export default AllAnswers;
