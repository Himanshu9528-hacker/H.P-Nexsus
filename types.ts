
export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  password?: string; // Added for account protection
  bio?: string;
  isVerified?: boolean;
  isPrivate?: boolean;
  dob?: string;
}

export interface Post {
  id: string;
  user: User;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  isLiked?: boolean;
}

export interface Reel {
  id: string;
  user: User;
  videoUrl: string;
  caption: string;
  likes: number;
  commentsCount: number;
}

export interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
}

export interface Story {
  id: string;
  user: User;
  hasUnseen?: boolean;
}
