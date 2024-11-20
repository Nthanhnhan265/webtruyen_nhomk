import { chapterByStory, getChapterByStoryidAll } from "@/app/api/chapter.api";
import React, { useState, useEffect } from "react";

interface Chapter {
    id: number;
    chapter_name: string;
    content: string;
    slug: string;
    views: number;
    chapter_order: number;
    published_at: Date;
    Story?: {
        id: number;
        story_name: string;
        slug: string;
    };
}
interface ModalProps {
    isOpen: boolean;
    data: number; // Assuming data is a story ID (number)
    closeModal: () => void;
    selectChapter: (chapterSlug: string) => void; // Function that takes a chapterSlug
}
const Modal: React.FC<ModalProps> = ({ isOpen, data, closeModal, selectChapter }) => {
    if (!isOpen) return null;

    const [chapters, setChapters] = useState<Chapter[]>([]);
    // alert(JSON.stringify(data))
    console.log(data);

    const fetchChapter = async () => {
        try {
            const response = await getChapterByStoryidAll(data);

            setChapters(response.data);
            console.log(response.data);

        } catch (error) {
            console.error("Failed to fetch chapters:", error);
        }
    };

    useEffect(() => {
        fetchChapter();
    }, [data]);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-600 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-3/4 max-w-lg relative">
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-xl text-gray-500"
                >
                    &times;
                </button>

                <b className="text-1xl font-semibold">danh sách chương</b>

                <div className="mt-4 max-h-96 overflow-y-scroll">
                    {chapters.map((chapter, index) => (
                        <div className="mt-4" key={index}>
                            <p
                                className="  cursor-pointer"
                                onClick={() => selectChapter(chapter.slug)}
                            >
                                {chapter.chapter_name}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
