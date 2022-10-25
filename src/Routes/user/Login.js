import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { login } from "../../api";

import styled from "styled-components";
import Logo from "../../components/Logo";
import { btnStyle, mediaStyle } from "../../styles/common";
import {
  AuthBlock,
  AuthWrapperStyle,
  AuthTitle,
  AuthInput,
} from "../../styles/user/auth";
import { access, admin } from "../../atom";

const Block = styled.div`
  ${mediaStyle};
  height: 88vh;
`;

const Wrapper = styled.div`
  ${AuthWrapperStyle}
  width: 450px;
  height: 580px;
  @media (max-width: 500px) {
    height: 580px;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  height: 80%;
  width: 80%;
  button {
    ${btnStyle}
    margin-top: 1.5rem;
    width: 90%;
    justify-content: center;
    font-size: 1.2rem;
    letter-spacing: 5px;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const userAccessed = useSetRecoilState(access);
  const adminAccessed = useSetRecoilState(admin);
  const { register, handleSubmit } = useForm();
  const onValid = async (data) => {
    await fetch("/user/user-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        userAccessed(() => true);
        navigate("/");
        console.log(res.admin);
        adminAccessed(() => res.admin);
      })
      .catch(() => alert("입력된 정보가 올바르지 않습니다"));
    /* console.log(data);
    const userInfos = await login(data)
      .then((res) => {
        res.json();
        userAccessed(() => true);
        navigate("/");
      })
      .catch(() => alert("입력된 정보가 올바르지 않습니다"));
    console.log(userInfos); */
  };

  return (
    <Block>
      <AuthBlock>
        <Wrapper>
          <Logo />
          <LoginForm onSubmit={handleSubmit(onValid)}>
            <AuthTitle>&nbsp; LOG IN </AuthTitle>
            <AuthInput
              {...register("userId", { required: "ID is Required" })}
              placeholder="email"
              autoComplete="off"
            />
            <AuthInput
              {...register("userPw", { required: "Password is Required" })}
              placeholder="password"
              type="password"
              autoComplete="off"
            />
            <button>로그인</button>
          </LoginForm>
        </Wrapper>
      </AuthBlock>
    </Block>
  );
};

export default Login;
