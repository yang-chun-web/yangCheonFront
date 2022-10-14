import { useRecoilState } from "recoil";
import { access } from "../atom";
import { AiOutlineEdit } from "react-icons/ai";
import { logout } from "../api";

import styled from "styled-components";
import { btnStyle, mediaStyle } from "../styles/common";
import { Link } from "react-router-dom";

const Block = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px #5e5e5e86;
  z-index: 5;
`;

const Wrapper = styled.div`
  ${mediaStyle}
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 1px;
  }
  .login-btn {
    display: flex;
    align-items: center;
  }
`;

const Icon = styled(Link)`
  font-size: 1.8rem;
  margin-right: 1rem;
`;

const TopSpace = styled.div`
  height: 4rem;
`;

const Button = styled(Link)`
  ${btnStyle}
`;

function Header() {
  const [activeUser, setActiveUser] = useRecoilState(access);
  const onLogoutClick = () => {
    logout().then(() => setActiveUser(() => false));
    /* logout().then(() => {
      localStorage.clear();
      setActiveUser(() => false);
    }); */
  };
  return (
    <>
      <Block>
        <Wrapper>
          <Link className="title" to={"/"}>
            YANG CHEON
          </Link>
          <div className="login-btn">
            {activeUser ? (
              <>
                <Icon to={"boards/register"}>
                  <AiOutlineEdit />
                </Icon>
                <Button onClick={onLogoutClick}>로그아웃</Button>
              </>
            ) : (
              <Button to={"/user/login"}>로그인</Button>
            )}
          </div>
        </Wrapper>
      </Block>
      <TopSpace />
    </>
  );
}

export default Header;
