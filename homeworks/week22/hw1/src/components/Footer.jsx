import styled from "styled-components";

const Content = styled.div`
  background-color: ${({ theme }) => theme.green_400};
  text-align: center;
  height: 42px;
  line-height: 42px;
  color: white;
`


export default function Footer () {
  return <Content>© 2022 PeaNu  Powered by React & Express</Content>
}