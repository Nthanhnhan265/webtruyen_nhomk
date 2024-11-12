import React, { useState, useEffect } from 'react';
interface FormErrors {
    genre_name?: string;
    description?: string;
    slug?: string;
}

interface CreateModalGenreProps {
    show: boolean;         // Indicates whether the modal is visible
    onClose: () => void;  // Function to call when closing the modal
    onSuccess: (data: { genre_name: string; description: string; slug: string }) => void; // Function to call on successful genre creation
}

const CreateModalGenre: React.FC<CreateModalGenreProps> = ({ show, onClose, onSuccess }) => {
    const [genre_name, setGenreName] = useState('');
    const [description, setDescription] = useState('');
    const [slug, setSlug] = useState('');
    const [errors, setErrors] = useState<FormErrors>({}); // Store errors for each field
    let formErrors: FormErrors = {};

    useEffect(() => {
        if (show) {
            // Reset form fields and errors when the modal is opened
            setGenreName('');
            setDescription('');
            setSlug('');
            setErrors({});
        }
    }, [show]);

    // Validate input data
    const validateForm = () => {
        let isValid = true;

        // Validate genre name (1 - 255 characters, no special characters)
        if (!genre_name) {
            formErrors.genre_name = 'Bạn không được để trống tên thể loại.';
            isValid = false;
        } else if (genre_name.length < 1 || genre_name.length > 255 || /[^a-zA-Z0-9\sàáạảãâầấậẩẫèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữđ]/.test(genre_name)) {
            formErrors.genre_name = 'Vui lòng nhập tên thể loại hợp lệ (1 - 255 ký tự và không chứa ký tự đặc biệt).';
            isValid = false;
        }

        // Validate URL slug (1 - 255 characters)
        if (!slug) {
            formErrors.slug = 'Bạn không được để trống URL.';
            isValid = false;
        } else if (slug.length < 1 || slug.length > 255) {
            formErrors.slug = 'Vui lòng nhập URL hợp lệ (1 - 255 ký tự).';
            isValid = false;
        }

        // Validate description (optional, but if present must be < 500 characters)
        if (description && (description.length > 500 || /[^a-zA-Z0-9\sàáạảãâầấậẩẫèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữđ]/.test(description))) {
            formErrors.description = 'Vui lòng nhập mô tả hợp lệ (không vượt quá 500 ký tự).';
            isValid = false;
        }

        setErrors(formErrors); // Save errors in state
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // If validation fails, prevent submission
        if (!validateForm()) return;

        // Pass genre data to the onSuccess callback
        onSuccess({ genre_name: genre_name, description, slug }); // Refresh the genre list
        onClose(); // Close modal upon successful submission
    };


    const handleCancel = () => {
        // Confirm when user clicks "Hủy"
        onClose();
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-1/2">
                <h2 className="text-xl font-bold mb-4">Thêm Thể Loại</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Tên thể loại</label>
                        <input
                            value={genre_name}
                            onChange={(e) => setGenreName(e.target.value)}
                            className={`w-full p-2 border ${errors.genre_name ? 'border-red-500' : 'border-gray-300'} rounded`}
                            placeholder="Nhập tên thể loại"
                        />
                        {errors.genre_name && <p className="text-red-500">{errors.genre_name}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">URL</label>
                        <input
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className={`w-full p-2 border ${errors.slug ? 'border-red-500' : 'border-gray-300'} rounded`}
                            placeholder="the-loai/..."
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

export default CreateModalGenre;
