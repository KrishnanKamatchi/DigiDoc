/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Buffer from "./Buffer";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const AuthWrap = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [component, setComponent] = useState(<Buffer />);
  const nav = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("token") && sessionStorage.getItem("name")) {
      if (["Login", "Register"].includes(props.children.props.title)) {
        nav("/dashboard");
      }
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      if (["Register"].includes(props.children.props.title)) {
        setComponent(props.children);
      } else {
        nav("/login");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let loader = setTimeout(() => {
    if (loggedIn) {
      setComponent(props.children);
    } else {
      if (props.children.props.title == "Login") {
        setComponent(<Login title="Login" />);
      } else if (props.children.props.title == "Register") {
        setComponent(<Register title="Register" />);
      } else {
        setComponent(props.children);
      }
    }
    clearTimeout(loader);
  }, 1000);

  return <>{component}</>;
};

export default AuthWrap;
