import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditDeleteAction = ({ type, itemId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = () => {
    if (type === 'Question') {
      navigate(`/question/edit/${itemId}`);
    }
    // Add logic for editing answers 
  };

  const handleDelete = () => {
    if (type === 'Question') {
      dispatch({ type: "DELETE_QUESTION_REQUEST", payload: { id: itemId } });
      navigate("/user");
    } else if (type === 'Answer') {
      dispatch({ type: "DELETE_ANSWER_REQUEST", payload: { id: itemId } });
    }
  };

  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === 'Question' && (
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
