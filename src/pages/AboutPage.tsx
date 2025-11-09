import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Globe, Users, Sparkles, BookOpen, Award } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const features = [
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Learn Kannada from English, Hindi, Tamil, Telugu, Malayalam, and Marathi",
    },
    {
      icon: Sparkles,
      title: "AI-Powered Learning",
      description: "Smart algorithms adapt to your learning pace and style",
    },
    {
      icon: BookOpen,
      title: "Structured Curriculum",
      description: "Carefully designed lessons covering vocabulary, grammar, and culture",
    },
    {
      icon: Award,
      title: "Progress Tracking",
      description: "Detailed analytics and achievements to keep you motivated",
    },
  ];

  const culturalHighlights = [
    {
      icon: "🏛️",
      title: "Rich Heritage",
      description: "Discover Karnataka's ancient temples, palaces, and historical monuments",
    },
    {
      icon: "🎭",
      title: "Traditional Arts",
      description: "Explore Yakshagana, Bharatanatyam, and classical Carnatic music",
    },
    {
      icon: "🍲",
      title: "Culinary Delights",
      description: "Learn about Dosa, Bisi Bele Bath, Mysore Pak, and authentic Karnataka cuisine",
    },
    {
      icon: "🎉",
      title: "Vibrant Festivals",
      description: "Experience Dasara, Ugadi, Karaga, and other colorful celebrations",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-card pb-20 md:pb-0">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/50 px-4 py-2 rounded-full mb-6">
            <Heart className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Made with love for language learners</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="font-kannada text-primary">LearnKannada.ai</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our mission is to make learning Kannada accessible, engaging, and culturally enriching 
            for everyone who wants to connect with Karnataka's beautiful language and heritage.
          </p>
        </div>
        
        {/* Mission Statement */}
        <Card className="p-12 mb-16 bg-gradient-primary text-white shadow-strong">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
            <p className="text-xl leading-relaxed">
              "To bridge cultures and communities through language learning, preserving and promoting 
              Kannada while making it accessible to millions worldwide. We believe that learning a 
              language is not just about words – it's about understanding a culture, connecting with 
              people, and opening new horizons."
            </p>
          </div>
        </Card>
        
        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose LearnKannada.ai?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-strong transition-all duration-300 hover:-translate-y-2">
                  <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
        
        {/* Cultural Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Discover Karnataka's Culture</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learning Kannada opens doors to one of India's most culturally rich states
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {culturalHighlights.map((item, index) => (
              <Card key={index} className="p-8 hover:shadow-strong transition-all">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{item.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Stats Section */}
        <Card className="p-12 mb-16 bg-accent/30">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-primary mb-2">45M+</div>
              <p className="text-lg text-muted-foreground">Kannada Speakers Worldwide</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-cultural-gold mb-2">1,500+</div>
              <p className="text-lg text-muted-foreground">Years of Literary History</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-success-green mb-2">50+</div>
              <p className="text-lg text-muted-foreground">Unique Characters to Learn</p>
            </div>
          </div>
        </Card>
        
        {/* Technology Section */}
        <div className="mb-16">
          <Card className="p-12">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <Users className="h-12 w-12 text-learning-blue" />
                <h2 className="text-4xl font-bold">Built for Learners, By Language Enthusiasts</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                LearnKannada.ai combines modern web technology with proven language learning 
                methodologies. Our interactive lessons, real-time pronunciation feedback, and 
                adaptive quizzes are designed by educators and powered by AI to give you the 
                best learning experience.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you're connecting with family roots, preparing for travel, or simply 
                passionate about languages, we're here to guide you every step of the way.
              </p>
            </div>
          </Card>
        </div>
        
        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join us in celebrating and learning the beautiful Kannada language
          </p>
          <Link to="/lessons">
            <Button size="lg" className="bg-gradient-primary shadow-glow text-lg px-8 py-6">
              <BookOpen className="h-6 w-6 mr-2" />
              Start Learning Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
