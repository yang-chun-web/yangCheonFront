import Header from "../../components/Header";
import { useForm } from "react-hook-form";
import { signUp } from "../../api";
import { useRecoilValue } from "recoil";
import { admin } from "../../atom";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const adminCheck = useRecoilValue(admin);
  console.log(adminCheck);
  const onSubmit = (userInfo) => {
    console.log(userInfo);
    signUp(userInfo)
      .then((res) => alert(res.data.message))
      .catch((error) => {
        alert(error.response.data.message);
      });
  };
  return (
    <div>
      <Header />
      {/* {adminCheck ? ( */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("id", { required: true })} placeholder="아이디" />
          <input
            {...register("pw", { required: true })}
            placeholder="패스워드"
          />
          <button>등록</button>
        </form>
      {/* ) : ( */}
        {/* "" */}
      {/* )} */}
      
    </div>
  );
};

export default SignUp;
