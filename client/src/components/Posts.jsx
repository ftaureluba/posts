import React, { useState, useEffect } from 'react';
import {apiService} from '../services/PostsService'
function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await apiService.fetchData('/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="posts">
      <h1>Posts</h1>
      <p>This file will list all the posts.</p>
      {posts.map(post => (
        <div key={post.id}>
          <p>
            <span><b>{post.title}</b></span><br />
            <span>{post.description}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default Posts;