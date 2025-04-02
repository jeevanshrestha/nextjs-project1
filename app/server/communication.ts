import {getClient} from "./connection";
import { gql } from "@apollo/client";

type Posts = {
  title: string;
  content: string;
  uri: string;
  date: Date;
};

export async function getStaticProps( ){

    const client = getClient()

    let posts: Posts[] = [];
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
    posts = response?.data?.posts?.nodes
    return {
      props:{
        posts
      }
    }
  }

 