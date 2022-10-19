import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { btnStyle, mediaStyle } from "../../styles/common";
import Header from "../../components/Header";
import { remove } from "../../api";

const Block = styled.div`
  ${mediaStyle}
  height: 88vh;
`;

const Wrapper = styled.div`
  position: relative;
  padding: 2rem;
  background-color: #ffffffee;
  min-height: 500px;
  z-index: 0;
`;

const Title = styled.span`
  display: block;
  font-size: 2.5rem;
  padding-bottom: 0.5rem;
`;

const CreatedAt = styled.span`
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;

const BoardContents = styled.div`
  margin-top: 1.5rem;
  margin-left: 1rem;
  min-height: 80vh;
`;

const ButtonBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 1rem;
  min-height: 80px;
  height: 10%;
`;

const EditButton = styled(Link)`
  ${btnStyle}
  padding-bottom: 0.65rem;
  padding-top: 0.65rem;
  margin-right: 1rem;
`;
const DeleteButton = styled.button`
  ${btnStyle}
  margin-right: 1rem;
  &:hover {
    color: #c10000;
  }
`;
const FileBlock = styled.div`
  display: flex;
  flex-direction: column;
  div {
    margin: 1rem;
  }
`;

const Detail = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState();
  const [files, setFiles] = useState();

  useEffect(() => {
    const { id } = param;
    const text = async (id) => {
      const { data } = await fetch(`/board/board-search-one/${id}`).then(
        (res) => res.json()
      );
      setDetail(data);
      if (data.files.length !== 0) {
        setFiles(data.files);
      }
    };
    text(id);
  }, [param]);

  const onRemoveClick = () => {
    const textId = {
      id: String(param.id),
    };
    remove(textId).then(() => navigate("/"));
  };

  return (
    <div>
      <Header />
      {detail ? (
        <Block>
          <Wrapper>
            <Title>{detail.title}</Title>
            <hr />
            <CreatedAt>
              작성일: {new Date(detail.createdAt).toLocaleDateString()}
            </CreatedAt>
            <BoardContents
              dangerouslySetInnerHTML={{ __html: `${detail.contents}` }}
            />
            <FileBlock>
              {files
                ? files.map((file) => <div key={file.hash}>{file.path}</div>)
                : ""}
            </FileBlock>
          </Wrapper>
          <ButtonBlock>
            <EditButton to={`/boards/edit/${detail._id}`}>수정하기</EditButton>
            <DeleteButton onClick={onRemoveClick}>삭제하기</DeleteButton>
          </ButtonBlock>

          {/* {Object.values(writer)[0] ? (
            <ButtonBlock>
              <EditButton to={`/edit/${detail._id}`}>수정하기</EditButton>
              <DeleteButton onClick={onRemoveClick}>삭제하기</DeleteButton>
            </ButtonBlock>
          ) : null} */}
        </Block>
      ) : null}
    </div>
  );
};

export default Detail;
