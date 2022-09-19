import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/Auth";
import { Input } from "../../../components/Input";
import { Label } from "../../../components/Label";
import { Form } from "../Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const signup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("/v1/auth/signup", {
        name,
        email,
        password,
      })
      .then((response) => {
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
    <Form heading="Let's go!" submitText="Play with BlinkUp" onSubmit={signup}>
      <div className="mb-6">
        <Label text="Full Name">
          <Input
            type="text"
            placeholder="John Doe"
            value={name}
            setValue={setName}
            required
          />
        </Label>
      </div>
      <div className="mb-6">
        <Label text="Email">
          <Input
            type="email"
            placeholder="example@site.com"
            value={email}
            setValue={setEmail}
            required
          />
        </Label>
      </div>
      <div className="mb-6">
        <Label text="Choose Password">
          <Input
            type="password"
            placeholder="Minimum 8 characters"
            value={password}
            setValue={setPassword}
            required
          />
        </Label>
      </div>
    </Form>
  );
}
