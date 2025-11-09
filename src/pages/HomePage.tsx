import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Brain, Volume2, TrendingUp, Globe, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const languages = [
    { value: "english", label: "English" },
    { value: "hindi", label: "हिंदी (Hindi)" },
    { value: "tamil", label: "தமிழ் (Tamil)" },
    { value: "telugu", label: "తెలుగు (Telugu)" },
    { value: "malayalam", label: "മലയാളം (Malayalam)" },
    { value: "marathi", label: "मराठी (Marathi)" },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Interactive Lessons",
      description: "Learn Kannada through structured categories: Greetings, Numbers, Phrases, Culture & more",
    },
    {
      icon: Volume2,
      title: "Audio Pronunciation",
      description: "Listen to native Kannada pronunciations and practice speaking with voice feedback",
    },
    {
      icon: Brain,
      title: "Smart Quizzes",
      description: "Test your knowledge with adaptive quizzes and instant feedback",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed progress analytics",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-card">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-accent/50 px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">AI-Powered Language Learning</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="block text-foreground">Learn Kannada,</span>
              <span className="block font-kannada text-6xl md:text-8xl bg-gradient-primary bg-clip-text text-transparent mt-2">
                ಕನ್ನಡ ಕಲಿಯಿರಿ
              </span>
              <span className="block text-foreground mt-2">Speak Culture</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Master the beautiful Kannada language through interactive lessons, cultural immersion, and AI-powered feedback. Your journey to speaking Karnataka's heart begins here.
            </p>
            
            {/* Language Selection */}
            <Card className="max-w-md mx-auto p-6 shadow-strong mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">Choose Your Native Language</h3>
              </div>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedLanguage && (
                <div className="mt-6 p-4 bg-gradient-primary rounded-lg text-white text-center animate-fade-in">
                  <p className="font-semibold mb-2">Great choice! 🎉</p>
                  <p className="text-sm mb-4">
                    Learn Kannada from {languages.find(l => l.value === selectedLanguage)?.label}
                  </p>
                  <Link to="/lessons">
                    <Button variant="secondary" size="lg" className="w-full">
                      Start Learning Now
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
            
            {!selectedLanguage && (
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/lessons">
                  <Button size="lg" className="bg-gradient-primary shadow-glow">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Start Learning
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Floating Kannada Letters */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="font-kannada text-6xl text-primary/10 absolute top-20 left-10 animate-float">ಕ</div>
          <div className="font-kannada text-5xl text-cultural-gold/10 absolute top-40 right-20 animate-float-delayed">ನ</div>
          <div className="font-kannada text-7xl text-primary/10 absolute bottom-40 left-1/4 animate-float">ಡ</div>
          <div className="font-kannada text-4xl text-cultural-maroon/10 absolute bottom-20 right-1/4 animate-float-delayed">ಭಾಷೆ</div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why LearnKannada.ai?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience a modern, culturally-rich approach to learning one of India's oldest languages
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
                  <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Cultural Section */}
      <section className="py-20 px-4 bg-accent/30">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Immerse in Karnataka's Rich Heritage
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Beyond just words and grammar, discover the vibrant culture, traditions, and heritage of Karnataka. Learn about Yakshagana, Mysore Palace, traditional festivals, and the warmth of Kannada-speaking communities.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {["🏛️ Heritage", "🎭 Arts", "🍲 Cuisine", "🎉 Festivals"].map((item, i) => (
                <Card key={i} className="p-6 text-center hover:shadow-medium transition-all">
                  <div className="text-4xl mb-2">{item.split(" ")[0]}</div>
                  <p className="font-semibold">{item.split(" ")[1]}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="bg-gradient-primary text-white p-12 text-center shadow-strong">
            <h2 className="text-4xl font-bold mb-4">Ready to Begin Your Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of learners mastering Kannada with AI-powered guidance
            </p>
            <Link to="/lessons">
              <Button size="lg" variant="secondary" className="shadow-lg">
                Start First Lesson Free
              </Button>
            </Link>
          </Card>
        </div>
      </section>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-5deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
