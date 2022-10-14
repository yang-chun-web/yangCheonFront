import styled, { css } from "styled-components";

export const AuthBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const AuthBlockStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 450px;
  height: 580px;
  padding: 1rem;
  border: 1px solid #b4b4b43d;
  box-shadow: 2px 2px 3px #b4b4b4c0;
  background-color: #ffffff;
  overflow-y: auto;

  @media (max-width: 500px) {
    width: 90%;
    height: 580px;
  }
`;

export const AuthWrapperStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #b4b4b43d;
  box-shadow: 2px 2px 3px #b4b4b4c0;
  background-color: #ffffff;
  overflow-y: auto;

  @media (max-width: 500px) {
    width: 90%;
  }
`;

export const AuthTitle = styled.span`
  display: block;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  margin-top: 2rem;
  font-weight: bold;
  border-bottom: 1.5px solid #2e2e2eb2;
  padding-bottom: 8px;
  letter-spacing: 2px;
  width: 100%;
`;

export const AuthTitleStyle = css`
  display: block;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  margin-top: 2rem;
  font-weight: bold;
  border-bottom: 1.5px solid #2e2e2eb2;
  padding-bottom: 8px;
  letter-spacing: 2px;
  width: 100%;
`;

export const AuthInput = styled.input`
  margin-top: 1.8rem;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  border: none;
  border-bottom: 1px solid #88888860;
  box-shadow: 1px 1px 2px #7a7a7a7b;
  padding: 10px;
  width: 80%;
`;

export const AuthInputStyle = css`
  margin-top: 1.8rem;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  border: none;
  border-bottom: 1px solid #88888860;
  box-shadow: 1px 1px 2px #7a7a7a7b;
  padding: 10px;
  width: 80%;
`;
