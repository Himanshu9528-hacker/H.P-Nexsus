
import { User, Post, Story, Reel } from './types';

export const CURRENT_USER: User = {
  id: 'me',
  username: 'hacker_professor',
  fullName: 'Himanshu Yadav',
  avatar: 'https://picsum.photos/seed/hacker/200',
};

export const MOCK_USERS: User[] = [
  { id: '1', username: 'lucy_sky', fullName: 'Lucy Sky', avatar: 'https://picsum.photos/seed/lucy/200', isVerified: true },
  { id: '2', username: 'the_vibe', fullName: 'The Vibe Creator', avatar: 'https://picsum.photos/seed/vibe/200' },
  { id: '3', username: 'pixel_art', fullName: 'Pixel Master', avatar: 'https://picsum.photos/seed/pixel/200' },
  { id: '4', username: 'nature_go', fullName: 'Nature Enthusiast', avatar: 'https://picsum.photos/seed/nature/200', isVerified: true },
];

export const MOCK_REELS: Reel[] = [
  {
    id: 'r1',
    user: MOCK_USERS[0],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-circuit-board-1582-large.mp4',
    caption: 'Decrypting the world, one line at a time. 💻 #cyber #hacking',
    likes: 4500,
    commentsCount: 120
  },
  {
    id: 'r2',
    user: MOCK_USERS[1],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4',
    caption: 'The vastness of data is like the universe. ✨',
    likes: 8900,
    commentsCount: 450
  }
];

export const MOCK_STORIES: Story[] = MOCK_USERS.map(user => ({
  id: `story-${user.id}`,
  user,
  hasUnseen: Math.random() > 0.3
}));

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    user: MOCK_USERS[0],
    imageUrl: 'https://picsum.photos/seed/post1/600/600',
    caption: 'The future is being built by Hacker Professor! 🚀 #hackerprofessor #tech',
    likes: 1240,
    timestamp: '2 hours ago',
    comments: [{ id: 'c1', username: 'the_vibe', text: 'Looks amazing!', timestamp: '1 hour ago' }]
  },
  {
    id: 'p2',
    user: MOCK_USERS[1],
    imageUrl: 'https://picsum.photos/seed/post2/600/750',
    caption: 'Encryption and Aesthetics go hand in hand. ✨',
    likes: 856,
    timestamp: '5 hours ago',
    comments: []
  }
];
