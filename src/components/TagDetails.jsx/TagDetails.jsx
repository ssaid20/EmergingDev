import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; 
import QuestionCard from "../Cards/QuestionCard";

const TagDetails = () => {
    const dispatch = useDispatch();
    const questionsForTag = useSelector((store) => store.tags.questionsForTag);
    console.log("questionsForTag", questionsForTag);
    const { tagId } = useParams(); // Extract tagId from the URL
    console.log("tagId", tagId);

    useEffect(() => {
        dispatch({ type: "FETCH_QUESTIONS_FOR_TAG", payload: tagId });
    }, [dispatch, tagId]);

    return (
        <>
            {questionsForTag.map((question) => (
                <QuestionCard
                    key={question.id}
                    id={question.id}
                    title={question.title}
                    tags={question.tags}
                    author_id={question.author_id}
                    author={question.author}
                    upvotes={question.upvotes}
                    views={question.views}
                    answers={question.answers}
                    created_at={question.created_at}
                />
            ))}
        </>
    );
}

export default TagDetails;





  
 
