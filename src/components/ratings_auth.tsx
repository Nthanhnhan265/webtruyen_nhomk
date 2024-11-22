import React, { useState, useEffect, useContext } from "react";
import { addRating, fetchRatingsByStory, editRating, removeRating } from "@/app/api/ratings.api";
import { userContext } from "@/context/user/user.context";

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
          className={`text-2xl ${
            value <= star ? "text-yellow-400" : "text-gray-400"
          } hover:text-yellow-500`}
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
  const [isEditing, setIsEditing] = useState<Rating | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { loggedInUser } = useContext(userContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // const data = await fetchRatingsByStory(storyId);
        // setRatings(data.ratings || []);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [storyId]);

  const handleAddRating = async () => {
    try {
      setLoading(true);
      const result = await addRating({
        ...newRating,
        story_id: storyId,
        user_id: loggedInUser.id, // Lấy user_id từ context
      });
      setRatings((prev) => [...prev, result.rating]);
      setNewRating({ star: 0, comment: "" });
      setSuccessMessage("Đánh giá của bạn đã được thêm thành công!");
      setLoading(false);
      setTimeout(() => setSuccessMessage(null), 3000); // Xóa thông báo sau 3 giây
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Đánh giá truyện</h2>

      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {loading && <p>Đang tải...</p>}

      {/* Display list of ratings */}
      <ul className="space-y-4">
        {ratings.map((rating) => (
          <li key={rating.id} className="border p-4 rounded-md shadow">
            <p className="font-semibold">⭐ {rating.star} sao</p>
            <p>{rating.comment}</p>
            <div className="flex gap-2 mt-2">
              <button
                className="text-blue-500"
                onClick={() => {
                  setIsEditing(rating);
                  setNewRating({ star: rating.star, comment: rating.comment });
                }}
              >
                Sửa
              </button>
              <button
                className="text-red-500"
                onClick={() => handleDeleteRating(rating.id, rating.user_id)}
              >
                Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Form for adding/editing a rating */}
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
            disabled={loading}
          >
            Thêm đánh giá
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingComponent;

