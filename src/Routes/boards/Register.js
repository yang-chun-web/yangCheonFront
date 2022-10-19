import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import { useState } from "react";
import { mediaStyle } from "../../styles/common";
import Header from "../../components/Header";
import FileInput from "./FileInput";

const EditorBlock = styled.div`
  ${mediaStyle}
  display:flex;
  justify-content: center;
  background-color: white;
  padding-top: 3rem;
  padding-bottom: 5rem;
  min-height: 500px;
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
  margin-bottom: 2rem;
`;

const Register = () => {
  const [contents, setContents] = useState("");
  const [title, setTitle] = useState("");
  const body = {
    title,
    contents,
  };
  const toolbar = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block", "link", "image"],
    ],
  };
  const onTitleChange = (event) => {
    const { value } = event.target;
    setTitle(value);
  };

  return (
    <>
      <Header />
      <EditorBlock>
        <Wrapper>
          <TitleInput
            type="text"
            placeholder="제목을 입력하세요..."
            onChange={onTitleChange}
            required={true}
          />
          <QuillWrapper>
            <ReactQuill
              theme="snow"
              modules={toolbar}
              value={contents}
              onChange={setContents}
            />
          </QuillWrapper>
          <FileInput text={body} />
        </Wrapper>
      </EditorBlock>
    </>
  );
};

export default Register;
