import React, { useState, useEffect } from "react";
import { addRating, fetchRatingsByStory } from "@/app/api/ratings.api";
import useUserContext from "@/hooks/users/userUserContext";

interface Rating {
  id: number;
  user_id: number;
  story_id: number;
  star: number;
  comment: string;
}

const StarRating = ({
  star,
  setStar,
}: {
  star: number;
  setStar: (value: number) => void;
}) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => setStar(value)}
          className={`text-2xl ${value <= star ? "text-yellow-400" : "text-gray-400"} hover:text-yellow-500`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const RatingComponent = ({ storyId }: { storyId: number }) => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [newRating, setNewRating] = useState({ star: 0, comment: "" });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { loggedInUser } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Giả sử fetchRatingsByStory trả về một mảng các đánh giá hợp lệ
        // const data = await fetchRatingsByStory(storyId);
        // if (data?.ratings && Array.isArray(data.ratings)) {
        //   // Kiểm tra dữ liệu đánh giá trước khi set
        //   const validRatings = data.ratings.filter((rating: any) => rating.star && rating.comment);
        //   setRatings(validRatings);
        // } else {
        //   setRatings([]); // Nếu không có đánh giá nào hoặc không có dữ liệu hợp lệ
        // }
        setLoading(false);
      } catch (err: any) {
        setError("Không thể tải đánh giá. Vui lòng thử lại!");
        setLoading(false);
      }
    };
    fetchData();
  }, [storyId]);

  const handleAddRating = async () => {
    if (!loggedInUser) {
      setError("Bạn phải đăng nhập để thêm đánh giá.");
      return;
    }

    if (newRating.star === 0) {
      setError("Bạn phải chọn số sao để đánh giá.");
      return;
    }

    try {
      setLoading(true);
      const result = await addRating({
        ...newRating,
        story_id: storyId,
        user_id: loggedInUser.id,
      });
      setRatings((prev) => [...prev, result.rating]);
      setNewRating({ star: 0, comment: "" });
      setSuccessMessage("Đánh giá của bạn đã được thêm thành công!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Đánh giá truyện</h2>

      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {loading && <p>Đang tải...</p>}

      <ul className="space-y-4">
        {ratings.length > 0 &&
          ratings.map((rating, index) => (
            <li key={index} className="border p-4 rounded-md shadow">
              <p className="font-semibold">
                ⭐ {rating?.star ?? "Chưa đánh giá"}
              </p>
              <p>{rating?.comment ?? "Không có nhận xét"}</p>
            </li>
          ))}
      </ul>

      <div className="mt-4">
        <h3 className="text-lg font-bold">Thêm đánh giá mới</h3>
        <div className="mt-2">
          <StarRating
            star={newRating.star}
            setStar={(value) => setNewRating({ ...newRating, star: value })}
          />
          <textarea
            value={newRating.comment}
            onChange={(e) =>
              setNewRating({ ...newRating, comment: e.target.value })
            }
            placeholder="Nhận xét"
            className="border p-2 rounded w-full mt-2"
          />
          <button
            onClick={handleAddRating}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            disabled={loading || newRating.star === 0}
          >
            Thêm đánh giá
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingComponent;
