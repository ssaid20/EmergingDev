import { sidebarLinks } from '../../constants/index';
import { Link } from 'react-router-dom'; // Import from react-router-dom
import { Button } from '../ui/button';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from "react-redux";

const LeftSidebar = () => {
  const user = useSelector((store) => store.user);
  // You might need another way to get the current pathname if you're using react-router
  const pathname = window.location.pathname;

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route;

          if(item.route === '/profile' && user) {
            item.route = `${item.route}/${user.id}`;
          }

          return (
            <Link
              to={item.route} 
              key={item.label}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900"
              }  flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <img 
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p className={`${isActive ? 'base-bold' : 'base-medium'} max-lg:hidden`}>{item.label}</p>
            </Link>
          )
        })}
      </div>

      {!user.id && ( // Check if user is not authenticated
        <div className="flex flex-col gap-3">
          <Link to="/login">
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <img 
                src="/assets/icons/account.svg"
                alt="login"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              /> 
              <span className="primary-text-gradient max-lg:hidden">Log In</span>
            </Button>
          </Link>

          <Link to="/registration">
            <Button className='small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none'>
              <img 
                src="/assets/icons/sign-up.svg"
                alt="sign up"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              /> 
              <span className="max-lg:hidden">Sign up</span>
            </Button>
          </Link>
        </div>
      )}

      {/* If a user is logged in, show these links */}
      {user.id && (
          <>
            <LogOutButton className="navLink" />
          </>
        )}
    </section>
  )
}

export default LeftSidebar;
