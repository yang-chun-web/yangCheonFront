import Header from "../../components/Header";
import { useForm } from "react-hook-form";
import { signUp } from "../../api";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (userInfo) => {
    signUp(userInfo).then((res) => console.log(res));
  };
  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("id")} placeholder="아이디" />
        <input {...register("pw")} placeholder="패스워드" />
        <button>등록</button>
      </form>
    </div>
  );
};

export default SignUp;
