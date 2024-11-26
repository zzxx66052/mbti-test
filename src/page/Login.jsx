import AuthForm from "../components/AuthForm";
import { login } from "../api/auth";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const handleLogin = async (formData) => {
    try {
      const { id, password } = formData;
      const data = await login(id, password);
      if (data.success) {
        setUser(data);
        Navigate("/");
      }
    } catch (error) {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div>
      <div>
        <h1>로그인</h1>
        <AuthForm mode="login" onSubmit={handleLogin} />
        <div>
          <p>
            계정이 없으신가요? <Link to="/signup">회원가입</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
