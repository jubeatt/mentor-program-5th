import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { LoadingContext } from "../../contexts/LoadingContext";
import { login } from "../../WebAPI";
import { setAuthToken } from "../../utiles";
import { AuthContext } from "../../contexts/AuthContext";
import { getMe } from "../../WebAPI";
import styled from "styled-components";
import ErrorMessage from "../../components/ErrorMessage";

const Container = styled.div`
  max-width: 500px;
  padding: 30px 20px;
  margin: 0 auto;
  min-height: calc(100vh - 85px - 42px);
`;

const PageTitle = styled.h2`
  padding-left: 0.5em;
  border-left: 4px solid ${({ theme }) => theme.green_400};
  margin: 20px 0 40px 0;
`;

const Form = styled.form``;
const InputGroup = styled.div`
  margin-bottom: 20px;
`;
const Field = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5em;
`;
const FieldName = styled.div`
  margin-left: 0.5em;
`;
const Input = styled.input`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.gray_300};
  padding: 12px 10px;
  border-radius: 4px;
  font-size: 1em;
  width: 100%;
  &:focus {
    outline: 0;
    box-shadow: 0 0 0 1px ${({ theme }) => theme.blue_400};
  }
`;

const SubmitButton = styled.button`
  display: block;
  width: 70%;
  color: white;
  background-color: ${({ theme }) => theme.green_400};
  padding: 16px;
  border-radius: 100px;
  border: none;
  margin: auto;
  margin-top: 40px;
  cursor: pointer;
  font-size: 1.2em;
  &:hover {
    background-color: ${({ theme }) => theme.green_100};
  }
  &:focus {
    outline: none;
    background-color: ${({ theme }) => theme.green_500};
  }
`;

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const { setIsLoading } = useContext(LoadingContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleFormFocus = () => setLoginError(null);
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const data = await login(username, password);
    if (data.ok === 0) {
      setIsLoading(false);
      return setLoginError(data.message);
    }
    setAuthToken(data.token);
    const res = await getMe();
    // getMe 失敗
    if (res.ok !== 1) {
      setIsLoading(false);
      return setAuthToken(null);
    }
    setIsLoading(false);
    setUser(res.data);
    navigate("/");
  };

  return (
    <Container>
      <PageTitle>登入</PageTitle>

      {loginError && <ErrorMessage message={loginError} />}
      <Form method="POST" onSubmit={handleSubmit} onFocus={handleFormFocus}>
        <InputGroup>
          <Field>
            <FontAwesomeIcon icon={faUser} />
            <FieldName>Username</FieldName>
          </Field>
          <Input
            type="text"
            name="username"
            placeholder="username here"
            value={username}
            onChange={handleUsernameChange}
          />
        </InputGroup>
        <InputGroup>
          <Field>
            <FontAwesomeIcon icon={faLock} />
            <FieldName>Password</FieldName>
          </Field>
          <Input
            type="password"
            name="password"
            placeholder="password here"
            value={password}
            onChange={handlePasswordChange}
          />
        </InputGroup>
        <SubmitButton>Login</SubmitButton>
      </Form>
    </Container>
  );
}
