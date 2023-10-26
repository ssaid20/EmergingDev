import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import LocalSearchbar from "../shared/Search/LocalSearchbar";
import QuestionCard from "../Cards/QuestionCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import NoResult from "../shared/NoResult";


export default function Home() {
  const dispatch = useDispatch();
  const questions = useSelector(store => store.question.allQuestions);
  useEffect(() => {
    dispatch({ type: "FETCH_ALL_QUESTIONS_REQUEST" });
  }, []);
  console.log("questionsDEFF", questions)
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1> 

        <Link to="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link> 
      </div> 

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar 
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ?
          questions.map((question) => (
            <QuestionCard 
              key={question.id}
              id={question.id}
              title={question.title}
              tags={question.tags}
              author_id={question.author_id}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.total_answers}
              created_at={question.created_at}

            />
          ))
          : <NoResult 
            title="There’s no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />}
      </div>
    </>
  )
}