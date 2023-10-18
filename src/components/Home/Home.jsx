import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";

export default function Home() {
  const user = useSelector((store) => store.user);
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
    </>
  );
}
