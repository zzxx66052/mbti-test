import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // UserContext를 통해 로그인 상태를 확인
import { toast } from "react-toastify";

const Home = () => {
  const { user } = useUser(); // 사용자 정보 확인
  const navigate = useNavigate();

  // 테스트를 시작할 때 로그인 여부를 체크하는 함수
  const handleTestClick = () => {
    if (!user) {
      toast.error(
        "로그인이 되어있지 않습니다. 로그인페이지로 이동하겠습니다.",
        {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
        }
      );
      navigate("/login"); // 로그인하지 않았다면 로그인 페이지로 리다이렉트
    } else {
      // 로그인되어 있으면 테스트 페이지로 이동
      navigate("/test");
    }
  };

  return (
    <div className="max-w-[1300px] mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-6">무료 성격 테스트</h1>
      <p className="text-center text-gray-600 mb-10">
        자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해 주세요.
      </p>

      {/* flex를 사용하여 카드들을 가로로 배치 */}
      <div className="flex flex-wrap justify-between">
        <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all w-full sm:w-1/2 lg:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">성격 유형 검사</h2>
          <p className="text-gray-600 mb-4">
            자신의 성격 유형을 파악하고 삶의 여러 영역에서 어떤 영향을 미치는지
            알아보세요.
          </p>
        </div>

        <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all w-full sm:w-1/2 lg:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">성격 유형 이해</h2>
          <p className="text-gray-600 mb-4">
            다른 사람들이 어떻게 행동하는지 이해하는 데 도움을 줄 수 있습니다.
          </p>
        </div>

        <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all w-full sm:w-1/2 lg:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">팀 평가</h2>
          <p className="text-gray-600 mb-4">
            팀 내에서 자신과 동료들의 성격을 이해하고 협력할 수 있는 방법을
            배워보세요.
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleTestClick}
          className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition-all"
        >
          테스트 하러 가기
        </button>
      </div>
    </div>
  );
};

export default Home;
