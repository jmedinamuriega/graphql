import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $body: String!) {
    createPost(input: { title: $title, body: $body }) {
      id
      title
      body
      user {
        id
      }
    }
  }
`;

export const UPDATE_POST = gql`
mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
  updatePost(id: $id, input: $input) {
    id
    title
    body
    user {
      id
    }
  }
}
`;

export const DELETE_POST = gql`
mutation DeletePost($id: ID!) {
  deletePost(id: $id)
}
`;
