import { Link } from "react-router-dom";
import styled from "styled-components";

const Title = styled(Link)`
  font-size: 1.8rem;
  font-weight: bold;
  margin-top: 2rem;
`;

const Logo = () => {
  return <Title to={"/"}>YANG CHEON</Title>;
};

export default Logo;
