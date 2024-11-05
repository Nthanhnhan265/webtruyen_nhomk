import React, { useState, useEffect } from 'react';
import { createAuthor } from '@/app/_api/authorService'
interface FormErrors {
    authorName?: string;
    description?: string;
    slug?: string;
}
interface Erorr {
    authorName?: string;
    description?: string;
    slug?: string;
}
interface AuthorModalProps {
    show: boolean;         // Indicates whether the modal is visible
    onClose: () => void;  // Function to call when closing the modal
    onSuccess: (data: { authorName: string; description: string; slug: string }) => void; // Function to call on successful author creation
}
const AuthorModal: React.FC<AuthorModalProps> = ({ show, onClose, onSuccess }) => {
    const [authorName, setAuthorName] = useState('');
    const [description, setDescription] = useState('');
    const [slug, setSlug] = useState('');
    const [errors, setErrors] = useState<Erorr>({}); // Lưu trữ lỗi cho từng trường
    let formErrors: FormErrors = {};
    useEffect(() => {
        if (show) {
            // Reset form fields and errors when the modal is opened
            setAuthorName('');
            setDescription('');
            setSlug('');
            setErrors({});
        }
    }, [show]);
    // Kiểm tra dữ liệu nhập
    const validateForm = () => {

        let isValid = true;
        // Kiểm tra tên tác giả (1 - 255 ký tự và không chứa ký tự đặc biệt)
        if (!authorName) {
            formErrors.authorName = 'Bạn không được để trống tên tác giả.';
            isValid = false;
        } else if (authorName.length < 1 || authorName.length > 255 || /[^a-zA-Z0-9\sàáạảãâầấậẩẫèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữđ]/.test(authorName)) {
            formErrors.authorName = 'Vui lòng nhập tên tác giả hợp lệ (1 - 255 ký tự và không chứa ký tự đặc biệt).';
            isValid = false;
        }

        // Kiểm tra URL (1 - 255 ký tự)
        if (!slug) {
            formErrors.slug = 'Bạn không được để trống URL.';
            isValid = false;
        } else if (slug.length < 1 || slug.length > 255) {
            formErrors.slug = 'Vui lòng nhập URL hợp lệ (1 - 255 ký tự).';
            isValid = false;
        }

        // Kiểm tra mô tả (tùy chọn, nhưng nếu có phải dưới 500 ký tự)
        if (description.length < 1 || description.length > 500 || /[^a-zA-Z0-9\sàáạảãâầấậẩẫèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữđ]/.test(description)) {
            formErrors.description = 'Vui lòng nhập mô tả hợp lệ (1 - 255 ký tự).';
            isValid = false;
        }

        setErrors(formErrors); // Lưu lỗi vào state
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // alert(formErrors)
        // Nếu validate thất bại thì không cho phép lưu
        if (!validateForm()) return;

        try {
            const newAuthor = { author_name: authorName, description, slug };
            await createAuthor(newAuthor);
            alert('Tác giả đã được thêm thành công!');
            onSuccess({ authorName, description, slug }); // Làm mới danh sách tác giả
            onClose();   // Đóng modal
        } catch (error) {
            alert('Đã xảy ra lỗi khi thêm tác giả.');
        }
    };

    const handleCancel = () => {
        // Hiển thị thông báo xác nhận khi người dùng nhấn "Hủy"
        if (window.confirm('Bạn có chắc muốn hủy không?')) {
            onClose();
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-1/2">
                <h2 className="text-xl font-bold mb-4">Thêm Tác Giả</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Tên tác giả</label>
                        <input
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            className={`w-full p-2 border ${errors.authorName ? 'border-red-500' : 'border-gray-300'} rounded`}
                            placeholder="Nhập tên tác giả"

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

                        />
                        {errors.slug && <p className="text-red-500">{errors.slug}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Mô tả</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={`w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded`}
                            rows={5}
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

export default AuthorModal;
