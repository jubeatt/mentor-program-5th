import { useNavigate } from "react-router-dom";
import { checkPermission } from "../../utiles";
import { addPost } from "../../WebAPI";
import { LoadingContext } from "../../contexts/LoadingContext";
import { useState, useEffect, useContext } from "react";
import MDEditor from "@uiw/react-md-editor";
import styled from "styled-components";
import ErrorMessage from "../../components/ErrorMessage";

const Container = styled.div`
  max-width: ${({ theme }) => theme.containerWidth};
  padding: 10px 20px;
  margin: 0 auto;
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
  margin-bottom: 15px;
`;

const FieldName = styled.h3`
  font-size: 1.2em;
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
  max-width: 300px;
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

export default function AddPostPage() {
  const navigate = useNavigate();
  const { setIsLoading } = useContext(LoadingContext);
  const [mdValue, setMdValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [addPostError, setAddPostError] = useState(null);

  useEffect(() => {
    checkPermission().then((isLogin) => {
      // 沒登入
      if (!isLogin) return navigate("/");
    });
  }, [navigate]);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const result = await addPost(titleValue, mdValue);
    if (result.ok === 0) {
      setIsLoading(false);
      return setAddPostError(result.message);
    }
    setIsLoading(false);
    navigate("/");
  };

  const handleFormFocus = () => {
    setAddPostError(null);
  };

  const handleTitleChange = (e) => {
    setTitleValue(e.target.value);
  };

  return (
    <Container>
      <PageTitle>新增文章</PageTitle>

      {addPostError && <ErrorMessage message={addPostError} />}

      <Form method="POST" onSubmit={handleSubmit} onFocus={handleFormFocus}>
        <InputGroup>
          <Field>
            <FieldName>標題</FieldName>
          </Field>
          <Input
            type="text"
            name="title"
            placeholder="Title here"
            value={titleValue}
            onChange={handleTitleChange}
          />
        </InputGroup>
        <InputGroup>
          <Field>
            <FieldName>內文</FieldName>
          </Field>
          <MDEditor
            textareaProps={{
              placeholder: `這是 Markdown 格式的編輯器哦！`,
            }}
            height={500}
            value={mdValue}
            onChange={setMdValue}
          />
        </InputGroup>
        <SubmitButton>Post it!</SubmitButton>
      </Form>
    </Container>
  );
}
