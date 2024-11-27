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
      <header className="bg-gray-500 bg-opacity-80 h-[65px] items-center shadow-lg">
        <nav className="max-w-[1300px] mx-auto flex justify-between items-center p-4">
          {/* 왼쪽: 홈 */}
          <Link
            to="/"
            className="text-lg font-semibold text-white hover:text-gray-300 transition duration-300"
          >
            홈
          </Link>

          {/* 오른쪽: 로그인/로그아웃, 프로필 */}
          <div className="flex justify-center items-center space-x-5">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-lg text-white hover:text-gray-300"
                >
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="text-lg text-white hover:text-gray-300"
                >
                  회원가입
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="text-lg text-white hover:text-gray-300 transition duration-300"
                >
                  <FaUserCircle className="text-2xl" />
                </Link>
                <button
                  onClick={toggleLogin}
                  className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition duration-300"
                >
                  로그아웃
                </button>
              </>
            )}
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
