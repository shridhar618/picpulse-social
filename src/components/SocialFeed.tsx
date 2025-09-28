import React, { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Post {
  id: string;
  user: {
    name: string;
    username: string;
    avatar?: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  timestamp: string;
}

const mockPosts: Post[] = [
  {
    id: '1',
    user: {
      name: 'Alex Johnson',
      username: '@alexj',
      avatar: undefined,
    },
    content: 'Just launched my new project! 🚀 Excited to share it with the world.',
    image: undefined,
    likes: 42,
    comments: 8,
    shares: 3,
    isLiked: false,
    timestamp: '2h'
  },
  {
    id: '2', 
    user: {
      name: 'Sarah Chen',
      username: '@sarahc',
      avatar: undefined,
    },
    content: 'Beautiful sunset from my morning run today. Nature never fails to inspire! 🌅',
    image: undefined,
    likes: 128,
    comments: 24,
    shares: 12,
    isLiked: true,
    timestamp: '4h'
  },
  {
    id: '3',
    user: {
      name: 'Mike Rodriguez',
      username: '@mikerod',
      avatar: undefined,
    },
    content: 'Working on some exciting new features. Can\'t wait to show you all what we\'ve been building! 💻✨',
    image: undefined,
    likes: 67,
    comments: 15,
    shares: 5,
    isLiked: false,
    timestamp: '6h'
  }
];

export const SocialFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const toggleLike = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  };

  const PostCard: React.FC<{ post: Post }> = ({ post }) => (
    <Card className="bg-card border-border shadow-soft hover:shadow-medium transition-smooth">
      <CardContent className="p-6">
        {/* User Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 ring-2 ring-primary/20">
              <AvatarImage src={post.user.avatar} />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                <User size={20} />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">{post.user.name}</p>
              <p className="text-sm text-muted-foreground">{post.user.username} • {post.timestamp}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted">
            <MoreHorizontal size={16} />
          </Button>
        </div>

        {/* Post Content */}
        <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>

        {/* Post Image Placeholder */}
        {post.image && (
          <div className="mb-4 rounded-lg overflow-hidden bg-muted h-64 flex items-center justify-center">
            <p className="text-muted-foreground">📸 Image Placeholder</p>
          </div>
        )}

        {/* Engagement Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <span>{post.likes} likes</span>
          <span>{post.comments} comments • {post.shares} shares</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between border-t border-border pt-3">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center space-x-2 hover:bg-like-red/10 hover:text-like-red transition-smooth ${
              post.isLiked ? 'text-like-red' : 'text-muted-foreground'
            }`}
            onClick={() => toggleLike(post.id)}
          >
            <Heart size={18} className={post.isLiked ? 'fill-current' : ''} />
            <span>Like</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-smooth">
            <MessageCircle size={18} />
            <span>Comment</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-muted-foreground hover:bg-accent/10 hover:text-accent transition-smooth">
            <Share size={18} />
            <span>Share</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      {/* Feed Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Social Feed
        </h1>
        <p className="text-muted-foreground">Connect and share with your community</p>
      </div>

      {/* Create Post Button */}
      <Card className="bg-gradient-card border-border shadow-soft">
        <CardContent className="p-4">
          <Button className="w-full bg-gradient-primary hover:bg-gradient-secondary text-primary-foreground font-medium transition-smooth">
            What's on your mind?
          </Button>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/5 transition-smooth">
          Load More Posts
        </Button>
      </div>
    </div>
  );
};