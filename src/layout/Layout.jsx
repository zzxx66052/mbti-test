import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header>
        <nav className="p-4 bg-gray-800 text-white">
          <Link to="/" className="mr-4">
            홈
          </Link>
          <Link to="/login" className="mr-4">
            로그인
          </Link>
          <Link to="/signup" className="mr-4">
            회원가입
          </Link>
          <Link to="/profile" className="mr-4">
            프로필
          </Link>
          <button className="ml-4 bg-red-500 text-white p-2">로그아웃</button>
        </nav>
      </header>
      <Outlet />
      <footer>푸터</footer>
    </>
  );
};

export default Layout;
