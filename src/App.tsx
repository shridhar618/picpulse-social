import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { Navigation } from "@/components/Navigation";
import { SocialFeed } from "@/components/SocialFeed";
import { UserProfile } from "@/components/UserProfile";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('home');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <SocialFeed />;
      case 'profile':
        return <UserProfile isOwnProfile />;
      case 'search':
        return (
          <div className="max-w-2xl mx-auto p-4 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Search</h2>
            <p className="text-muted-foreground">Discover new people and content</p>
          </div>
        );
      case 'create':
        return (
          <div className="max-w-2xl mx-auto p-4 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Create Post</h2>
            <p className="text-muted-foreground">Share your thoughts and moments</p>
          </div>
        );
      case 'notifications':
        return (
          <div className="max-w-2xl mx-auto p-4 text-center">
            <div className="text-6xl mb-4">🔔</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Notifications</h2>
            <p className="text-muted-foreground">Stay updated with your community</p>
          </div>
        );
      default:
        return <SocialFeed />;
    }
  };

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <WelcomeScreen onGetStarted={() => setIsAuthenticated(true)} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-gradient-card">
          <Navigation currentView={currentView} onViewChange={setCurrentView} />
          <main className="pb-20 md:pb-4">
            {renderCurrentView()}
          </main>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
