'use client'

import React, { useState, useEffect } from 'react';
import { FileInput, Label } from "flowbite-react";
import { getAuthorsName } from '@/app/api/authorService';
import { getAllgenreByName } from '@/app/api/genre.api';
import { toast } from 'react-toastify';
import { updateStory } from '@/app/api/story.api';
import Image from 'next/image';
interface StoryModalProps {
    show: boolean;
    onClose: () => void;
    onSuccess: (data: any) => void;
    initialData?: {
        id: number,
        story_name: string;
        status: string;
        description: string;
        author_id: string;
        total_chapters: number;
        views: number;
        keywords: string;
        slug: string;
        cover: File | null;
    } | null;
}
interface Genre {
    genre_name: string;
    id: number;
}
interface Author {
    author_name: string;
    id: number;
}
const UpdateStoryModal: React.FC<StoryModalProps> = ({ show, onClose, onSuccess, initialData }) => {
    if (!show) return null;

    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]); // Assuming categories will be fetched or defined

    const [status, setStatus] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [description, setDescription] = useState('');
    const [storyName, setStoryName] = useState('');
    const [totalChapters, setTotalChapters] = useState(0);
    const [views, setViews] = useState(0);
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    const [keywords, setKeywords] = useState('');
    const [slug, setSlug] = useState('');
    const [genres, setGenres] = useState<Genre[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [showMore, setShowMore] = useState(false);
    const [errors, setErrors] = useState({
        storyName: "",
        keywords: "",
        description: "",
        authorId: "",
        status: "",
        coverFile: "",
        selectedCategories: "",
        slug: "",
    });
    const fetchAuthors = async () => {
        try {
            const response = await getAuthorsName();
            const responseGenre = await getAllgenreByName();
            setAuthors(response.data.authors)
            setCategories(responseGenre.data)
            setGenres(responseGenre.data); // Assuming categories are included in initialData
            // alert(JSON.stringify(initialData))
            console.log(response.data.authors);
            if (initialData) {
                setStoryName(initialData.story_name);
                setStatus(initialData.status);
                setDescription(initialData.description);
                setAuthorId(initialData.author_id);
                setTotalChapters(initialData.total_chapters);
                setViews(initialData.views);
                setKeywords(initialData.keywords);
                setSlug(initialData.slug);
                setCoverFile(initialData.cover);
                if (initialData.cover instanceof File) {
                    setCoverFile(initialData.cover);
                    setCoverPreview(URL.createObjectURL(initialData.cover)); // Use createObjectURL for File
                } else {
                    // Assume it's a URL string
                    setCoverPreview(initialData.cover || null);
                    setCoverFile(null); // Clear cover file if it's not a File
                }
            } else {
                // Clear state if no initialData
                setCoverFile(null);
                setCoverPreview(null);
            }
        } catch (err) {
            toast.error('Đã xảy ra lỗi khi lấy dữ liệu.')
        }
    }
    useEffect(() => {

        fetchAuthors();

    }, [initialData]);
    const validateFile = (file: File) => {


        console.log(file)
        const maxSize = 5 * 1024 * 1024
        const validFormats = ['image/jpeg', 'image/png', 'image/webp']
        if (!file) {
            toast.error("MESSAGE.user.uploadError")
            return false
        }
        if (!validFormats.includes(file.type)) {
            toast.error("MESSAGE.user.formatError")
            return false
        }
        if (file.size > maxSize) {
            toast.error("MESSAGE.user.sizeError")
            return false
        }
        return true
    }
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList && fileList.length > 0) {
            const file = fileList[0];
            setCoverFile(file);
            setCoverPreview(URL.createObjectURL(file)); // Set preview for the new cover
        }
    };

    const handleCategoryChange = (event: any) => {
        const value = String(event.target.value); // Chuyển đổi giá trị thành chuỗi
        setSelectedCategories((prevSelected) => {
            if (prevSelected.includes(value)) {
                return prevSelected.filter((id) => id !== value); // Bỏ chọn
            }
            return [...prevSelected, value]; // Chọn
        });
    };

    const generateSlug = (name: string) => {
        return name
            .normalize('NFD')
            .toLowerCase() // Convert to lowercase
            .trim() // Remove leading and trailing spaces
            .replace(/[^\w\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-'); // Avoid multiple consecutive hyphens
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: any = {};

        // 1. Validate Story Name
        if (!storyName.trim() || storyName.length < 1 || storyName.length > 255) {
            newErrors.storyName = "Tên truyện không được để trống và phải từ 1-255 ký tự.";
        } else if (/[!@#$%^&*(),.?":{}|<>]/.test(storyName)) {
            newErrors.storyName = "Tên truyện chỉ bao gồm chữ, số và không chứa ký tự đặc biệt.";
        }

        // 2. Validate Slug (letters, numbers, hyphen only)
        const slugRegex = /^[a-zA-Z0-9-]+$/;
        if (!slug.trim()) {
            newErrors.slug = "Slug không được để trống.";
        } else if (!slugRegex.test(slug)) {
            newErrors.slug = "Slug chỉ được chứa chữ cái, số và dấu gạch ngang (-).";
        }

        // 3. Validate Keywords
        if (!keywords.trim()) {
            newErrors.keywords = "Từ khóa không được để trống.";
        }

        // 4. Validate Cover File
        if (!coverFile) {
            newErrors.coverFile = "Vui lòng tải lên một ảnh bìa.";
        } else if (coverFile.size > 5 * 1024 * 1024) {
            newErrors.coverFile = "Kích thước ảnh bìa không được vượt quá 5MB.";
        } else if (!["image/jpeg", "image/png", "image/webp"].includes(coverFile.type)) {
            newErrors.coverFile = "Ảnh bìa phải có định dạng .jpg, .png hoặc .webp.";
        }

        // 5. Validate Description (Allow Vietnamese characters + common punctuation)
        const allowedDescriptionRegex = /^[a-zA-Z0-9À-ỹà-ỹ\s.,!?()'"_-]+$/;
        if (!description.trim() || description.length < 20) {
            newErrors.description = "Mô tả truyện phải có ít nhất 20 ký tự.";
        } else if (!allowedDescriptionRegex.test(description)) {
            newErrors.description = "Mô tả không được chứa ký tự đặc biệt ngoài các dấu chấm, phẩy, chấm hỏi, dấu chấm than, ngoặc và gạch ngang.";
        }

        // 6. Validate Author
        if (!authorId) {
            newErrors.authorId = "Vui lòng chọn một tác giả từ danh sách.";
        }

        // 7. Validate Status
        if (!status) {
            newErrors.status = "Vui lòng chọn trạng thái cho truyện.";
        }

        setErrors(newErrors);

        // Nếu có lỗi thì không thực hiện tiếp
        if (Object.keys(newErrors).length > 0) {
            return false;
        }
        // if (!validateFile(coverFile)) {
        //     return
        // }
        // Chuẩn bị dữ liệu để gửi
        const formData = new FormData();
        if (coverFile) {
            formData.append("cover", coverFile);
        } else if (initialData?.cover && typeof initialData.cover === 'string') {
            // Nếu không chọn hình mới, dùng hình cũ (URL của ảnh bìa cũ)
            formData.append("cover", initialData.cover);
        }
        formData.append("story_name", storyName);
        formData.append("status", status);
        formData.append("description", description);
        formData.append("author_id", authorId);
        formData.append("total_chapters", totalChapters.toString());
        formData.append("views", views.toString());
        formData.append("keywords", keywords);
        formData.append("slug", slug);
        // if (coverFile) {
        //     formData.append("cover", coverFile);
        // }

        try {
            if (!initialData) {
                throw new Error("Không tìm thấy dữ liệu truyện để cập nhật.");
            }
            await updateStory(formData, initialData.id);
            toast.success("Cập nhật thành công!");
            onSuccess(formData);
            onClose();
        } catch (err) {
            toast.error("Cập nhật thất bại.");
        }

        return true;
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Cập nhật Truyện</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        X
                    </button>
                </div>
                <hr className='mb-5' />
                <form onSubmit={handleSubmit}>
                    <div className="lg:flex lg:grid-cols-2 gap-5 mb-4 justify-normal">
                        <div className='w-full lg:w-80 me-5'>
                            <div>
                                <label className="block text-sm font-medium">Tên Truyện:</label>
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded"
                                    value={storyName}
                                    onChange={(e) => {
                                        setStoryName(e.target.value);
                                        setSlug(generateSlug(e.target.value)); // Automatically generate slug
                                    }}
                                />
                                {errors.storyName && <p className="text-red-500 text-sm">{errors.keywords}</p>}

                            </div>
                            <div>
                                <label className="block text-sm font-medium">Từ Khóa:</label>
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded"
                                    value={keywords}
                                    onChange={(e) => setKeywords(e.target.value)}
                                />
                                {errors.keywords && <p className="text-red-500 text-sm">{errors.keywords}</p>}

                            </div>
                        </div>
                        <div className='md:flex w-full'>
                            <div className='me-10 md:basis-1/2'>
                                <div>
                                    <select
                                        className="w-full border p-2 rounded"
                                        value={authorId}
                                        onChange={(e) => setAuthorId(e.target.value)}
                                    >
                                        <option value="">Chọn tác giả</option>
                                        {(Array.isArray(authors) ? authors : []).map((author: Author) => (
                                            <option key={author.id} value={author.id}>
                                                {author.author_name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.authorId && <p className="text-red-500 text-sm">{errors.authorId}</p>}

                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Trạng Thái:</label>
                                    <select
                                        className="w-full border p-2 rounded"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="">Chọn trạng thái</option>
                                        <option value="ongoing">Đang cập nhật</option>
                                        <option value="completed">Hoàn thành</option>
                                    </select>
                                    {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}

                                </div>
                            </div>
                            <div>
                                <div className="flex w-full items-center justify-center relative">
                                    {initialData && typeof initialData.cover === 'string' && !coverFile ? (
                                        <Image
                                            src={`http://localhost:3000/${initialData.cover}`}
                                            // Thêm dấu gạch chéo dẫn trước cho đường dẫn tương đối
                                            alt="Existing Cover"
                                            width={400}
                                            height={400}
                                            className="absolute w-full h-full rounded-lg z-[1]"
                                        />
                                    ) :
                                        (coverFile &&
                                            <Image
                                                src={URL.createObjectURL(coverFile)}
                                                alt="avatar"
                                                width={400}
                                                height={400}
                                                className="absolute w-full h-full rounded-lg  z-[1]"
                                            />
                                        )

                                    }

                                    <Label
                                        htmlFor="cover"
                                        className="flex z-10 h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 dark:hover:border-gray-500"
                                    >
                                        <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                            <svg
                                                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 16"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 10.5 1 5.5 5.5 0 0 0 5 6.5c0 1.114.354 2.143.944 3h-.44A3 3 0 0 0 2 13h11zm-3-1v-1h3v1m-3-4h3m-3-4h3m-3-4h3"
                                                />
                                            </svg>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Chọn hình bìa
                                            </p>
                                        </div>
                                        <FileInput
                                            id="cover"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            className="absolute inset-0 cursor-pointer opacity-0"
                                        />
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Mô Tả:</label>
                        <textarea
                            className="w-full border p-2 rounded"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

                    </div>
                    <div className='flex grid-cols-2'>
                        {/* {the loai} */}

                        <div className='w-full px-2'>
                            <label className="block text-sm font-medium">Thể loại</label>
                            <div className="max-h-32 overflow-y-auto border border-gray-300 rounded p-2">
                                <div className="flex flex-col">
                                    {genres.slice(0, showMore ? genres.length : 1).map((genre: Genre) => (
                                        <div key={genre.id} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={`${genre.id}`}
                                                value={genre.id}
                                                checked={selectedCategories.includes(String(genre.id))} // Chuyển đổi thành chuỗi để so sánh
                                                onChange={handleCategoryChange}
                                                className="mr-2"
                                            />
                                            <label htmlFor={`${genre.id}`} className="text-sm">{genre.genre_name}</label>
                                        </div>
                                    ))}

                                </div>
                            </div>
                            {/* Toggle button for more categories */}
                            {categories.length > 2 && (
                                <button
                                    type="button"
                                    onClick={() => setShowMore(!showMore)}
                                    className="mt-2 text-blue-500"
                                >
                                    {showMore ? 'Ẩn bớt' : 'Xem thêm'}
                                </button>
                            )}
                        </div>
                        {/* {slug} */}

                        <div className='w-full px-2'>
                            <label className="block text-sm font-medium">Slug:</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}

                            />
                            {errors.slug && <p className="text-red-500 text-sm">{errors.slug}</p>}

                        </div>

                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
                            Cập nhật
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateStoryModal;