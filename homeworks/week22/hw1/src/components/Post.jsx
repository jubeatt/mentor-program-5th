import { Link } from "react-router-dom";
import styled from "styled-components";
import avatar from "../assets/avatar.jpg";
import PropTypes from "prop-types";

const PostItem = styled.li`
  padding: 24px 0;
  border-top: 1px solid ${({ theme }) => theme.gray_100};
`;
const PostHead = styled.div``;
const PostTitle = styled(Link)`
  display: block;
  margin-bottom: 15px;
  font-size: 2em;
  font-weight: bold;
`;

const PostAuthorAvatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  margin-right: 1em;
`;
const PostInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;
const PostInfoText = styled.div``;

const PostBody = styled.div``;
const PostPreviewContent = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  line-height: 1.5;
  color: ${({ theme }) => theme.gray_400};
  margin-bottom: 20px;
`;

const PostFoot = styled.div`
  text-align: right;
`;
const ReadMoreButton = styled(Link)`
  display: inline-block;
  line-height: 1;
  background-color: ${({ theme }) => theme.blue_100};
  color: ${({ theme }) => theme.blue_400};
  border-radius: 4px;
  padding: 10px 18px;
  border: none;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.blue_100};
    background-color: ${({ theme }) => theme.blue_400};
  }
`;

export default function Post({ id, title, body, createdAt }) {
  return (
    <PostItem>
      <PostHead>
        <PostTitle to={`/posts/${id}`}>{title}</PostTitle>
        <PostInfo>
          <PostAuthorAvatar src={avatar} />
          <PostInfoText>
            PeaNu posted on{" "}
            {new Date(createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </PostInfoText>
        </PostInfo>
      </PostHead>
      <PostBody>
        <PostPreviewContent>{body}</PostPreviewContent>
      </PostBody>
      <PostFoot>
        <ReadMoreButton to={`/posts/${id}`}>Read</ReadMoreButton>
      </PostFoot>
    </PostItem>
  );
}

Post.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  createdAt: PropTypes.number,
};
