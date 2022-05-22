import styled from "styled-components";

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

export default function CategoriesPage() {
  return (
    <Container>
      <PageTitle>分類</PageTitle>
    </Container>
  );
}
