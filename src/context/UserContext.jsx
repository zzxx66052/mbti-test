import { useState, createContext, useContext, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    // 저장된 값이 null이 아니고, 유효한 JSON 데이터일 경우만 파싱
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error(
          "로컬 스토리지에서 유저 정보를 파싱하는데 실패했습니다:",
          error
        );
      }
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
