// pages/blog.js
export async function getStaticProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await res.json();
    
    return {
      props: {
        posts
      }
    };
  }
  
  interface Post {
    id: number;
    title: string;
    content: string;
  }
  
  interface BlogProps {
    posts: Post[];
  }
  
  export default function Blog({ posts }: BlogProps) {
    return (
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    );
  }
  