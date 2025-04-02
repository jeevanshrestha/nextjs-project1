"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getClient } from "../server/connection";
import { gql } from "@apollo/client";

interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  date?: string;
  // Add any other fields you expect from the API
}
const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
      id
      title
      content
      slug
      date
    }
  }
`;

async function getPostBySlug(slug: string): Promise<Post | null> {
  const client = getClient()
  try {
    const { data } = await client.query({
      query: GET_POST_BY_SLUG,
      variables: { slug },
    });
    return data?.postBy || null;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
}

export default function PostContent() { 
  const params = useParams();
  const slug = params.url as string; // Type assertion since we know url exists
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const data = await getPostBySlug(slug);
        if (!data) {
          throw new Error("Post not found");
        }
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load post");
      } finally {
        setLoading(false);
      }
    }
    
    if (slug) {
      fetchData();
    }
  }, [slug]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 py-8">Error: {error}</div>;
  if (!post) return <div className="py-8">Post not found</div>;

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <article className="prose lg:prose-xl"> 
        <div 
          className="prose" 
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </article>
    </div>
  );
}