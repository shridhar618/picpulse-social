import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Trophy, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface QuizQuestion {
  kannada: string;
  options: string[];
  correct: string;
  category: string;
}

const QuizPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const quizzes: Record<string, QuizQuestion[]> = {
    greetings: [
      {
        kannada: "ನಮಸ್ಕಾರ",
        options: ["Goodbye", "Hello", "Thank you", "Please"],
        correct: "Hello",
        category: "greetings",
      },
      {
        kannada: "ಧನ್ಯವಾದಗಳು",
        options: ["Sorry", "Welcome", "Thank you", "Excuse me"],
        correct: "Thank you",
        category: "greetings",
      },
      {
        kannada: "ಹೇಗಿದ್ದೀರಿ?",
        options: ["How are you?", "What is your name?", "Where are you from?", "Good morning"],
        correct: "How are you?",
        category: "greetings",
      },
    ],
    numbers: [
      {
        kannada: "ಒಂದು",
        options: ["Two", "Three", "One", "Four"],
        correct: "One",
        category: "numbers",
      },
      {
        kannada: "ಐದು",
        options: ["Four", "Five", "Six", "Seven"],
        correct: "Five",
        category: "numbers",
      },
      {
        kannada: "ಹತ್ತು",
        options: ["Eight", "Nine", "Ten", "Eleven"],
        correct: "Ten",
        category: "numbers",
      },
    ],
    food: [
      {
        kannada: "ನೀರು",
        options: ["Rice", "Water", "Bread", "Milk"],
        correct: "Water",
        category: "food",
      },
      {
        kannada: "ದೋಸೆ",
        options: ["Idli", "Dosa", "Vada", "Upma"],
        correct: "Dosa",
        category: "food",
      },
      {
        kannada: "ಅನ್ನ",
        options: ["Rice", "Wheat", "Lentils", "Bread"],
        correct: "Rice",
        category: "food",
      },
    ],
  };

  const categories = [
    { id: "greetings", name: "Greetings", icon: "👋", color: "bg-gradient-primary" },
    { id: "numbers", name: "Numbers", icon: "🔢", color: "bg-gradient-secondary" },
    { id: "food", name: "Food", icon: "🍲", color: "bg-gradient-cultural" },
  ];

  const handleAnswer = (answer: string) => {
    if (answered) return;
    
    setSelectedAnswer(answer);
    setAnswered(true);
    
    const currentQuiz = quizzes[selectedCategory!][currentQuestion];
    if (answer === currentQuiz.correct) {
      setScore(score + 1);
      toast.success("Correct! ✅");
    } else {
      toast.error(`Incorrect. Correct answer: ${currentQuiz.correct}`);
    }
  };

  const nextQuestion = () => {
    const totalQuestions = quizzes[selectedCategory!].length;
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
      // Save score to localStorage
      const quizScores = JSON.parse(localStorage.getItem("quizScores") || "{}");
      quizScores[selectedCategory!] = Math.max(quizScores[selectedCategory!] || 0, score + 1);
      localStorage.setItem("quizScores", JSON.stringify(quizScores));
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnswered(false);
    setSelectedCategory(null);
  };

  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-card pb-20 md:pb-0">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="font-kannada text-primary">ಪರೀಕ್ಷೆ</span> Quiz Time
            </h1>
            <p className="text-xl text-muted-foreground">
              Test your Kannada knowledge with interactive quizzes
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {categories.map((cat) => (
              <Card
                key={cat.id}
                className="p-8 text-center cursor-pointer hover:shadow-strong transition-all duration-300 hover:-translate-y-2"
                onClick={() => setSelectedCategory(cat.id)}
              >
                <div className="text-6xl mb-4">{cat.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
                <p className="text-muted-foreground mb-4">
                  {quizzes[cat.id].length} Questions
                </p>
                <Button className={`w-full ${cat.color}`}>
                  Start Quiz
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const totalQuestions = quizzes[selectedCategory].length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-card pb-20 md:pb-0">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto p-12 text-center">
            <Trophy className="h-24 w-24 text-cultural-gold mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Quiz Complete!</h2>
            <div className="text-6xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                {score}/{totalQuestions}
              </span>
            </div>
            <p className="text-2xl text-muted-foreground mb-8">
              You scored {percentage}%
            </p>
            
            {percentage >= 80 && (
              <div className="mb-8">
                <Badge className="text-lg px-6 py-2 bg-success-green">
                  Excellent Work! 🌟
                </Badge>
              </div>
            )}
            {percentage >= 50 && percentage < 80 && (
              <div className="mb-8">
                <Badge className="text-lg px-6 py-2 bg-learning-blue">
                  Good Job! Keep Learning 📚
                </Badge>
              </div>
            )}
            {percentage < 50 && (
              <div className="mb-8">
                <Badge className="text-lg px-6 py-2 bg-warning-orange">
                  Keep Practicing! 💪
                </Badge>
              </div>
            )}
            
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={resetQuiz}>
                <RotateCcw className="h-5 w-5 mr-2" />
                Try Another Quiz
              </Button>
              <Button size="lg" variant="outline" onClick={() => {
                setCurrentQuestion(0);
                setScore(0);
                setShowResult(false);
                setSelectedAnswer(null);
                setAnswered(false);
              }}>
                Retry This Quiz
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const currentQuiz = quizzes[selectedCategory][currentQuestion];
  const totalQuestions = quizzes[selectedCategory].length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-card pb-20 md:pb-0">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <Badge className="text-lg px-4 py-2">
                Question {currentQuestion + 1} of {totalQuestions}
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2">
                Score: {score}
              </Badge>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
          
          <Card className="p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-muted-foreground mb-6">
                What does this mean?
              </h2>
              <div className="text-7xl font-kannada text-primary mb-4">
                {currentQuiz.kannada}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuiz.options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentQuiz.correct;
                
                let buttonClass = "";
                if (answered) {
                  if (isCorrect) {
                    buttonClass = "bg-success-green text-white border-success-green";
                  } else if (isSelected && !isCorrect) {
                    buttonClass = "bg-destructive text-white border-destructive";
                  }
                }
                
                return (
                  <Button
                    key={index}
                    variant="outline"
                    size="lg"
                    className={`h-20 text-lg ${buttonClass}`}
                    onClick={() => handleAnswer(option)}
                    disabled={answered}
                  >
                    {option}
                    {answered && isCorrect && <CheckCircle className="h-5 w-5 ml-2" />}
                    {answered && isSelected && !isCorrect && <XCircle className="h-5 w-5 ml-2" />}
                  </Button>
                );
              })}
            </div>
            
            {answered && (
              <div className="mt-8 text-center">
                <Button size="lg" onClick={nextQuestion} className="bg-gradient-primary">
                  {currentQuestion < totalQuestions - 1 ? "Next Question" : "See Results"}
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
