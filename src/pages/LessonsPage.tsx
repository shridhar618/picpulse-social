import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, ChevronRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface Lesson {
  kannada: string;
  english: string;
  pronunciation: string;
  category: string;
}

const LessonsPage = () => {
  const [activeCategory, setActiveCategory] = useState("greetings");
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set(JSON.parse(localStorage.getItem("completedLessons") || "[]"))
  );

  const categories = [
    { id: "greetings", name: "Greetings", icon: "👋" },
    { id: "numbers", name: "Numbers", icon: "🔢" },
    { id: "phrases", name: "Common Phrases", icon: "💬" },
    { id: "food", name: "Food", icon: "🍲" },
    { id: "travel", name: "Travel", icon: "✈️" },
    { id: "culture", name: "Culture", icon: "🎭" },
  ];

  const lessons: Record<string, Lesson[]> = {
    greetings: [
      { kannada: "ನಮಸ್ಕಾರ", english: "Hello / Namaste", pronunciation: "Namaskāra", category: "greetings" },
      { kannada: "ಧನ್ಯವಾದಗಳು", english: "Thank you", pronunciation: "Dhanyavādagaḷu", category: "greetings" },
      { kannada: "ಹೇಗಿದ್ದೀರಿ?", english: "How are you?", pronunciation: "Hēgiddīri?", category: "greetings" },
      { kannada: "ಚೆನ್ನಾಗಿದ್ದೇನೆ", english: "I am fine", pronunciation: "Chennāgiddēne", category: "greetings" },
      { kannada: "ವಿದಾಯ", english: "Goodbye", pronunciation: "Vidāya", category: "greetings" },
    ],
    numbers: [
      { kannada: "ಒಂದು", english: "One", pronunciation: "Ondu", category: "numbers" },
      { kannada: "ಎರಡು", english: "Two", pronunciation: "Eraḍu", category: "numbers" },
      { kannada: "ಮೂರು", english: "Three", pronunciation: "Mūru", category: "numbers" },
      { kannada: "ನಾಲ್ಕು", english: "Four", pronunciation: "Nālku", category: "numbers" },
      { kannada: "ಐದು", english: "Five", pronunciation: "Aidu", category: "numbers" },
      { kannada: "ಆರು", english: "Six", pronunciation: "Āru", category: "numbers" },
      { kannada: "ಏಳು", english: "Seven", pronunciation: "Ēḷu", category: "numbers" },
      { kannada: "ಎಂಟು", english: "Eight", pronunciation: "Eṇṭu", category: "numbers" },
      { kannada: "ಒಂಬತ್ತು", english: "Nine", pronunciation: "Ombattu", category: "numbers" },
      { kannada: "ಹತ್ತು", english: "Ten", pronunciation: "Hattu", category: "numbers" },
    ],
    phrases: [
      { kannada: "ದಯವಿಟ್ಟು", english: "Please", pronunciation: "Dayaviṭṭu", category: "phrases" },
      { kannada: "ಕ್ಷಮಿಸಿ", english: "Sorry / Excuse me", pronunciation: "Kṣamisi", category: "phrases" },
      { kannada: "ನನ್ನ ಹೆಸರು...", english: "My name is...", pronunciation: "Nanna hesaru...", category: "phrases" },
      { kannada: "ನಿಮ್ಮ ಹೆಸರೇನು?", english: "What is your name?", pronunciation: "Nim'ma hesarēnu?", category: "phrases" },
      { kannada: "ಅರ್ಥವಾಗಲಿಲ್ಲ", english: "I don't understand", pronunciation: "Arthavāgalilla", category: "phrases" },
    ],
    food: [
      { kannada: "ಊಟ", english: "Food / Meal", pronunciation: "Ūṭa", category: "food" },
      { kannada: "ನೀರು", english: "Water", pronunciation: "Nīru", category: "food" },
      { kannada: "ಅನ್ನ", english: "Rice", pronunciation: "Anna", category: "food" },
      { kannada: "ರೊಟ್ಟಿ", english: "Bread / Roti", pronunciation: "Roṭṭi", category: "food" },
      { kannada: "ದೋಸೆ", english: "Dosa", pronunciation: "Dōse", category: "food" },
    ],
    travel: [
      { kannada: "ಎಲ್ಲಿ", english: "Where", pronunciation: "Elli", category: "travel" },
      { kannada: "ದಾರಿ", english: "Way / Path", pronunciation: "Dāri", category: "travel" },
      { kannada: "ಬಸ್", english: "Bus", pronunciation: "Bas", category: "travel" },
      { kannada: "ರೈಲು", english: "Train", pronunciation: "Railu", category: "travel" },
      { kannada: "ಹೋಟೆಲ್", english: "Hotel", pronunciation: "Hōṭel", category: "travel" },
    ],
    culture: [
      { kannada: "ಕರ್ನಾಟಕ", english: "Karnataka", pronunciation: "Karnāṭaka", category: "culture" },
      { kannada: "ಹಬ್ಬ", english: "Festival", pronunciation: "Habba", category: "culture" },
      { kannada: "ಸಂಗೀತ", english: "Music", pronunciation: "Saṅgīta", category: "culture" },
      { kannada: "ನೃತ್ಯ", english: "Dance", pronunciation: "Nr̥tya", category: "culture" },
      { kannada: "ಯಕ್ಷಗಾನ", english: "Yakshagana (Traditional Theatre)", pronunciation: "Yakṣagāna", category: "culture" },
    ],
  };

  const playAudio = (text: string) => {
    // Simulate audio playback
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "kn-IN";
    synth.speak(utterance);
    toast.success("Playing pronunciation...");
  };

  const markComplete = (lessonKey: string) => {
    const updated = new Set(completedLessons);
    updated.add(lessonKey);
    setCompletedLessons(updated);
    localStorage.setItem("completedLessons", JSON.stringify(Array.from(updated)));
    toast.success("Lesson completed! 🎉");
  };

  const currentLessons = lessons[activeCategory] || [];

  return (
    <div className="min-h-screen bg-gradient-card pb-20 md:pb-0">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Interactive <span className="font-kannada text-primary">ಪಾಠಗಳು</span> Lessons
          </h1>
          <p className="text-xl text-muted-foreground">
            Learn Kannada through structured categories with audio pronunciation
          </p>
        </div>
        
        {/* Category Selection */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? "default" : "outline"}
              className={`h-auto py-6 flex flex-col gap-2 ${
                activeCategory === cat.id ? "bg-gradient-primary shadow-glow" : ""
              }`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-sm font-semibold">{cat.name}</span>
            </Button>
          ))}
        </div>
        
        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentLessons.map((lesson, index) => {
            const lessonKey = `${activeCategory}-${index}`;
            const isCompleted = completedLessons.has(lessonKey);
            
            return (
              <Card key={index} className="p-6 hover:shadow-strong transition-all duration-300 relative overflow-hidden group">
                {isCompleted && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle className="h-6 w-6 text-success-green" />
                  </div>
                )}
                
                <div className="mb-4">
                  <div className="text-5xl font-kannada text-primary mb-2">
                    {lesson.kannada}
                  </div>
                  <div className="text-sm text-muted-foreground italic mb-1">
                    {lesson.pronunciation}
                  </div>
                </div>
                
                <div className="text-xl font-semibold text-foreground mb-4">
                  {lesson.english}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => playAudio(lesson.kannada)}
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
                    Listen
                  </Button>
                  
                  {!isCompleted && (
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-primary"
                      onClick={() => markComplete(lessonKey)}
                    >
                      Complete
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
                
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LessonsPage;
