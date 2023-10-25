import React from 'react';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button'; 
import ProfileLink from '../shared/ProfileLink';
import Stats from '../shared/Stats';
import QuestionTab from '../shared/QuestionTab';
import AnswersTab from '../shared/AnswerTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'; 

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  // Assuming you have an action to fetch user info
  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <img
            src={user.picture}
            alt="profile picture"
            width={140}
            height={140}
            className="rounded-full object-cover"
          />

          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">{user.name}</h2>
            <p className="paragraph-regular text-dark200_light800">@{user.username}</p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {user.githublink && (
                <ProfileLink 
                  imgUrl="/assets/icons/link.svg"
                  href={user.githublink}
                  title="GitHub"
                />
              )}

              <ProfileLink 
                imgUrl="/assets/icons/calendar.svg"
                title={new Date(user.joinedAt).toLocaleDateString()} // Adjust as needed
              />
            </div>

            {user.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {user.bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <Link to="/user/edit">
            <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>
      
      <Stats 
        totalQuestions={user.totalQuestions}
        totalAnswers={user.totalAnswers}
      />

      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">Top Posts</TabsTrigger>
            <TabsTrigger value="answers" className="tab">Answers</TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">
            <QuestionTab 
              userId={user.id}
            />
          </TabsContent>
          <TabsContent value="answers" className="flex w-full flex-col gap-6">
            <AnswersTab 
              userId={user.id}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

export default Profile;
