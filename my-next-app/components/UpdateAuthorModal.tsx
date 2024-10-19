import React, { useState, useEffect } from 'react';
import { getAuthors, deleteAuthor, updateAuthor } from '../service/authorService';

const UpdateAuthorModal = ({ show, onClose, onSuccess, initialData = null }) => {
    const [authorName, setAuthorName] = useState('');
    const [description, setDescription] = useState('');
    const [slug, setSlug] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setAuthorName(initialData.author_name || '');
            setDescription(initialData.description || '');
            setSlug(initialData.slug || '');
        } else {
            setAuthorName('');
            setDescription('');
            setSlug('');
        }
    }, [initialData]);

    let formErrors = {};
    const validateForm = () => {
        let isValid = true;

        if (!authorName) {
            formErrors.authorName = 'Bạn không được để trống tên tác giả.';
            isValid = false;
        } else if (authorName.length < 1 || authorName.length > 255 || /[^a-zA-Z0-9\s]/.test(authorName)) {
            formErrors.authorName = 'Vui lòng nhập tên tác giả hợp lệ (1 - 255 ký tự và không chứa ký tự đặc biệt).';
            isValid = false;
        }

        if (!slug) {
            formErrors.slug = 'Bạn không được để trống URL.';
            isValid = false;
        } else if (slug.length < 1 || slug.length > 255) {
            formErrors.slug = 'Vui lòng nhập URL hợp lệ (1 - 255 ký tự).';
            isValid = false;
        }

        if (description.length < 1 || description.length > 500) {
            formErrors.description = 'Vui lòng nhập mô tả hợp lệ (1 - 255 ký tự).';
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const newAuthor = { author_name: authorName, description, slug };
            if (initialData) {
                await updateAuthor(initialData.id, newAuthor);
                alert('Tác giả đã được cập nhật thành công!');
            }
            onSuccess();
            onClose();
        } catch (error) {
            alert('Đã xảy ra lỗi.');
        }
    };

    const handleCancel = () => {
        if (window.confirm('Bạn có chắc muốn hủy không?')) {
            onClose();
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-1/2">
                <h2 className="text-xl font-bold mb-4">
                    {initialData ? 'Chỉnh sửa Tác Giả' : 'Thêm Tác Giả'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Tên tác giả</label>
                        <input
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            className={`w-full p-2 border ${errors.authorName ? 'border-red-500' : 'border-gray-300'} rounded`}
                            placeholder="Nhập tên tác giả"
                            required
                        />
                        {errors.authorName && <p className="text-red-500">{errors.authorName}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">URL</label>
                        <input
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className={`w-full p-2 border ${errors.slug ? 'border-red-500' : 'border-gray-300'} rounded`}
                            placeholder="tac-gia/..."
                            required
                        />
                        {errors.slug && <p className="text-red-500">{errors.slug}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Mô tả</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={`w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded`}
                            rows="5"
                            placeholder="Mô tả không vượt quá 500 ký tự"
                        ></textarea>
                        {errors.description && <p className="text-red-500">{errors.description}</p>}
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Hủy</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateAuthorModal;