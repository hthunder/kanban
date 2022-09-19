import { useState, useContext } from "react";
import { Form } from "../Form";
import { Input } from "../../../components/Input";
import { Label } from "../../../components/Label";
import axios from "axios";
import { AuthContext } from "../../../context/Auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post("/v1/auth/login", { email, password }).then((response) => {
      authContext?.setAuthInfo(
        response.data.accessToken,
        response.data.userInfo
      );

      navigate(`/board/${response.data.userInfo.boards[0].id}`, {
        replace: true,
      });
    });
  };

  return (
    <Form heading="Welcome back!" submitText="Log In" onSubmit={login}>
      <div className="mb-6">
        <Label text="Email">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            setValue={setEmail}
            required
          />
        </Label>
      </div>
      <div className="mb-6">
        <Label text="Password">
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            setValue={setPassword}
            required
          />
        </Label>
      </div>
    </Form>
  );
};
