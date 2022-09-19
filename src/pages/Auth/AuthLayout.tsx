import { Outlet, useLocation, Link } from "react-router-dom";
import siteLogo from "../../assets/site-logo.svg";
import { Button } from "../../components/Button";

const map: {
  [key: string]: { text: string; buttonText: string; buttonLink: string };
} = {
  "/signup": {
    text: "Already playing with BlinkUp?",
    buttonText: "Login",
    buttonLink: "/login",
  },
  "/login": {
    text: "Don't have an account",
    buttonText: "Sign up",
    buttonLink: "/signup",
  },
};

export const AuthLayout = () => {
  const location = useLocation();
  const { buttonText, buttonLink, text } = map[location.pathname];

  return (
    <div>
      <nav className="flex justify-between px-6 py-8">
        <div className="flex">
          <img src={siteLogo} width={40} height={40} />
          <span className="text-2xl">BlinkUp</span>
        </div>
        <div>
          <span className="mr-4">{text}</span>
          <Link to={buttonLink}>
            <Button text={buttonText} />
          </Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};
