import React, { useEffect, useState } from "react";
import { useQuery, useSubscription, gql } from "@apollo/client";
import PostsTable from "./PostsTable";

const GET_POSTS = gql`
  query {
    posts {
      id
      title
      content
      userId
    }
  }
`;

const POST_SUBSCRIPTION = gql`
  subscription {
    postCreated {
      id
      title
      content
      userId
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(GET_POSTS);
  const { data: subData } = useSubscription(POST_SUBSCRIPTION);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (data) {
      setPosts(data.posts);
    }
  }, [data]);

  useEffect(() => {
    if (subData) {
      setPosts((prevPosts) => [subData.postCreated, ...prevPosts]);
    }
  }, [subData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Posts Data Table</h1>
      <PostsTable posts={posts} />
    </div>
  );
};

export default App;
