import styled from "styled-components";

const ErrorBlock = styled.div`
  color: ${({ theme }) => theme.red_400};
  margin: 20px 0;
`;

export default function ErrorMessage({ message }) {
  return <ErrorBlock>{message}</ErrorBlock>;
}
