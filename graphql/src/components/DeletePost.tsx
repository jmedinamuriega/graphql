import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { Post } from '../interfaces';

interface DeletePostProps {
  post?: Post;
  onDelete: (postId: string) => void;
}


const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

const DeletePost: React.FC<DeletePostProps> = ({ post, onDelete }) => {
  const [deletePost] = useMutation<{ deletePost: boolean }, { id: string }>(DELETE_POST);

  const handleSubmit = async () => {
    if (post) {
      try {
        await deletePost({ variables: { id: post.id } });
        onDelete(post.id); 
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  return (
    <>
      <button onClick={handleSubmit}>Delete Post</button>
    </>
  );
};

export default DeletePost;