import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>양천구청 온라인 콘텐츠 포털</h1>
      <div>
        <button onClick={() => navigate("/user/login")}>로그인</button>
      </div>
      <div>
        <button onClick={() => navigate("/board/list")}>게시판</button>
        <button>메타 데이터</button>
      </div>
    </div>
  );
};

export default Home;
