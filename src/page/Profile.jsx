import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Navigate } from "react-router";
import { UserContext } from "../context/UserContext";
import { updateProfile } from "../api/auth";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [nickname, setNickname] = useState(user?.nickname || "");

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await updateProfile(nickname, user.acessToken);
    if (data.success) {
      setUser({ ...user, nickname, avatar: data.avatar });
      Navigate("/");
      toast("프로필 수정에 성공했습니다.");
    }
  };

  return (
    <div>
      <div>
        <h1>프로필 수정</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>닉네임</label>
            <input value={nickname} onChange={handleNicknameChange} />
          </div>
          <button type="submit">프로필 업데이트</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
