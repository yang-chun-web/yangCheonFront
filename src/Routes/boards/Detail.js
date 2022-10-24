import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { btnStyle, mediaStyle } from "../../styles/common";
import Header from "../../components/Header";
import { remove } from "../../api";
import { useRecoilState } from "recoil";
import { owner } from "../../atom";

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
  const [writer, setWriter] = useRecoilState(owner);

  useEffect(() => {
    const { id } = param;
    const text = async (id) => {
      const response = await fetch(`/board/board-search-one/${id}`).then(
        (res) => res.json()
      );
      setDetail(response.body.data);
      if (response.body.data.files.length !== 0) {
        setFiles(response.body.data.files);
      }
      setWriter(response.owner);
    };
    text(id);
  }, [param, setWriter]);

  const onRemoveClick = () => {
    const textId = {
      id: String(param.id),
    };
    remove(textId).then(() => navigate("/"));
  };

  // 다운로드
  // ipfs파일 주소 http://192.168.0.116:8080/ipfs/hash값 ? filename=path값
  const downloadClick = (file) => {
    const url =
      "http://192.168.0.123:9090/ipfs/" +
      file.hash +
      "?filename=" +
      file.path +
      "&download=true";

    const element = document.createElement("a"); // a 태그 생성
    element.download = file.path;
    element.href = url;
    document.body.appendChild(element);
    element.click();
    element.parentNode.removeChild(element);
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
                ? files.map((file) => (
                    <div key={file.hash}>
                      <a
                        target="new"
                        href={
                          "http://192.168.0.123:9090/ipfs/" +
                          file.hash +
                          "?filename=" +
                          file.path
                        }
                      >
                        {file.path}
                      </a>
                      <button onClick={() => downloadClick(file)}>
                        다운로드
                      </button>
                    </div>
                  ))
                : ""}
            </FileBlock>
          </Wrapper>

          {Object.values(writer)[0] ? (
            <ButtonBlock>
              <EditButton to={`/boards/edit/${detail._id}`}>
                수정하기
              </EditButton>
              <DeleteButton onClick={onRemoveClick}>삭제하기</DeleteButton>
            </ButtonBlock>
          ) : null}
        </Block>
      ) : null}
    </div>
  );
};

export default Detail;
