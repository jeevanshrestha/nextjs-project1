import Image from "next/image";
import Head from "next/head";
import {getStaticProps} from './server/communication'
 import PostCard from "./components/PostCard";

 type Post = {
  id: string;
  title: string;
  content: string;
  slug: string;
  date: string;
  // Add any other fields you expect
};
export default async function Home() {
  try {
    const data = await getStaticProps();
    // Check if data contains posts array in the expected structure
    const posts: Post[] = Array.isArray(data?.props?.posts) ? data.props.posts : [];
    
    return (
      <div className="container">
        {/* ... rest of your JSX ... */}
        <div className="grid">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <p>No posts found</p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return (
      <div className="container">
        <h1>Error loading posts</h1>
        <p>Please try again later.</p>
      </div>
    );
  }
}