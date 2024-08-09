import { useRoutes } from "react-router-dom";
import Login from "./Pages/Login";
import AuthWrap from "./components/AuthWrap";
import Dashboard from "./Pages/Home";
import Register from "./Pages/Register";

const Routes = () => {
  const routes = useRoutes([
    {
      path: "/login",
      element: (
        <>
          <AuthWrap>
            <Login title="Login" />
          </AuthWrap>
        </>
      ),
    },
    {
      path: "/register",
      element: (
        <>
          <AuthWrap>
            <Register title="Register" />
          </AuthWrap>
        </>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <>
          <AuthWrap>
            <Dashboard title="dashboard" />
          </AuthWrap>
        </>
      ),
    },
    {
      path: "/*",
      element: (
        <>
          <AuthWrap>
            <Dashboard title="dashboard" />
          </AuthWrap>
        </>
      ),
    },
  ]);
  return routes;
};

export default Routes;
