import React, { useContext } from "react";
import { Signup } from "./pages/Auth/Signup";
import { Login } from "./pages/Auth/Login";
import { AuthLayout } from "./pages/Auth/AuthLayout";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/Auth";
import { Board } from "./pages/Board/Board";

interface RouteGuardProps {
  redirectTo?: string;
  children: JSX.Element | JSX.Element[];
}

const RouteGuard = (props: RouteGuardProps): JSX.Element => {
  const { children, redirectTo = "/login" } = props;
  const authContext = useContext(AuthContext);

  console.log("log", authContext?.authState.isAuthenticated);

  return (
    <>
      {authContext?.authState.isAuthenticated ? (
        children
      ) : (
        <Navigate to={redirectTo} replace={true} />
      )}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route
            path="/board/:boardId"
            element={
              <RouteGuard>
                <Board />
              </RouteGuard>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
