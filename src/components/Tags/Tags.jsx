import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoResult from "../shared/NoResult";
import { Link } from "react-router-dom";

const Tags = () => {
  const dispatch = useDispatch();
  const tags = useSelector((store) => store.tags.tags);
  console.log("tags", tags);

  useEffect(() => {
    dispatch({ type: "FETCH_TAGS" });
}, [dispatch]);
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Tags</h1> 
      <section className="mt-12 flex flex-wrap gap-4">
        {tags.length > 0 ? (
          tags.map((tag)=> (
            <Link to={`/tags/${tag.id}`} key={tag.id} className="shadow-light100_darknone">
              <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
                <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
                  <p className="paragraph-semibold text-dark300_light900">
                    {tag.name}
                  </p>
                </div>

                <p className="small-medium text-dark400_light500 mt-3.5">
                  <span className="body-semibold primary-text-gradient mr-2.5">{tag.questions_count}+</span> Questions
                </p>
              </article>
            </Link>
          ))
        ) : (
          <NoResult 
            title="No Tags Found"
            description="It looks like there are no tags found."
            link="/ask-question"
            linkTitle="Ask a question"
          />
        )}
      </section>
    </>
  )
};

export default Tags;



