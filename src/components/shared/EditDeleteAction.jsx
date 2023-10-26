import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";

const EditDeleteAction = ({ type, itemId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const handleEdit = () => {
    if (type === 'Question') {
      navigate(`/question/edit/${itemId}`);
    } else if(type === 'Answer'){
      navigate(`/answer/edit/${itemId}`);
    }
  };

  const handleDelete = () => {
    if (type === 'Question') {
      dispatch({ type: "DELETE_QUESTION_REQUEST", payload: { id: itemId } });
       // Display the toast after deleting the question
       toast({
        title: "Question deleted successfully",
        description: "Your question has been deleted successfully",
      });
    } else if (type === 'Answer') {
      dispatch({ type: "DELETE_ANSWER_REQUEST", payload: { id: itemId } });
      navigate("/user");
      toast({
        title: "Answer deleted successfully",
        description: "Your answer has been deleted successfully",
      });
    }
  };

  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {(type === 'Question' || type === 'Answer') && ( // Added condition for Answer
        <img 
          src="/assets/icons/edit.svg"
          alt="Edit"
          width={14}
          height={14}
          className="cursor-pointer"
          onClick={handleEdit}
        />
      )}
      <img 
        src="/assets/icons/trash.svg"
        alt="Delete"
        width={14}
        height={14}
        className="cursor-pointer"
        onClick={handleDelete}
      />
    </div>
  )
}

export default EditDeleteAction;

