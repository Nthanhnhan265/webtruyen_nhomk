// StoryModal.js

import React, { useState } from 'react';

const StoryModal = ({ show, onClose, onSuccess }) => {
    if (!show) return null;

    // Define state variables for each story attribute
    const [status, setStatus] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [description, setDescription] = useState('');
    const [storyName, setStoryName] = useState('');
    const [totalChapters, setTotalChapters] = useState(0);
    const [views, setViews] = useState(0);
    const [cover, setCover] = useState(null); // Modified for file upload
    const [coverPreview, setCoverPreview] = useState(null); // For previewing the uploaded image
    const [keywords, setKeywords] = useState('');
    const [slug, setSlug] = useState('');

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCover(file);

            // Generate a preview URL for the uploaded image
            const previewUrl = URL.createObjectURL(file);
            setCoverPreview(previewUrl);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const newStory = {
            status,
            author_id: authorId,
            description,
            story_name: storyName,
            total_chapters: totalChapters,
            views,
            cover, // This will contain the uploaded file
            keywords,
            slug,
        };
        onSuccess(newStory);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Thêm Truyện Mới</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        X
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium">Tên Truyện:</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                value={storyName}
                                onChange={(e) => setStoryName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Tác Giả ID:</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                value={authorId}
                                onChange={(e) => setAuthorId(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Ảnh Bìa:</label>
                            <input
                                type="file"
                                className="w-full border p-2 rounded"
                                onChange={handleFileChange}
                            />
                            {coverPreview && (
                                <img src={coverPreview} alt="Cover Preview" className="mt-2 h-32 w-auto rounded" />
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium">Trạng Thái:</label>
                            <select
                                className="w-full border p-2 rounded"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                required
                            >
                                <option value="">Chọn trạng thái</option>
                                <option value="ongoing">Đang tiến hành</option>
                                <option value="completed">Hoàn thành</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Từ Khóa:</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                            />
                        </div>

                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Mô Tả:</label>
                        <textarea
                            className="w-full border p-2 rounded"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium">Tổng Số Chương:</label>
                            <input
                                type="number"
                                className="w-full border p-2 rounded"
                                value={totalChapters}
                                onChange={(e) => setTotalChapters(e.target.value)}
                            />
                        </div>
                        {/* <div>
                            <label className="block text-sm font-medium">Lượt Xem:</label>
                            <input
                                type="number"
                                className="w-full border p-2 rounded"
                                value={views}
                                onChange={(e) => setViews(e.target.value)}
                            />
                        </div> */}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">

                        <div>
                            <label className="block text-sm font-medium">Slug:</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button
                            type="button"
                            className="mr-2 px-4 py-2 bg-red-500 text-white rounded"
                            onClick={onClose}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StoryModal;
