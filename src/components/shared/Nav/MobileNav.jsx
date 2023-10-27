import { Sheet, SheetContent, SheetClose, SheetTrigger } from "../../ui/sheet";
import { Link } from "react-router-dom";
import { sidebarLinks } from "../../../constants/index";
import { Button } from "src/components/ui/button";
const NavContent = () => {
  const pathname = window.location.pathname;

  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        // TODO

        return (
          <SheetClose asChild key={item.route}>
            <Link
              to={item.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <img
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <img
          src="/assets/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <Link to="/" className="flex items-center gap-1">
          <img
            src="/assets/images/site-logo.svg"
            width={33}
            height={33}
            alt="EmergingDev"
          />
          <p className="h2-bold font-spaceGrotesk text-purple-700">
            Emerging{" "}
            <span
              className="h2-bold font-spaceGrotesk text-dark-100
         dark:text-light-900 max-sm:hidden"
            >
              Dev
            </span>
          </p>
        </Link>
        <div>
          <SheetClose asChild>
            <NavContent />
          </SheetClose>

          {/* <Button>
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link to="/login">
                  <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="primary-text-gradient">Log In</span>
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link to="/registration">
                  <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </Button> */}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
