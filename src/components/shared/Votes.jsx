import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatAndDivideNumber } from "../../lib/utils";
import { useToast } from "../ui/use-toast";
const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  downvotes,
  hassaved,
}) => {
  console.log("Rendering Votes component with props:", {

    upvotes,
    downvotes,
    hassaved,
  });
  const { toast } = useToast();
  const dispatch = useDispatch();
  const questionDetails = useSelector(
    (store) => store.question.questionDetails[0]
  );

  const hasUpvotedFromDetails = questionDetails.hasupvoted;
  const hasDownvotedFromDetails = questionDetails.hasdownvoted;

  console.log("questionDetails", questionDetails);
  const handleSave = () => {
    dispatch({
      type: "TOGGLE_SAVE_QUESTION",
      payload: { userId, questionId: itemId },
    });
    toast({
      title: "Question saved",
      description: "You've saved the question.",
    });
  };

  const handleVote = (action) => {
    if (!userId) {
      return;
    }
    if (
      (action === "upvote" && hasDownvotedFromDetails ) ||
      (action === "downvote" && hasUpvotedFromDetails)
    ) {
      alert("You've already voted in the opposite direction.");
      return;
    }
    dispatch({
      type: "VOTE_QUESTION",
      payload: {
        questionId: JSON.parse(itemId),
        userId: JSON.parse(userId),
        action,
        // hasupVoted,
        // hasdownVoted,
      },
    });
    toast({
      title: "Vote registered",
      description: `You've ${action}d the question.`,
    });
  };

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <img
            src={
              hasUpvotedFromDetails
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
            onClick={() => handleVote("upvote")}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(upvotes)}
            </p>
          </div>
        </div>

        <div className="flex-center gap-1.5">
          <img
            src={
              hasDownvotedFromDetails
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            width={18}
            height={18}
            alt="downvote"
            className="cursor-pointer"
            onClick={() => handleVote("downvote")}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatAndDivideNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>

      {type === "Question" && (
        <img
          src={
            hassaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          width={18}
          height={18}
          alt="star"
          className="cursor-pointer"
          onClick={handleSave}
        />
      )}
    </div>
  );
};

export default Votes;
