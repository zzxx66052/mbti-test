import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useUser } from "../context/UserContext";

const Layout = () => {
  const { user, setUser } = useUser(false);
  const navigate = useNavigate();

  const toggleLogin = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <header className="bg-[#FFDDAE] w-full py-4">
        <nav className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
          {/* 왼쪽: 홈 */}
          <Link to="/" className="text-lg font-semibold">
            홈
          </Link>

          {/* 오른쪽: 로그인/로그아웃, 프로필 */}
          <div className="flex items-center space-x-6">
            {!user ? (
              <>
                <Link to="/login" className="text-lg">
                  로그인
                </Link>
                <Link to="/signup" className="text-lg">
                  회원가입
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="text-lg">
                  <FaUserCircle className="text-2xl" />
                </Link>
                <button
                  onClick={toggleLogin}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  로그아웃
                </button>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Outlet (페이지 내용이 여기에 렌더링됨) */}
      <Outlet />
    </>
  );
};

export default Layout;
