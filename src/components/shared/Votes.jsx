import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatAndDivideNumber } from "../../lib/utils";

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  hasupVoted,
  downvotes,
  hasdownVoted,
  hassaved,
}) => {

    console.log("Rendering Votes component with props:", {
        hasupVoted,
        hasdownVoted,
        upvotes,
        downvotes,
        hassaved
      });
  const dispatch = useDispatch();
  const questionDetails = useSelector(
    (store) => store.question.questionDetails[0]
  );
  
  const handleSave = () => {
    dispatch({
      type: "TOGGLE_SAVE_QUESTION",
      payload: { userId, questionId: itemId },
    });
  };

  const handleVote = (action) => {
    if (!userId) {
      return;
    }
    if ((action === 'upvote' && hasdownVoted) || (action === 'downvote' && hasupVoted)) {
      alert("You've already voted in the opposite direction.");
      return;
    }
    dispatch({
      type: "VOTE_QUESTION",
      payload: {
        questionId: JSON.parse(itemId),
        userId: JSON.parse(userId),
        action,
        hasupVoted,
        hasdownVoted,
      },
    });
  };
  console.log("hasupVoted", hasupVoted)
  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <img 
            src={hasupVoted
              ? '/assets/icons/upvoted.svg'
              : '/assets/icons/upvote.svg'
            }
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
            onClick={() => handleVote('upvote')}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(upvotes)}
            </p>
          </div>
        </div>

        <div className="flex-center gap-1.5">
          <img 
            src={hasdownVoted
              ? '/assets/icons/downvoted.svg'
              : '/assets/icons/downvote.svg'
            }
            width={18}
            height={18}
            alt="downvote"
            className="cursor-pointer"
            onClick={() => handleVote('downvote')}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>

      {type === 'Question' && (
        <img 
          src={hassaved
            ? '/assets/icons/star-filled.svg'
            : '/assets/icons/star-red.svg'
          }
          width={18}
          height={18}
          alt="star"
          className="cursor-pointer"
          onClick={handleSave}
        />
      )}
    </div>
  )
};

export default Votes;




