import client from "./connection";
import { gql } from "@apollo/client";


export async function getStaticProps(){

    const GET_POSTS = gql`
      query GetAllPosts{
        posts{
          nodes{
            title
            content
            uri
            date
          }
        }
      }
    `
    const response = await client.query({
      query:GET_POSTS
    })
    const posts = response?.data?.posts?.nodes
    return {
      props:{
        posts
      }
    }
  }


export     async function fetchGalleryImages() {

    const GET_GALLERY_IMAGES = gql`
       query GetGalleryImages {
              mediaItems(where: { search: "LeCavist" }) {
                edges {
                  node {
                    id
                    title
                    slug
                    sourceUrl
                  }
                }
              }
            }
          `;

    try {
    
      const response = await fetch("https://wpserve.harveynormancommercial.com.au/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: ,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { data } = await response.json();
      setImages(data?.mediaItems?.edges || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }