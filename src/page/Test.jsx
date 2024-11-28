import React, { useRef, useState } from "react";
import TestForm from "../components/TestForm";
import { calculateMBTI } from "../utils/mbtiCalculator";
import { createTestResult } from "../api/testResults";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";

const Test = () => {
  // MBTI 가 무엇인지 딱 MBTI 단어만 넣어주시면 됩니다!
  const [result, setResult] = useState(null);
  const { user } = useUser();
  const answeredRef = useRef(null);
  const navigate = useNavigate();

  /* Test 결과는 mbtiResult 라는 변수에 저장이 됩니다. 이 데이터를 어떻게 API 를 이용해 처리 할 지 고민해주세요. */
  /* 처리하신 후에는 MBTI 결과를 setResult 로 넣어주도록 합시다!*/
  const handleTestSubmit = async (answers) => {
    const unansweredIndex = answers.findIndex((answer) => !answer.answer);
    if (unansweredIndex !== -1) {
      toast.error(`문항 ${unansweredIndex + 1}번이 체크되지 않았습니다!`);
      answeredRef.current?.focus({ behavior: "smooth" });
      return;
    }

    const mbtiResult = calculateMBTI(answers);
    const newUserId = user.userId;
    const response = await createTestResult(mbtiResult, newUserId);
    setResult(response);
  };

  const handleNavigateToResults = () => {
    navigate("/list");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white">
      <div className="bg-white rounded-lg p-8 max-w-[1300px] w-full h-full overflow-y-auto">
        {!result ? (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6 text-center">
              MBTI
            </h1>
            <TestForm onSubmit={handleTestSubmit} />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-primary-color mb-6">
              테스트 결과: {result.type}
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              {result.description || "설명이 없습니다."}
            </p>
            <button
              onClick={handleNavigateToResults}
              className="w-full bg-blue-400 py-3 rounded-lg font-semibold hover:bg-primary-dark transition duration-300 hover:text-[#FF5A5F]"
            >
              리스트보기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Test;
