import { useEffect, useState, useContext, useRef, useCallback } from "react";
import { getPosts } from "../../WebAPI";
import { MEDIA_PC } from "../../constants/breakpoint";
import { LoadingContext } from "../../contexts/LoadingContext";
import Post from "../../components/Post";
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

const PostList = styled.ul`
  list-style-type: none;
`;

const Pagination = styled.div`
  padding: 20px 0;
`;
const PaginationHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.gray_400};
`;
const PaginationBody = styled.div`
  display: flex;
  justify-content: center;
`;
const PaginationButton = styled.button`
  padding: 6px 18px;
  color: ${({ theme }) => theme.green_400};
  border: 1px solid ${({ theme }) => theme.green_400};
  background-color: white;
  font-family: inherit;
  font-size: 0.75em;
  border-radius: 2px;
  cursor: pointer;
  & + & {
    margin-left: 4px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.green_400};
    color: white;
  }
  ${MEDIA_PC} {
    font-size: 1em;
  }
`;

export default function HomePage() {
  const { setIsLoading } = useContext(LoadingContext);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const LIMIT = useRef(10);
  const totalPage = useRef(0);

  const handleChangePage = useCallback((direction) => {
    if (direction === "first") return setPage(1);
    if (direction === "next") return setPage((prev) => prev + 1);
    if (direction === "back") return setPage((prev) => prev - 1);
    if (direction === "last") return setPage(totalPage.current);
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // 當 render 完以後才執行。
    setIsLoading(true);
    getPosts(page, LIMIT).then(([data, total]) => {
      totalPage.current = Math.ceil(total / LIMIT.current);
      setPosts(data);
      // 為了 UX 而加的，不然閃太快了
      setTimeout(() => setIsLoading(false), 500);
    });
  }, [setIsLoading, page]);

  return (
    <Container>
      <PageTitle>首頁</PageTitle>
      <PostList>
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            createdAt={post.createdAt}
          />
        ))}
      </PostList>
      <Pagination>
        <PaginationHeader>
          目前在第 {page} 頁，總共有 {totalPage.current} 頁
        </PaginationHeader>
        <PaginationBody>
          {page !== 1 && (
            <>
              <PaginationButton onClick={() => handleChangePage("first")}>
                第一頁
              </PaginationButton>
              <PaginationButton onClick={() => handleChangePage("back")}>
                上一頁
              </PaginationButton>
            </>
          )}

          {page < totalPage.current && (
            <>
              <PaginationButton onClick={() => handleChangePage("next")}>
                下一頁
              </PaginationButton>
              <PaginationButton onClick={() => handleChangePage("last")}>
                最後一頁
              </PaginationButton>
            </>
          )}
        </PaginationBody>
      </Pagination>
    </Container>
  );
}
