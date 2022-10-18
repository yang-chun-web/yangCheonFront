import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { btnStyle } from "../../styles/common";
import { boardEdit } from "../../api";
import styled from "styled-components";
import { file } from "@babel/types";

const Button = styled.button`
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

const FileEdit = ({ id, text, files }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, control, reset, watch } = useForm({
    defaultValues: {
      file: [{}],
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "file" });
  const watchResult = watch("file");
  const [count, setCount] = useState(watchResult.length);
  const [fileList, setFileList] = useState();

  const onSubmit = async (e) => {
    if (text.title !== "") {
      const formData = new FormData();
      const imageList = e.file;
      const oldFiles = fileList;
      formData.append("id", id);
      formData.append("title", text.title);
      formData.append("contents", text.contents);
      imageList.forEach((item, index, array) => {
        formData.append("files", item.name[0]);
      });
      if (oldFiles) {
        oldFiles.forEach((item) => {
          formData.append("oldFiles", item.hash);
        });
      }
      boardEdit(formData)
        .then(() => navigate("/"))
        .catch((error) => console.log(error));
    } else {
      alert("제목을 입력하세요");
    }
  };

  const onAppendClick = () => {
    if (watchResult.length < 5) {
      append();
      setCount((count) => count + 1);
    }
  };

  const onChange = (event) => {
    const { size } = event.target.files[0];
    const file = event.target.files[0];
    console.log(URL.createObjectURL(file));
    if (size > 3 * 1024 * 1024) {
      alert("3MB 넘는 파일은 업로드할 수 없습니다.");
      reset();
    }
  };

  const onClick = (e) => {
    const deleteIndex = e.target.id;
    setFileList((list) => {
      const listCopy = [...list];
      listCopy.splice(deleteIndex, 1);
      return listCopy;
    });
  };

  useEffect(() => {
    setFileList(files);
  }, [files]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <div>
        {fileList
          ? fileList.map((file, index) => (
              <div key={file.hash}>
                <span>{file.path}</span>{" "}
                <span id={index} onClick={onClick}>
                  ❌
                </span>
              </div>
            ))
          : ""}
        {fields.map((item, index) => {
          return (
            <div key={item.id}>
              <input
                {...register(`file.${index}.name`, {
                  onChange: onChange,
                })}
                type="file"
              />
              <button
                type="button"
                onClick={() => {
                  const watchResult = watch("file");
                  if (watchResult.length > 1) {
                    remove(index);
                    setCount((count) => count - 1);
                  }
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
      {count < 5 ? (
        <button type="button" onClick={onAppendClick}>
          append
        </button>
      ) : (
        ""
      )}
      <div style={{ marginTop: "1rem" }}>
        <Button>수정하기</Button>
        <CancelButton to={`/boards/${id}`}>취소</CancelButton>
      </div>
    </form>
  );
};

export default FileEdit;
