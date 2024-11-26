import React, { useState, useRef } from "react";
import { toast } from "react-toastify"; // 토스트 알림 사용
import "react-toastify/dist/ReactToastify.css"; // 토스트 스타일링

const AuthForm = ({ mode, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    checkPassword: "", // 비밀번호 확인 필드 (회원가입에만 필요)
    nickname: "", // 닉네임 (회원가입에만 필요)
  });

  // 각 입력 필드에 대한 ref 추가
  const idRef = useRef(null);
  const passwordRef = useRef(null);
  const checkPasswordRef = useRef(null); // 비밀번호 확인 ref (회원가입용)
  const nicknameRef = useRef(null); // 닉네임 ref (회원가입용)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 로그인 폼에 대한 유효성 검사 (로그인에서는 id와 password만 검사)
    if (mode === "login") {
      // id와 password 필드 검사
      if (!formData.id) {
        toast.error("아이디를 입력해주세요.");
        idRef.current.focus(); // 아이디 입력 필드에 포커스
        return;
      }

      if (!formData.password) {
        toast.error("비밀번호를 입력해주세요.");
        passwordRef.current.focus(); // 비밀번호 입력 필드에 포커스
        return;
      }
    }

    // 회원가입 폼에 대한 유효성 검사
    if (mode === "signup") {
      // 모든 필드가 채워졌는지 확인
      const fields = [
        { name: "id", ref: idRef },
        { name: "password", ref: passwordRef },
        { name: "checkPassword", ref: checkPasswordRef },
        { name: "nickname", ref: nicknameRef },
      ];

      for (let { name, ref } of fields) {
        if (!formData[name]) {
          toast.error(`${name}을 입력해주세요.`);
          ref.current.focus(); // 해당 입력 필드에 포커스
          return;
        }
      }

      // 비밀번호와 비밀번호 확인이 일치하는지 체크
      if (formData.password !== formData.checkPassword) {
        toast.error("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        checkPasswordRef.current.focus(); // 비밀번호 확인 입력에 포커스
        return;
      }
    }

    // 모든 유효성 검사를 통과하면 onSubmit 호출
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="아이디"
          required
          ref={idRef}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호"
          required
          ref={passwordRef}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {mode === "signup" && (
        <>
          <div>
            <input
              type="password"
              name="checkPassword"
              value={formData.checkPassword}
              onChange={handleChange}
              placeholder="비밀번호 확인"
              required
              ref={checkPasswordRef}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="닉네임"
              required
              ref={nicknameRef}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </>
      )}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md"
      >
        {mode === "login" ? "로그인" : "회원가입"}
      </button>
    </form>
  );
};

export default AuthForm;
