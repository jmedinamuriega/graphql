import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST, UPDATE_POST } from '../mutations/mutations';
import { Post, CreatePostInput, UpdatePostInput } from '../interfaces';

interface PostFormProps {
  post?: Post;
  onSuccess?: (newPost: Post) => void; 
}

const PostForm: React.FC<PostFormProps> = ({ post, onSuccess }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [body, setBody] = useState(post?.body || '');
  const [userId, setUserId] = useState(post?.user.id || '');

  const [createPost, { loading: creating, error: createError }] = useMutation<{ createPost: Post }, CreatePostInput>(CREATE_POST);
  const [updatePost, { loading: updating, error: updateError }] = useMutation<{ updatePost: Post }, { id: string; input: UpdatePostInput }>(UPDATE_POST);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (post) {
        await updatePost({ variables: { id: post.id, input: { title, body } } });
      } else {
        const { data } = await createPost({ variables: { title, body, userId: parseInt(userId, 10) } });
        if (data && onSuccess) {
          onSuccess(data.createPost); 
        }
      }
      setTitle('');
      setBody('');
      setUserId('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Body</label>
        <textarea
          value={body}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)}
        />
      </div>
      {!post && (
        <div>
          <label>User ID</label>
          <input
            type="number"
            value={userId}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUserId(e.target.value)}
          />
        </div>
      )}
      <button type="submit" disabled={creating || updating}>
        {post ? (updating ? 'Updating...' : 'Update Post') : (creating ? 'Creating...' : 'Create Post')}
      </button>
      {createError && <p>Error creating post: {createError.message}</p>}
      {updateError && <p>Error updating post: {updateError.message}</p>}
    </form>
  );
};

export default PostForm;
