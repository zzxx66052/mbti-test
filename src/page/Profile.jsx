import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { updateProfile } from "../api/auth"; // API 수정

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호와 확인 비밀번호가 일치하는지 확인
    if (password && confirmPassword && password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    } else if (!password && !nickname) {
      setError("비밀번호와 닉네임을 모두 입력해야 합니다.");
      return;
    }

    // 두 필드가 모두 입력된 경우에만 프로필 업데이트
    if (!nickname || (!password && confirmPassword)) {
      setError("닉네임과 비밀번호를 모두 입력해주세요.");
      if (!nickname) {
        document.getElementById("nickname").focus(); // 포커스 이동
      } else {
        document.getElementById("password").focus(); // 포커스 이동
      }
      return;
    }

    try {
      // 프로필 수정 API 호출
      const userInfo = JSON.parse(localStorage.getItem("user"));
      const updateToken = userInfo?.accessToken;
      const data = await updateProfile({ nickname, password }, updateToken); // 수정된 데이터 전달
      if (data.success) {
        const updatedUser = {
          ...user,
          password: data.password,
          nickname: data.nickname,
        };
        setUser(updatedUser); // 업데이트된 user 상태로 변경
        // 로컬 스토리지에 user 데이터 저장
        localStorage.setItem("user", JSON.stringify(updatedUser));

        navigate("/"); // 홈으로 리디렉션
        toast.success("프로필 수정에 성공했습니다.");
      }
    } catch (error) {
      console.error("프로필 수정 오류:", error);
      toast.error("프로필 수정에 실패했습니다.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          프로필 수정
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">아이디</label>
            <input
              type="text"
              value={user?.id}
              disabled
              className="w-full p-2 border border-gray-300 rounded bg-gray-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">닉네임</label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="닉네임을 입력하세요"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">새 비밀번호</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">비밀번호 확인</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="비밀번호를 다시 입력하세요"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            프로필 업데이트
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
