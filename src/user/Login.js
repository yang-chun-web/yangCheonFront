import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

import styled from "styled-components";
import Logo from "../components/Logo";
import { btnStyle, mediaStyle } from "../styles/common";
import {
  AuthBlock,
  AuthWrapperStyle,
  AuthTitle,
  AuthInput,
} from "../styles/user/auth";

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
  //const active = useSetRecoilState(access);
  const { register, handleSubmit } = useForm();
  const onValid = (data) => {
    /*  login(data)
      .then(() => {
        active(() => true);
        navigate("/");
      })
      .catch(() => navigate("/login")); */
  };
  return (
    <Block>
      <AuthBlock>
        <Wrapper>
          <Logo />
          <LoginForm onSubmit={handleSubmit(onValid)}>
            <AuthTitle>&nbsp; LOG IN </AuthTitle>
            <AuthInput
              {...register("email", { required: "Email is Required" })}
              placeholder="email"
              autoComplete="off"
            />
            <AuthInput
              {...register("password", { required: "Password is Required" })}
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
