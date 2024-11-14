// 'use client'

// <<<<<<< HEAD
// import { getAuthorsName } from '@/app/api/authorService'
// import { getAllgenreByName } from '@/app/api/genre.api'
// import { updateStory } from '@/app/api/story.api'
// import { FileInput, Label } from 'flowbite-react'
// import Image from 'next/image'
// import React, { useEffect, useState } from 'react'
// import { toast } from 'react-toastify'

// interface StoryModalProps {
//   show: boolean
//   onClose: () => void
//   onSuccess: () => void
//   initialData?: {
//     story_name: string
//     status: string
//     description: string
//     author_id: string
//     total_chapters: number
//     views: number
//     keywords: string
//     slug: string
//     cover: File | null
//   } | null
// }

// const UpdateStoryModal: React.FC<StoryModalProps> = ({
//   show,
//   onClose,
//   onSuccess,
//   initialData,
// }) => {
//   if (!show) return null

//   const [authors, setAuthors] = useState([])
//   const [categories, setCategories] = useState([]) // Assuming categories will be fetched or defined
//   const [error, setError] = useState('')

//   const [tags, setTags] = useState([])
//   const [status, setStatus] = useState('')
//   const [authorId, setAuthorId] = useState('')
//   const [description, setDescription] = useState('')
//   const [storyName, setStoryName] = useState('')
//   const [totalChapters, setTotalChapters] = useState(0)
//   const [views, setViews] = useState(0)
//   const [coverFile, setCoverFile] = useState<File | null>(null)
//   const [coverPreview, setCoverPreview] = useState<string | null>(null)
//   const [keywords, setKeywords] = useState('')
//   const [slug, setSlug] = useState('')
//   const [selectedCategories, setSelectedCategories] = useState([])
//   const [showMore, setShowMore] = useState(false)

//   const fetchAuthors = async () => {
//     try {
//       const response = await getAuthorsName()
//       const responseGenre = await getAllgenreByName()
//       setAuthors(response.data.authors)
//       setCategories(responseGenre.data)
//       // alert(JSON.stringify(initialData))
//       console.log(response.data.authors)
//       if (initialData) {
//         setStoryName(initialData.story_name)
//         setStatus(initialData.status)
//         setDescription(initialData.description)
//         setAuthorId(initialData.author_id)
//         setTotalChapters(initialData.total_chapters)
//         setViews(initialData.views)
//         setKeywords(initialData.keywords)
//         setSlug(initialData.slug)
//         setCoverFile(initialData.cover)
//         if (initialData.cover instanceof File) {
//           setCoverFile(initialData.cover)
//           setCoverPreview(URL.createObjectURL(initialData.cover)) // Use createObjectURL for File
//         } else {
//           // Assume it's a URL string
//           setCoverPreview(initialData.cover || null)
//           setCoverFile(null) // Clear cover file if it's not a File
// =======
// import React, { useState, useEffect } from 'react';
// import { FileInput, Label } from "flowbite-react";
// import { getAuthorsName } from '@/app/api/authorService';
// import { getAllgenreByName } from '@/app/api/genre.api';
// import { toast } from 'react-toastify';
// import { updateStory } from '@/app/api/story.api';
// import Image from 'next/image';
// interface StoryModalProps {
//     show: boolean;
//     onClose: () => void;
//     onSuccess: (data: any) => void;
//     initialData?: {
//         id: number,
//         story_name: string;
//         status: string;
//         description: string;
//         author_id: string;
//         total_chapters: number;
//         views: number;
//         keywords: string;
//         slug: string;
//         cover: File | null;
//     } | null;
// }
// interface Genre {
//     genre_name: string;
//     id: number;
// }
// interface Author {
//     author_name: string;
//     id: number;
// }
// const UpdateStoryModal: React.FC<StoryModalProps> = ({ show, onClose, onSuccess, initialData }) => {
//     if (!show) return null;

//     const [authors, setAuthors] = useState([]);
//     const [categories, setCategories] = useState([]); // Assuming categories will be fetched or defined

//     const [status, setStatus] = useState('');
//     const [authorId, setAuthorId] = useState('');
//     const [description, setDescription] = useState('');
//     const [storyName, setStoryName] = useState('');
//     const [totalChapters, setTotalChapters] = useState(0);
//     const [views, setViews] = useState(0);
//     const [coverFile, setCoverFile] = useState<File | null>(null);
//     const [coverPreview, setCoverPreview] = useState<string | null>(null);
//     const [keywords, setKeywords] = useState('');
//     const [slug, setSlug] = useState('');
//     const [genres, setGenres] = useState<Genre[]>([]);
//     const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

//     const [showMore, setShowMore] = useState(false);

//     const fetchAuthors = async () => {
//         try {
//             const response = await getAuthorsName();
//             const responseGenre = await getAllgenreByName();
//             setAuthors(response.data.authors)
//             setCategories(responseGenre.data)
//             setGenres(responseGenre.data); // Assuming categories are included in initialData
//             // alert(JSON.stringify(initialData))
//             console.log(response.data.authors);
//             if (initialData) {
//                 setStoryName(initialData.story_name);
//                 setStatus(initialData.status);
//                 setDescription(initialData.description);
//                 setAuthorId(initialData.author_id);
//                 setTotalChapters(initialData.total_chapters);
//                 setViews(initialData.views);
//                 setKeywords(initialData.keywords);
//                 setSlug(initialData.slug);
//                 setCoverFile(initialData.cover);
//                 if (initialData.cover instanceof File) {
//                     setCoverFile(initialData.cover);
//                     setCoverPreview(URL.createObjectURL(initialData.cover)); // Use createObjectURL for File
//                 } else {
//                     // Assume it's a URL string
//                     setCoverPreview(initialData.cover || null);
//                     setCoverFile(null); // Clear cover file if it's not a File
//                 }
//             } else {
//                 // Clear state if no initialData
//                 setCoverFile(null);
//                 setCoverPreview(null);
//             }
//         } catch (err) {
//             toast.error('Đã xảy ra lỗi khi lấy dữ liệu.')
// >>>>>>> 680f4720180b9326c3e490ec7373a18c5b9c3724
//         }
//         setSelectedCategories(initialData.categories || []) // Assuming categories are included in initialData
//       } else {
//         // Clear state if no initialData
//         setCoverFile(null)
//         setCoverPreview(null)
//       }
//     } catch (err) {
//       setError('Đã xảy ra lỗi khi lấy dữ liệu.')
//     }
//   }
//   useEffect(() => {
//     fetchAuthors()
//     // alert("check initialData", initialData)
//   }, [initialData])

// <<<<<<< HEAD
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const fileList = event.target.files
//     if (fileList && fileList.length > 0) {
//       const file = fileList[0]
//       setCoverFile(file)
//       setCoverPreview(URL.createObjectURL(file)) // Set preview for the new cover
//     }
//   }
// =======
//         fetchAuthors();
// >>>>>>> 680f4720180b9326c3e490ec7373a18c5b9c3724

//   const handleCategoryChange = (event) => {
//     const value = String(event.target.value) // Chuyển đổi giá trị thành chuỗi
//     setSelectedCategories((prevSelected) => {
//       if (prevSelected.includes(value)) {
//         return prevSelected.filter((id) => id !== value) // Bỏ chọn
//       }
//       return [...prevSelected, value] // Chọn
//     })
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!storyName.trim() || !description.trim() || !slug.trim() || !authorId) {
//       toast.error(
//         'Các trường tên truyện, mô tả, slug và tác giả không được để trống.',
//       )
//       return
//     }

// <<<<<<< HEAD
//     // 2. Kiểm tra ký tự đặc biệt
//     const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/ // Thay đổi biểu thức chính quy nếu cần
//     if (
//       specialCharRegex.test(storyName) ||
//       specialCharRegex.test(description) ||
//       specialCharRegex.test(slug)
//     ) {
//       toast.error('Tên truyện, mô tả và slug không được chứa ký tự đặc biệt.')
//       return
//     }
//     const formData = new FormData()
//     formData.append('story_name', storyName)
//     formData.append('status', status)
//     formData.append('description', description)
//     formData.append('author_id', authorId)
//     formData.append('total_chapters', totalChapters.toString())
//     formData.append('views', views.toString())
//     formData.append('keywords', keywords)
//     formData.append('slug', slug)
//     if (coverFile) {
//       formData.append('cover', coverFile)
//     }
// =======
//     const handleCategoryChange = (event: any) => {
//         const value = String(event.target.value); // Chuyển đổi giá trị thành chuỗi
//         setSelectedCategories((prevSelected) => {
//             if (prevSelected.includes(value)) {
//                 return prevSelected.filter((id) => id !== value); // Bỏ chọn
//             }
//             return [...prevSelected, value]; // Chọn
//         });
//     };
// >>>>>>> 680f4720180b9326c3e490ec7373a18c5b9c3724

//     try {
//       await updateStory(formData, initialData.id)
//       toast.success('cập nhật thành công !')
//       onSuccess()
//       onClose()
//     } catch (err) {
//       toast.error('cập nhật thất bại')
//     }
//   }

// <<<<<<< HEAD
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold">Cập nhật Truyện</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600"
//           >
//             X
//           </button>
// =======
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!storyName.trim() || !description.trim() || !slug.trim() || !authorId) {
//             toast.error("Các trường tên truyện, mô tả, slug và tác giả không được để trống.");
//             return;
//         }

//         // 2. Slug Validation: Only allow letters, numbers, and hyphen (-)
//         const slugRegex = /^[a-zA-Z0-9-]+$/;
//         if (!slugRegex.test(slug)) {
//             toast.error("Slug chỉ được chứa chữ cái, số và dấu gạch ngang (-).");
//             return;
//         }

//         // 3. Validate storyName and description: Allow Vietnamese characters, letters, numbers, and spaces, but no special characters
//         const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/; // Special characters to disallow
//         if (specialCharRegex.test(storyName)) {
//             toast.error("Tên truyện không được chứa ký tự đặc biệt.");
//             return;
//         }
//         const allowedSpecialCharRegex = /^[a-zA-Z0-9À-ỹà-ỹ\s.,!?()'"_-]+$/; // Vietnamese characters + spaces + some punctuation
//         if (!allowedSpecialCharRegex.test(description)) {
//             toast.error("Mô tả không được chứa ký tự đặc biệt ngoài các dấu chấm, phẩy, chấm hỏi, dấu chấm than, dấu ngoặc và dấu gạch ngang.");
//             return;
//         }

//         const formData = new FormData();
//         formData.append('story_name', storyName);
//         formData.append('status', status);
//         formData.append('description', description);
//         formData.append('author_id', authorId);
//         formData.append('total_chapters', totalChapters.toString());
//         formData.append('views', views.toString());
//         formData.append('keywords', keywords);
//         formData.append('slug', slug);
//         if (coverFile) {
//             formData.append('cover', coverFile);
//         }

//         try {
//             if (!initialData) {
//                 throw new Error
//             }
//             await updateStory(formData, initialData.id);
//             toast.success('cập nhật thành công !');
//             onSuccess(formData);
//             onClose();
//         } catch (err) {
//             toast.error('cập nhật thất bại');
//         }
//     };

//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
//                 <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-2xl font-semibold">Cập nhật Truyện</h2>
//                     <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//                         X
//                     </button>
//                 </div>
//                 <hr className='mb-5' />
//                 <form onSubmit={handleSubmit}>
//                     <div className="lg:flex lg:grid-cols-2 gap-5 mb-4 justify-normal">
//                         <div className='w-full lg:w-80 me-5'>
//                             <div>
//                                 <label className="block text-sm font-medium">Tên Truyện:</label>
//                                 <input
//                                     type="text"
//                                     className="w-full border p-2 rounded"
//                                     value={storyName}
//                                     onChange={(e) => setStoryName(e.target.value)}
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium">Từ Khóa:</label>
//                                 <input
//                                     type="text"
//                                     className="w-full border p-2 rounded"
//                                     value={keywords}
//                                     onChange={(e) => setKeywords(e.target.value)}
//                                 />
//                             </div>
//                         </div>
//                         <div className='md:flex w-full'>
//                             <div className='me-10 md:basis-1/2'>
//                                 <div>
//                                     <select
//                                         className="w-full border p-2 rounded"
//                                         value={authorId}
//                                         onChange={(e) => setAuthorId(e.target.value)}
//                                     >
//                                         <option value="">Chọn tác giả</option>
//                                         {(Array.isArray(authors) ? authors : []).map((author: Author) => (
//                                             <option key={author.id} value={author.id}>
//                                                 {author.author_name}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium">Trạng Thái:</label>
//                                     <select
//                                         className="w-full border p-2 rounded"
//                                         value={status}
//                                         onChange={(e) => setStatus(e.target.value)}
//                                     >
//                                         <option value="">Chọn trạng thái</option>
//                                         <option value="ongoing">Đang cập nhật</option>
//                                         <option value="completed">Hoàn thành</option>
//                                     </select>
//                                 </div>
//                             </div>
//                             <div>
//                                 <div className="flex w-full items-center justify-center relative">
//                                     {initialData && typeof initialData.cover === 'string' && !coverFile ? (
//                                         <Image
//                                             src={`http://localhost:3000/${initialData.cover}`}
//                                             // Thêm dấu gạch chéo dẫn trước cho đường dẫn tương đối
//                                             alt="Existing Cover"
//                                             width={400}
//                                             height={400}
//                                             className="absolute w-full h-full rounded-lg z-[1]"
//                                         />
//                                     ) :
//                                         (coverFile &&
//                                             <Image
//                                                 src={URL.createObjectURL(coverFile)}
//                                                 alt="avatar"
//                                                 width={400}
//                                                 height={400}
//                                                 className="absolute w-full h-full rounded-lg  z-[1]"
//                                             />
//                                         )

//                                     }

//                                     <Label
//                                         htmlFor="cover"
//                                         className="flex z-10 h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 dark:hover:border-gray-500"
//                                     >
//                                         <div className="flex flex-col items-center justify-center pb-6 pt-5">
//                                             <svg
//                                                 className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
//                                                 aria-hidden="true"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 fill="none"
//                                                 viewBox="0 0 20 16"
//                                             >
//                                                 <path
//                                                     stroke="currentColor"
//                                                     strokeLinecap="round"
//                                                     strokeLinejoin="round"
//                                                     strokeWidth="2"
//                                                     d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 10.5 1 5.5 5.5 0 0 0 5 6.5c0 1.114.354 2.143.944 3h-.44A3 3 0 0 0 2 13h11zm-3-1v-1h3v1m-3-4h3m-3-4h3m-3-4h3"
//                                                 />
//                                             </svg>
//                                             <p className="text-xs text-gray-500 dark:text-gray-400">
//                                                 Chọn hình bìa
//                                             </p>
//                                         </div>
//                                         <FileInput
//                                             id="cover"
//                                             onChange={handleFileChange}
//                                             accept="image/*"
//                                             className="absolute inset-0 cursor-pointer opacity-0"
//                                         />
//                                     </Label>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium">Mô Tả:</label>
//                         <textarea
//                             className="w-full border p-2 rounded"
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                         />
//                     </div>
//                     <div className='flex grid-cols-2'>
//                         {/* {the loai} */}

//                         <div className='w-full px-2'>
//                             <label className="block text-sm font-medium">Thể loại</label>
//                             <div className="max-h-32 overflow-y-auto border border-gray-300 rounded p-2">
//                                 <div className="flex flex-col">
//                                     {genres.slice(0, showMore ? genres.length : 1).map((genre: Genre) => (
//                                         <div key={genre.id} className="flex items-center">
//                                             <input
//                                                 type="checkbox"
//                                                 id={`${genre.id}`}
//                                                 value={genre.id}
//                                                 checked={selectedCategories.includes(String(genre.id))} // Chuyển đổi thành chuỗi để so sánh
//                                                 onChange={handleCategoryChange}
//                                                 className="mr-2"
//                                             />
//                                             <label htmlFor={`${genre.id}`} className="text-sm">{genre.genre_name}</label>
//                                         </div>
//                                     ))}

//                                 </div>
//                             </div>
//                             {/* Toggle button for more categories */}
//                             {categories.length > 2 && (
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowMore(!showMore)}
//                                     className="mt-2 text-blue-500"
//                                 >
//                                     {showMore ? 'Ẩn bớt' : 'Xem thêm'}
//                                 </button>
//                             )}
//                         </div>
//                         {/* {slug} */}

//                         <div className='w-full px-2'>
//                             <label className="block text-sm font-medium">Slug:</label>
//                             <input
//                                 type="text"
//                                 className="w-full border p-2 rounded"
//                                 value={slug}
//                                 onChange={(e) => setSlug(e.target.value)}

//                             />
//                         </div>

//                     </div>

//                     <div className="flex justify-end">
//                         <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
//                             Cập nhật
//                         </button>
//                     </div>
//                 </form>
//             </div>
// >>>>>>> 680f4720180b9326c3e490ec7373a18c5b9c3724
//         </div>
//         <hr className="mb-5" />
//         <form onSubmit={handleSubmit}>
//           <div className="lg:flex lg:grid-cols-2 gap-5 mb-4 justify-normal">
//             <div className="w-full lg:w-80 me-5">
//               <div>
//                 <label className="block text-sm font-medium">Tên Truyện:</label>
//                 <input
//                   type="text"
//                   className="w-full border p-2 rounded"
//                   value={storyName}
//                   onChange={(e) => setStoryName(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium">Từ Khóa:</label>
//                 <input
//                   type="text"
//                   className="w-full border p-2 rounded"
//                   value={keywords}
//                   onChange={(e) => setKeywords(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="md:flex w-full">
//               <div className="me-10 md:basis-1/2">
//                 <div>
//                   <select
//                     className="w-full border p-2 rounded"
//                     value={authorId}
//                     onChange={(e) => setAuthorId(e.target.value)}
//                   >
//                     <option value="">Chọn tác giả</option>
//                     {(Array.isArray(authors) ? authors : []).map((author) => (
//                       <option
//                         key={author.id}
//                         value={author.id}
//                       >
//                         {author.author_name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium">
//                     Trạng Thái:
//                   </label>
//                   <select
//                     className="w-full border p-2 rounded"
//                     value={status}
//                     onChange={(e) => setStatus(e.target.value)}
//                   >
//                     <option value="">Chọn trạng thái</option>
//                     <option value="ongoing">Đang cập nhật</option>
//                     <option value="completed">Hoàn thành</option>
//                   </select>
//                 </div>
//               </div>
//               <div>
//                 <div className="flex w-full items-center justify-center relative">
//                   {initialData &&
//                   typeof initialData.cover === 'string' &&
//                   !coverFile ? (
//                     <Image
//                       src={`http://localhost:3000/${initialData.cover}`}
//                       // Thêm dấu gạch chéo dẫn trước cho đường dẫn tương đối
//                       alt="Existing Cover"
//                       width={400}
//                       height={400}
//                       className="absolute w-full h-full rounded-lg z-[1]"
//                     />
//                   ) : (
//                     coverFile && (
//                       <Image
//                         src={URL.createObjectURL(coverFile)}
//                         alt="avatar"
//                         width={400}
//                         height={400}
//                         className="absolute w-full h-full rounded-lg  z-[1]"
//                       />
//                     )
//                   )}

//                   <Label
//                     htmlFor="cover"
//                     className="flex z-10 h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 dark:hover:border-gray-500"
//                   >
//                     <div className="flex flex-col items-center justify-center pb-6 pt-5">
//                       <svg
//                         className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 20 16"
//                       >
//                         <path
//                           stroke="currentColor"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 10.5 1 5.5 5.5 0 0 0 5 6.5c0 1.114.354 2.143.944 3h-.44A3 3 0 0 0 2 13h11zm-3-1v-1h3v1m-3-4h3m-3-4h3m-3-4h3"
//                         />
//                       </svg>
//                       <p className="text-xs text-gray-500 dark:text-gray-400">
//                         Chọn hình bìa
//                       </p>
//                     </div>
//                     <FileInput
//                       id="cover"
//                       onChange={handleFileChange}
//                       accept="image/*"
//                       className="absolute inset-0 cursor-pointer opacity-0"
//                     />
//                   </Label>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Mô Tả:</label>
//             <textarea
//               className="w-full border p-2 rounded"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </div>
//           <div className="flex grid-cols-2">
//             {/* {the loai} */}

//             <div className="w-full px-2">
//               <label className="block text-sm font-medium">Thể loại</label>
//               <div className="max-h-32 overflow-y-auto border border-gray-300 rounded p-2">
//                 <div className="flex flex-col">
//                   {categories
//                     .slice(0, showMore ? categories.length : 1)
//                     .map((category) => (
//                       <div
//                         key={category.id}
//                         className="flex items-center"
//                       >
//                         <input
//                           type="checkbox"
//                           id={category.id}
//                           value={category.id}
//                           checked={selectedCategories.includes(
//                             String(category.id),
//                           )} // Chuyển đổi thành chuỗi để so sánh
//                           onChange={handleCategoryChange}
//                           className="mr-2"
//                         />
//                         <label
//                           htmlFor={category.id}
//                           className="text-sm"
//                         >
//                           {category.genre_name}
//                         </label>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//               {/* Toggle button for more categories */}
//               {categories.length > 2 && (
//                 <button
//                   type="button"
//                   onClick={() => setShowMore(!showMore)}
//                   className="mt-2 text-blue-500"
//                 >
//                   {showMore ? 'Ẩn bớt' : 'Xem thêm'}
//                 </button>
//               )}
//             </div>
//             {/* {slug} */}

//             <div className="w-full px-2">
//               <label className="block text-sm font-medium">Slug:</label>
//               <input
//                 type="text"
//                 className="w-full border p-2 rounded"
//                 value={slug}
//                 onChange={(e) => setSlug(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="bg-blue-500 text-white rounded px-4 py-2"
//             >
//               Cập nhật
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default UpdateStoryModal
