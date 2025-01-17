import React, { useState, useEffect } from 'react';
import { FileInput, Label } from "flowbite-react";
import { getAuthorsName } from '@/app/api/authorService';
import { toast } from 'react-toastify';
import { createStory } from '@/app/api/story.api'
import { getAllgenreByName } from '@/app/api/genre.api'
import Image from 'next/image';
interface StoryModalProps {
    show: boolean;
    onClose: () => void;
    onSuccess: (data: any) => void;
}
interface Author {
    author_name: string;
    id: number;
}
interface Genre {
    genre_name: string;
    id: number;
}
const StoryModal: React.FC<StoryModalProps> = ({ show, onClose, onSuccess }) => {
    const [authors, setAuthors] = useState<Author[]>([])
    const [genres, setGenres] = useState<Genre[]>([])

    // Define state variables for each story attribute
    const [status, setStatus] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [description, setDescription] = useState('');
    const [storyName, setStoryName] = useState('');
    const [totalChapters, setTotalChapters] = useState(0);
    const [keywords, setKeywords] = useState('');
    const [slug, setSlug] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [showMore, setShowMore] = useState(false); // State for showing more genres
    const [coverFile, setCoverFile] = useState<any>()
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
            setGenres(responseGenre.data)
            console.log(response.data.authors);

        } catch (err) {
            toast.error('Đã xảy ra lỗi khi lấy dữ liệu.')
        }
    }

    useEffect(() => {
        fetchAuthors()
    }, [])
    // Handle file input change
    //===================== Handle functions =======================//
    /** VALIDATE FILE UPLOADED
     * kiểm tra file ảnh được tải lên có hợp lệ không
     *  @param {File} file - Đối tượng kiểu File
     *  @returns {Boolean}
     * */
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

    /** HANDLE UPLOAD FILE AND VALIDATION
     * Thực thi thay đổi file và xác minh định dạng, size, kiểu file
     * @param event
     * @returns
     */
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files
        if (fileList && fileList.length > 0) {
            const file = fileList[0]
            if (!validateFile(file)) {
                return
            }
            console.log()
            setCoverFile(file)
        }
    }
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

    // Handle form submission
    const handleSubmit = async (e: any) => {
        const newErrors: any = {};

        if (!storyName.trim() || storyName.length < 1 || storyName.length > 255) {
            newErrors.storyName = "Tên truyện không được để trống và phải từ 1-255 ký tự.";
        } else if (/[!@#$%^&*(),.?":{}|<>]/.test(storyName)) {
            newErrors.storyName = "Tên truyện chỉ bao gồm chữ, số và không chứa ký tự đặc biệt.";
        }

        if (!keywords.trim()) {
            newErrors.keywords = "Từ khóa không được để trống.";
        }
        if (!slug.trim()) {
            newErrors.slug = "Từ khóa không được để trống.";
        }
        if (!coverFile) {
            newErrors.coverFile = "Vui lòng tải lên một ảnh bìa.";
        } else if (coverFile.size > 5 * 1024 * 1024) {
            newErrors.coverFile = "Kích thước ảnh bìa không được vượt quá 5MB.";
        } else if (!["image/jpeg", "image/png", "image/webp"].includes(coverFile.type)) {
            newErrors.coverFile = "Ảnh bìa phải có định dạng .jpg, .png hoặc .webp.";
        }
        if (!description.trim() || description.length < 20) {
            newErrors.description = "Mô tả truyện phải có ít nhất 20 ký tự.";
        }

        if (!authorId) {
            newErrors.authorId = "Vui lòng chọn một tác giả từ danh sách.";
        }

        if (!status) {
            newErrors.status = "Vui lòng chọn trạng thái cho truyện.";
        }
        setErrors(newErrors);

        e.preventDefault()
        // if (!storyName.trim() || !description.trim() || !slug.trim() || !authorId) {
        //     toast.error("Các trường tên truyện, mô tả, slug và tác giả không được để trống.");
        //     return;
        // }

        // 2. Kiểm tra ký tự đặc biệt
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/; // Thay đổi biểu thức chính quy nếu cần
        // if (specialCharRegex.test(storyName) || specialCharRegex.test(description) || specialCharRegex.test(slug)) {
        //     toast.error("Tên truyện, mô tả và slug không được chứa ký tự đặc biệt.");
        //     return;
        // }
        if (!validateFile(coverFile)) {
            return
        }
        //status, author_id, description, story_name, total_chapters, views, keywords, slug 
        const formData = new FormData();
        formData.append('story_name', storyName)
        formData.append('status', status)
        formData.append('description', description)
        formData.append('author_id', authorId)
        formData.append('total_chapters', `${totalChapters}`)
        formData.append('keywords', keywords)
        formData.append('slug', slug)
        formData.append('cover', coverFile)
        const formDataObject = Object.fromEntries(formData.entries())
        console.log(formDataObject) // In ra toàn bộ dữ liệu dưới dạng object
        await createStory(formData, selectedCategories)
        onSuccess(formData)
        toast.success("thêm truyện thành công")
        onClose();
        if (!formData) {
            toast.success("thêm truyện thất bại")

        }
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
                <hr className='mb-5' />
                <form onSubmit={(e) => handleSubmit(e)}>
                    {/* {line 1} */}
                    {/* xs sm md lg */}
                    <div className=" lg:flex lg:grid-cols-2 gap-5 mb-4 justify-normal">
                        <div className='w-full lg:w-80 me-5'>

                            {/* {tên truyện} */}
                            <div>
                                <label className="block text-sm font-medium">Tên Truyện:</label>
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded"
                                    value={storyName}
                                    onChange={(e) => {
                                        setStoryName(e.target.value);
                                        setSlug(generateSlug(e.target.value)); // Automatically generate slug
                                    }
                                    }

                                />
                                {errors.storyName && <p className="text-red-500 text-sm">{errors.storyName}</p>}

                            </div>
                            {/* {từ khóa} */}

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
                            <div className='me-10  md:basis-1/2'>

                                {/* {tác giả id} */}

                                <div>
                                    <select
                                        className="w-full border p-2 rounded"
                                        value={authorId}
                                        onChange={(e) => setAuthorId(e.target.value)}
                                    >
                                        <option value="">Chọn tác giả</option>
                                        {(Array.isArray(authors) ? authors : []).map((author) => (
                                            <option key={author.id} value={author.id}>
                                                {author.author_name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.authorId && <p className="text-red-500 text-sm">{errors.authorId}</p>}

                                </div>
                                {/* {trạng thái} */}

                                <div>
                                    <label className="block text-sm font-medium">Trạng Thái:</label>
                                    <select
                                        className="w-full border p-2 rounded"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}

                                    >
                                        <option value="">Chọn trạng thái</option>
                                        <option value="1">Đang cập nhật</option>
                                        <option value="0">Hoàn thành</option>
                                    </select>
                                    {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}

                                </div>
                            </div>
                            <div>
                                {/* {ảnh bìa} */}
                                <div>

                                    <div className="flex w-full items-center justify-center relative">
                                        {coverFile &&
                                            <Image
                                                src={URL.createObjectURL(coverFile)}
                                                alt="avatar"
                                                width={400}
                                                height={400}
                                                className="absolute w-full h-full rounded-lg  z-[1]"
                                            />

                                        }
                                        <Label
                                            htmlFor="cover"
                                            className="flex z-10 h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600  dark:hover:border-gray-500 "
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
                                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                    />
                                                </svg>
                                                <p className="mb-2 text-center text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-center text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                            </div>
                                            <FileInput
                                                id="cover"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </Label>

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* {errors.coverFile && <p className="text-red-500 text-sm">{errors.coverFile}</p>} */}



                    </div>
                    {/* {mô tả line 2} */}

                    <div className="mb-4">
                        <label className="block text-sm font-medium">Mô Tả:</label>
                        <textarea
                            className="w-full border p-2 rounded"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

                    </div>

                    {/* {line 3} */}
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
                                                onChange={(e) => handleCategoryChange(e)}
                                                className="mr-2"
                                            />
                                            <label htmlFor={`${genre.id}`} className="text-sm">{genre.genre_name}</label>
                                        </div>
                                    ))}

                                </div>
                            </div>
                            {/* Toggle button for more genres */}
                            {genres.length > 2 && (
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

                    <div className="grid grid-cols-2 gap-4 mb-4">
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
