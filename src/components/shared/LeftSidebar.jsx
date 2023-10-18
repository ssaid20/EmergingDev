import { sidebarLinks } from '../../constants';
import { Link } from 'react-router-dom'; // Import from react-router-dom
// import { Button } from '../ui/button';
import { useAuth } from '../../context/AuthContext'; // Update the path

const LeftSidebar = () => {
  const { currentUser } = useAuth();
  // You might need another way to get the current pathname if you're using react-router
  const pathname = window.location.pathname;

  return (
    <section className="background-light900_dark200 ...">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route;

          if(item.route === '/profile' && currentUser) {
            item.route = `${item.route}/${currentUser.id}`;
          }

          return (
            <Link
              to={item.route} 
              key={item.label}
              className={`...`}
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

      {!currentUser && ( // Check if user is not authenticated
        <div className="flex flex-col gap-3">
          <Link to="/login">
            <Button className="small-medium btn-secondary ...">
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
            <Button className='small-medium ...'>
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
    </section>
  )
}

export default LeftSidebar;
