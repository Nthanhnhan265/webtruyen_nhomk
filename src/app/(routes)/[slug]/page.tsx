'use client' // Chạy trên client
import { useState, useEffect } from 'react'
import { Pagination } from 'flowbite-react'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import styles from '../_component/GenreDropdown.module.css'
import Footer from '../_component/footer'
import { getSearchStorie, incrementStoryViews } from '@/app/api/story.api'
interface Story {
    id: number
    story_name: string
    slug: string
    cover: string
    total_chapters: number
    Author: {
        author_name: string
        id: number
    }
    genres: Array<{ id: number, genre_name: string }>;

}
interface genre {
    genre_name: string
}
const GenrePage = ({ params }: { params: { slug: string } }) => {
    // const { slug } = useParams()
    const [stories, setStories] = useState<Story[]>([]) // Holds the stories for the current page
    const [totalPages, setTotalPages] = useState(0) // Total number of pages
    const [currentPage, setCurrentPage] = useState(1) // Current page
    const [loading, setLoading] = useState(true)

    const fetchStories = async () => {
        setLoading(true) // Start loading
        try {
            const response = await getSearchStorie(params.slug, currentPage)
            setStories(response.data.data) // Set fetched stories
            setTotalPages(response.data.totalPages) // Set total pages for pagination
            setLoading(false) // Stop loading
        } catch (error) {
            console.error('Error fetching stories:', error)
            setLoading(false) // Stop loading in case of error
        }
    }
    const onPageChange = (page: number) => {
        setCurrentPage(page) // Update current page when pagination changes
    }
    const handleDetail = async (slug: string, id: number) => {
        window.location.href = `/stories/${slug}`;
        const view = await incrementStoryViews(id)
        if (!view) {
            toast.error("lỗi khi tăng view")
        }
    }
    // Fetch stories when `slug` or `currentPage` changes
    useEffect(() => {
        fetchStories()
    }, [params.slug, currentPage])

    return (
        <div>
            {/* <NavbarComponent /> */}
            <p className="bg-gray-100 py-2 border-t border-gray-400 border-b pl-14">
                Truyện plus / Tiềm kiếm / Trang {currentPage}
            </p>

            <div className="ml-14 mt-8 mb-4">
                <span className="font-bold">Truyện</span>
            </div>

            <hr className="ml-14" />

            <div className="background-body bg-gray-100 py-5 px-5 ml-14">
                <div className="container">
                    {loading ? (
                        <div>Đang tải...</div>
                    ) : (
                        stories.map((story, index) => (
                            <div className="grid grid-cols-12 gap-4 mb-4" key={index}>
                                <div className="col-span-2">
                                    <Image
                                        onClick={() => handleDetail(story.slug, story.id)}
                                        src={`http://localhost:3000/${story.cover}`} // Giả sử bạn có trường 'cover' cho ảnh
                                        alt={story.story_name}
                                        width={200}
                                        height={150}
                                    />
                                </div>
                                <div className="col-span-10">
                                    <Link
                                        href={`/stories/${story.slug}`} // Giả sử bạn có slug cho câu chuyện
                                        className={styles.hoverNameTitle}
                                    >
                                        {story.story_name}
                                    </Link>
                                    <br />
                                    <span>Tác giả:</span>{' '}
                                    <Link
                                        className={styles.hoverName}
                                        href={`#`} // Giả sử bạn có slug cho tác giả
                                    >
                                        {story?.Author?.author_name}
                                    </Link>
                                    <br />
                                    <span>Thể Loại:</span>{' '}
                                    <Link href={`#`}>
                                        {story?.genres && story.genres.length > 0 ? (
                                            <span>
                                                {story.genres.map((genre: genre, index: number) => (
                                                    <span key={index}>
                                                        {genre.genre_name}
                                                        {index < story.genres.length - 1 && ', '}
                                                    </span>
                                                ))}
                                            </span>
                                        ) : (
                                            <span className="text-gray-500">-</span>
                                        )}                                    </Link>
                                    <br />
                                    <span>Số chương:</span>{' '}
                                    <Link href={`/story/${story.slug}/chapters`}>
                                        {story.total_chapters}
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange} // Update current page when page is changed
                    />
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default GenrePage
