import { useState, useEffect } from "react";
import {
  getTestResults,
  updateTestResultVisibility,
  deleteTestResult,
} from "../api/testResults";
import TestResultItem from "../components/TestResultItem";
import { useUser } from "../context/UserContext";

const TestResultList = () => {
  const { user } = useUser();
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    const fetchTestResults = async () => {
      const results = await getTestResults();
      setTestResults(results);
    };

    fetchTestResults();
  }, []);

  const handleVisibilityUpdate = async (id, visibility) => {
    try {
      await updateTestResultVisibility(id, { visibility });
      // 공개 여부 변경 후, 데이터 새로 고침
      const updatedResults = await getTestResults();
      setTestResults(updatedResults);
    } catch (error) {
      console.error("Failed to update visibility:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTestResult(id);
      // 삭제 후, 데이터 새로 고침
      const updatedResults = await getTestResults();
      setTestResults(updatedResults);
    } catch (error) {
      console.error("Failed to delete test result:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-50 py-10">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">테스트 결과</h2>
      <ul>
        {testResults
          .filter(
            (result) =>
              result.visibility === true || result.userId === user.userId
          )
          .map((result) => (
            <TestResultItem
              key={result.id}
              result={result}
              isOwner={result.userId === user.userId}
              onUpdateVisibility={handleVisibilityUpdate}
              onUpdate={handleDelete}
            />
          ))}
      </ul>
    </div>
  );
};

export default TestResultList;
