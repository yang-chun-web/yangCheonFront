import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";

import { btnStyle, mediaStyle } from "../../styles/common";
import FileEdit from "./FileEdit";

const EditorBlock = styled.div`
  ${mediaStyle}
  display:flex;
  justify-content: center;
  background-color: white;
  min-height: 500px;
  padding-top: 3rem;
  padding-bottom: 5rem;
  height: 80vh;
`;

const TitleInput = styled.input`
  font-size: 2rem;
  outline: none;
  border: none;
  border-bottom: 1px solid gray;
  padding-bottom: 0.5rem;
  margin-bottom: 2.5rem;
  background-color: inherit;
  margin-left: 1.2rem;
  width: 70%;
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const Wrapper = styled.div`
  width: 80%;
`;

const QuillWrapper = styled.div`
  .ql-editor {
    padding: 5px;
    padding-top: 10px;
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.2;
    @media (max-width: 600px) {
      font-size: 0.8rem;
    }
  }
  .ql-editor.ql-blank::before {
    left: 0px;
  }
  margin-bottom: 2.5rem;
`;

const Button = styled.span`
  ${btnStyle}
  margin-left:1rem;
  letter-spacing: 2px;
`;

const CancelButton = styled(Link)`
  ${btnStyle}
  margin-left:1.5rem;
  &:hover {
    color: #cb0000;
  }
`;

const Edit = () => {
  const param = useParams();
  const navigate = useNavigate();
  const { id } = param;
  const [detail, setDetail] = useState();
  const [files, setFiles] = useState();

  const toolbar = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block", "link", "image"],
    ],
  };

  const text = async (id) => {
    const  data  = await fetch(`/board/board-search-one/${id}`)
    .then(
      (res) => res.json()
      );
      setDetail(data.body.data);
    if (data.body.data.files.length !== 0) {
      setFiles(data.body.data.files);
    }
  };

  const onTitleChange = (event) => {
    if (detail) {
      setDetail({ ...detail, title: event.target.value });
    }
  };

  const onContentChange = (content, delta, source, editor) => {
    if (detail) {
      setDetail({ ...detail, contents: editor.getHTML() });
    }
  };

  useEffect(() => {
    const { id } = param;
    text(id);
  }, [param]);
  return (
    <>
      <Header />
      <EditorBlock>
        <Wrapper>
          <TitleInput
            type="text"
            name="title"
            required={true}
            onChange={onTitleChange}
            defaultValue={detail?.title}
          />
          <QuillWrapper>
            <ReactQuill
              theme="snow"
              modules={toolbar}
              onChange={onContentChange}
              value={detail?.contents}
            />
          </QuillWrapper>
          <FileEdit id={id} text={detail} files={files} />
        </Wrapper>
      </EditorBlock>
    </>
  );
};

export default Edit;
