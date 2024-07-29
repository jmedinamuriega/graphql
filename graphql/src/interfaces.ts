export interface Post {
    id: string;
    title: string;
    body: string;
    user: {
      id: string;
    };
  }
  
  export interface PostsData {
    posts: {
      data: Post[];
    };
  }
  
  export interface CreatePostInput {
    title: string;
    body: string;
    userId: number;
  }
  
  export interface UpdatePostInput {
    title: string;
    body: string;
  }
  