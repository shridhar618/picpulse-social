import React, { useState } from 'react';
import { Camera, Edit, Settings, MapPin, Calendar, Link, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface UserProfileProps {
  isOwnProfile?: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({ isOwnProfile = true }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  
  const user = {
    name: 'John Doe',
    username: '@johndoe',
    bio: 'Digital creator & storyteller 📸 Passionate about connecting people through visual narratives. Love coffee, travel, and capturing life\'s beautiful moments.',
    location: 'San Francisco, CA',
    website: 'johndoe.com',
    joinDate: 'March 2023',
    followers: 1234,
    following: 567,
    posts: 89,
    isVerified: true
  };

  const userPosts = [
    { id: 1, image: '🏔️', likes: 45, comments: 12 },
    { id: 2, image: '🌅', likes: 67, comments: 8 },
    { id: 3, image: '☕', likes: 23, comments: 5 },
    { id: 4, image: '🎨', likes: 89, comments: 15 },
    { id: 5, image: '🌊', likes: 156, comments: 24 },
    { id: 6, image: '🌸', likes: 78, comments: 9 },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-card border-border shadow-medium overflow-hidden">
        <CardContent className="p-0">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-hero relative">
            <div className="absolute inset-0 bg-black/20" />
            {isOwnProfile && (
              <Button 
                size="sm" 
                variant="secondary" 
                className="absolute top-4 right-4 glass text-white border-white/20 hover:bg-white/20"
              >
                <Camera size={16} className="mr-2" />
                Edit Cover
              </Button>
            )}
          </div>

          <div className="px-6 pb-6">
            {/* Profile Picture & Basic Info */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-4">
                <div className="relative mb-4 sm:mb-0">
                  <Avatar className="h-32 w-32 ring-4 ring-card border-4 border-card shadow-strong">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl font-bold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  {isOwnProfile && (
                    <Button 
                      size="sm" 
                      className="absolute bottom-0 right-0 h-8 w-8 p-0 rounded-full bg-primary hover:bg-primary-dark shadow-medium"
                    >
                      <Camera size={14} />
                    </Button>
                  )}
                </div>

                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start space-x-2">
                    <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
                    {user.isVerified && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        ✓
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground">{user.username}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 mt-4 sm:mt-0">
                {isOwnProfile ? (
                  <>
                    <Button variant="outline" className="flex-1 sm:flex-none border-primary/20 text-primary hover:bg-primary/5">
                      <Edit size={16} className="mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" size="icon" className="border-primary/20 text-primary hover:bg-primary/5">
                      <Settings size={16} />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      className={`flex-1 transition-smooth ${
                        isFollowing 
                          ? 'bg-secondary text-secondary-foreground hover:bg-muted' 
                          : 'bg-gradient-primary hover:bg-gradient-secondary text-primary-foreground'
                      }`}
                      onClick={() => setIsFollowing(!isFollowing)}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                    <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/5">
                      Message
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Bio & Stats */}
            <div className="space-y-4">
              <p className="text-foreground leading-relaxed max-w-2xl">{user.bio}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {user.location && (
                  <div className="flex items-center space-x-1">
                    <MapPin size={14} />
                    <span>{user.location}</span>
                  </div>
                )}
                {user.website && (
                  <div className="flex items-center space-x-1">
                    <Link size={14} />
                    <a href="#" className="text-primary hover:underline">{user.website}</a>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>Joined {user.joinDate}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex space-x-6 pt-2">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{user.posts}</p>
                  <p className="text-sm text-muted-foreground">Posts</p>
                </div>
                <div className="text-center cursor-pointer hover:text-primary transition-smooth">
                  <p className="text-2xl font-bold text-foreground">{user.followers.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </div>
                <div className="text-center cursor-pointer hover:text-primary transition-smooth">
                  <p className="text-2xl font-bold text-foreground">{user.following}</p>
                  <p className="text-sm text-muted-foreground">Following</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Content */}
      <Tabs defaultValue="posts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-muted">
          <TabsTrigger value="posts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Posts
          </TabsTrigger>
          <TabsTrigger value="media" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Media
          </TabsTrigger>
          <TabsTrigger value="liked" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Liked
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          {userPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {userPosts.map((post) => (
                <Card key={post.id} className="group cursor-pointer overflow-hidden hover:shadow-medium transition-smooth">
                  <CardContent className="p-0 relative">
                    <div className="aspect-square bg-gradient-secondary flex items-center justify-center text-6xl">
                      {post.image}
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center space-x-4">
                      <div className="flex items-center space-x-1 text-white">
                        <span className="font-semibold">{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-white">
                        <span className="font-semibold">{post.comments}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No posts yet</h3>
              <p className="text-muted-foreground">When you share photos, they'll appear here.</p>
              {isOwnProfile && (
                <Button className="mt-4 bg-gradient-primary hover:bg-gradient-secondary text-primary-foreground">
                  Create your first post
                </Button>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="media">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Media Gallery</h3>
            <p className="text-muted-foreground">Photos and videos will be displayed here.</p>
          </div>
        </TabsContent>

        <TabsContent value="liked">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❤️</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Liked Posts</h3>
            <p className="text-muted-foreground">Posts you've liked will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};