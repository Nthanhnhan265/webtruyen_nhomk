"use client";

import Link from "next/link";

export default function ButtonLink({ href, title }) {
  return (
    <Link href={href} passHref legacyBehavior>
      <a
        title={title}
        className="gap-9 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-200"
      >
        {title}
      </a>
    </Link>
  );
}
