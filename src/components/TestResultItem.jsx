const TestResultItem = ({ result, isOwner, onUpdateVisibility, onDelete }) => {
  const handleVisibilityToggle = async () => {
    onUpdateVisibility(result.id, result.visibility);
  };

  const handleDelete = () => {
    onDelete(result.id);
  };

  return (
    <li className="border p-4 rounded-lg mb-4 bg-white shadow-md relative">
      {/* 작성자와 작성일 */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500 font-medium absolute top-2 left-4">
          작성자: {result.userId}
        </p>
        <p className="text-sm text-gray-500 font-medium absolute top-2 right-4">
          작성일: {new Date(result.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* MBTI 구역 */}
      <div className="bg-blue-100 p-4 rounded-lg mb-4">
        <h3 className="text-2xl font-bold text-blue-600 mb-2 text-center">
          {result.type}
        </h3>
      </div>

      {/* 설명 */}
      <p className="text-gray-700 mb-4">{result.description}</p>

      {/* 버튼 영역 */}
      {isOwner && (
        <div className="flex gap-4">
          <button
            onClick={handleVisibilityToggle}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {result.visibility ? "비공개로 전환" : "공개로 전환"}
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            삭제
          </button>
        </div>
      )}
    </li>
  );
};

export default TestResultItem;
