"use client"; // Make the component a Client Component

import { useSearchParams } from "next/navigation"; // Import from next/navigation
import { useEffect, useState } from "react";
import { getChapterById } from "@/app/_api/chapter.api"; // Assuming this is your API to fetch chapter by ID

const Page = () => {
  const searchParams = useSearchParams(); // Get search params from the URL
  const chapter_id = searchParams.get("chapter_id"); // Extract chapter_id from query string

  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("chapter_id:", chapter_id);

    if (chapter_id) {
      const fetchChapter = async () => {
        try {
          const data = await getChapterById(chapter_id); // Fetch the chapter by ID
          setChapter(data);
        } catch (err) {
          setError("Error fetching chapter");
        } finally {
          setLoading(false);
        }
      };

      fetchChapter();
    }
  }, [chapter_id]); // Fetch chapter when chapter_id changes

  if (loading) return <div>Loading...</div>; // Display loading state
  if (error) return <div>{error}</div>; // Display error if occurred

  return (
    <div>
      <h1>{chapter?.chapter_name}</h1>
      <p>{chapter?.content}</p> Assuming chapter has content
    </div>
  );
};

export default Page;
