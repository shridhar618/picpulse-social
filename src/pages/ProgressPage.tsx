import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, BookOpen, Brain, TrendingUp, Award, Target } from "lucide-react";

const ProgressPage = () => {
  const completedLessons = new Set(JSON.parse(localStorage.getItem("completedLessons") || "[]"));
  const quizScores = JSON.parse(localStorage.getItem("quizScores") || "{}");
  
  const totalLessons = 29; // Total across all categories
  const completedCount = completedLessons.size;
  const completionPercentage = Math.round((completedCount / totalLessons) * 100);
  
  const categoryProgress = [
    { name: "Greetings", icon: "👋", total: 5, category: "greetings" },
    { name: "Numbers", icon: "🔢", total: 10, category: "numbers" },
    { name: "Common Phrases", icon: "💬", total: 5, category: "phrases" },
    { name: "Food", icon: "🍲", total: 5, category: "food" },
    { name: "Travel", icon: "✈️", total: 5, category: "travel" },
    { name: "Culture", icon: "🎭", total: 5, category: "culture" },
  ];
  
  const getCategoryCompleted = (category: string) => {
    return Array.from(completedLessons).filter(lesson => 
      (lesson as string).startsWith(category)
    ).length;
  };
  
  const avgQuizScore = Object.values(quizScores).length > 0 
    ? Math.round((Object.values(quizScores).reduce((a: number, b: any) => a + Number(b), 0) as number) / Object.values(quizScores).length)
    : 0;
  
  const stats = [
    {
      icon: BookOpen,
      label: "Lessons Completed",
      value: completedCount,
      total: totalLessons,
      color: "text-primary",
    },
    {
      icon: Brain,
      label: "Quizzes Taken",
      value: Object.keys(quizScores).length,
      total: 3,
      color: "text-learning-blue",
    },
    {
      icon: Trophy,
      label: "Avg Quiz Score",
      value: avgQuizScore,
      total: 3,
      color: "text-cultural-gold",
    },
    {
      icon: TrendingUp,
      label: "Overall Progress",
      value: completionPercentage,
      total: 100,
      color: "text-success-green",
      suffix: "%",
    },
  ];
  
  const achievements = [
    { name: "First Steps", desc: "Complete your first lesson", unlocked: completedCount >= 1, icon: "🎯" },
    { name: "Number Master", desc: "Complete all number lessons", unlocked: getCategoryCompleted("numbers") >= 10, icon: "🔢" },
    { name: "Conversationalist", desc: "Complete greetings and phrases", unlocked: getCategoryCompleted("greetings") >= 5 && getCategoryCompleted("phrases") >= 5, icon: "💬" },
    { name: "Quiz Champion", desc: "Score 100% in any quiz", unlocked: Object.values(quizScores).some((score: any) => score >= 3), icon: "🏆" },
    { name: "Dedicated Learner", desc: "Complete 20+ lessons", unlocked: completedCount >= 20, icon: "⭐" },
    { name: "Kannada Pro", desc: "Complete all lessons", unlocked: completedCount >= totalLessons, icon: "👑" },
  ];

  return (
    <div className="min-h-screen bg-gradient-card pb-20 md:pb-0">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Learning <span className="font-kannada text-primary">ಪ್ರಗತಿ</span> Progress
          </h1>
          <p className="text-xl text-muted-foreground">
            Track your journey to mastering Kannada
          </p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 text-center hover:shadow-strong transition-all">
                <Icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                <div className="text-4xl font-bold mb-2">
                  {stat.value}{stat.suffix || `/${stat.total}`}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            );
          })}
        </div>
        
        {/* Overall Progress */}
        <Card className="p-8 mb-12">
          <div className="flex items-center gap-4 mb-4">
            <Target className="h-8 w-8 text-primary" />
            <div className="flex-1">
              <h3 className="text-2xl font-bold">Overall Learning Progress</h3>
              <p className="text-muted-foreground">Keep going! You're doing great 🎉</p>
            </div>
            <Badge className="text-2xl px-6 py-2 bg-gradient-primary">
              {completionPercentage}%
            </Badge>
          </div>
          <Progress value={completionPercentage} className="h-4" />
        </Card>
        
        {/* Category Progress */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            Category Breakdown
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {categoryProgress.map((cat, index) => {
              const completed = getCategoryCompleted(cat.category);
              const percentage = Math.round((completed / cat.total) * 100);
              
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{cat.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{cat.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {completed}/{cat.total} lessons completed
                      </p>
                    </div>
                    <Badge variant="outline" className="text-lg px-3 py-1">
                      {percentage}%
                    </Badge>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </Card>
              );
            })}
          </div>
        </div>
        
        {/* Quiz Scores */}
        {Object.keys(quizScores).length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Brain className="h-8 w-8 text-learning-blue" />
              Quiz Performance
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(quizScores).map(([category, score]: [string, any]) => (
                <Card key={category} className="p-6 text-center">
                  <h4 className="font-semibold text-lg capitalize mb-3">{category}</h4>
                  <div className="text-5xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
                    {score}/3
                  </div>
                  <Progress value={(score / 3) * 100} className="h-2" />
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* Achievements */}
        <div>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Award className="h-8 w-8 text-cultural-gold" />
            Achievements
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className={`p-6 transition-all ${
                  achievement.unlocked
                    ? "bg-gradient-to-br from-cultural-gold/10 to-primary/10 border-cultural-gold shadow-glow"
                    : "opacity-50 grayscale"
                }`}
              >
                <div className="text-5xl mb-3">{achievement.icon}</div>
                <h4 className="font-bold text-lg mb-1">{achievement.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">{achievement.desc}</p>
                {achievement.unlocked ? (
                  <Badge className="bg-success-green">Unlocked ✓</Badge>
                ) : (
                  <Badge variant="outline">Locked</Badge>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
