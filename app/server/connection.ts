import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const getClient = () => {
  // Check if WORDPRESS_API_URL is set
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://wpserve.harveynormancommercial.com.au/graphql", // TEMPORARY!
    }),
    cache: new InMemoryCache(),
  });
};