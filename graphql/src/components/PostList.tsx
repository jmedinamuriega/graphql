import React, { useState, ChangeEvent, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { PostsData, Post } from '../interfaces';
import PostForm from './PostForm';
import DeletePost from './DeletePost';

const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts {
      data {
        id
        title
        body
        user {
          id
        }
      }
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

const PostList: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const { loading, error, data } = useQuery<PostsData>(GET_ALL_POSTS);
  const [posts, setPosts] = useState<Post[]>([]);
  const [deletePost] = useMutation<{ deletePost: boolean }, { id: string }>(DELETE_POST);

  useEffect(() => {
    if (data) {
      setPosts(data.posts.data);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserId(value ? parseInt(value) : null);
  };

  const filteredPosts = userId
    ? posts.filter((post: Post) => post.user.id === userId.toString())
    : posts;

  const handlePostDelete = async (postId: string) => {
    try {
      await deletePost({ variables: { id: postId } });
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handlePostCreate = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div>
      <label>
        Filter by User ID:
        <input
          type="number"
          value={userId || ''}
          onChange={handleChange}
          placeholder="Enter User ID"
        />
      </label>
      <PostForm onSuccess={handlePostCreate} />
      {filteredPosts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <small>User ID: {post.user.id}</small>
          <PostForm post={post} />
          <DeletePost post={post} onDelete={handlePostDelete} />
        </div>
      ))}
    </div>
  );
};

export default PostList;
