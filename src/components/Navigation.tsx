import React, { useState } from 'react';
import { Home, Search, PlusSquare, Heart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const [notificationCount] = useState(3);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'create', label: 'Create', icon: PlusSquare },
    { id: 'notifications', label: 'Notifications', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const NavButton: React.FC<{ item: typeof navItems[0]; isMobile?: boolean }> = ({ item, isMobile = false }) => {
    const Icon = item.icon;
    const isActive = currentView === item.id;
    
    return (
      <Button
        variant="ghost"
        size={isMobile ? "sm" : "default"}
        className={`
          flex items-center justify-center relative transition-smooth
          ${isMobile ? 'w-full justify-start space-x-3 h-12' : 'h-12 w-12 md:w-auto md:px-4'}
          ${isActive 
            ? 'bg-primary/10 text-primary border border-primary/20' 
            : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
          }
        `}
        onClick={() => onViewChange(item.id)}
      >
        <Icon size={20} />
        {isMobile && <span className="font-medium">{item.label}</span>}
        {!isMobile && (
          <span className="hidden md:inline-block ml-2 font-medium">{item.label}</span>
        )}
        
        {/* Notification Badge */}
        {item.id === 'notifications' && notificationCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-like-red border-background"
          >
            {notificationCount}
          </Badge>
        )}
      </Button>
    );
  };

  return (
    <>
      {/* Desktop Navigation - Top Bar */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                SocialApp
              </span>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-2">
              {navItems.map((item) => (
                <NavButton key={item.id} item={item} />
              ))}
            </div>

            {/* User Avatar */}
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8 ring-2 ring-primary/20 cursor-pointer hover:ring-primary/40 transition-smooth">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-sm font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-t border-border">
        <div className="flex items-center justify-around py-2 px-4">
          {navItems.slice(0, 4).map((item) => (
            <NavButton key={item.id} item={item} />
          ))}
          
          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-12 w-12 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-smooth"
              >
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-auto bg-card border-border">
              <div className="py-6 space-y-4">
                <div className="flex items-center space-x-3 mb-6">
                  <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">John Doe</p>
                    <p className="text-sm text-muted-foreground">@johndoe</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <NavButton key={item.id} item={item} isMobile />
                  ))}
                </div>
                
                <div className="pt-4 border-t border-border">
                  <Button 
                    variant="outline" 
                    className="w-full border-destructive/20 text-destructive hover:bg-destructive/5"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <div className="h-7 w-7 rounded-md bg-gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
            <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
              SocialApp
            </span>
          </div>
          
          <Avatar className="h-7 w-7 ring-2 ring-primary/20">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs font-semibold">
              JD
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Spacer for fixed navigation */}
      <div className="h-16 md:h-20" />
    </>
  );
};