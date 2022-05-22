import styled from "styled-components";
import MDEditor from "@uiw/react-md-editor";

const Container = styled.div`
  max-width: ${({ theme }) => theme.containerWidth};
  padding: 10px 20px;
  margin: 0 auto;
  min-height: calc(100vh - 85px - 42px);
`;

const PageTitle = styled.h2`
  padding-left: 0.5em;
  border-left: 4px solid ${({ theme }) => theme.green_400};
  margin: 20px 0 40px 0;
`;

const Wrapper = styled.div`
  padding: 0 0 20px 0;
`

const content = `
這是用 React 串接 [Lidemy 學生專用 API Server](https://github.com/Lidemy/lidemy-student-json-api-server) 打造的簡易部落格。

目前做好的功能有：

- 登入 / 註冊機制
- 發文功能
- 顯示文章列表
- 分頁功能
- Markdown 編輯器
- RWD

大概就這樣吧！不過我希望這個部落格可以更完整一些，希望之後可以有：

- 文章留言功能
- landing page 頁面
- 個人 Profile 頁面
- 每個使用者都可以有自己的文章列表

所以，沒意外的話之後會自己重新寫一個後端來串吧，目前這個 API 能做的事情非常有限，加油加油～ 

想知道更多詳細資訊可以參考我的 [Repository](https://github.com/jubeatt/React-blog)
`;

export default function AboutPage() {
  return (
    <Container>
      <PageTitle>關於這個部落格</PageTitle>
      <Wrapper>
        <MDEditor.Markdown source={content} />
      </Wrapper>
    </Container>
  );
}
