
import { Card } from "@/components/ui/card";
import { Mic, Activity, Calendar, Users, Headphones, Download } from "lucide-react";

const features = [
  {
    icon: <Mic className="h-6 w-6 text-accent" />,
    title: "Studio-Quality Audio",
    description: "Record locally in lossless WAV for the highest quality podcast audio without internet interruptions."
  },
  {
    icon: <Activity className="h-6 w-6 text-accent" />,
    title: "Separate Audio Tracks",
    description: "Each participant's audio is recorded on a separate track for professional editing and mixing."
  },
  {
    icon: <Calendar className="h-6 w-6 text-accent" />,
    title: "Easy Scheduling",
    description: "Invite guests with a simple link and schedule recordings with calendar integration."
  },
  {
    icon: <Users className="h-6 w-6 text-accent" />,
    title: "Multiple Guests",
    description: "Host interviews with up to 8 participants with crystal clear audio and video quality."
  },
  {
    icon: <Headphones className="h-6 w-6 text-accent" />,
    title: "Live Monitoring",
    description: "Monitor audio levels and quality in real-time to ensure professional recordings."
  },
  {
    icon: <Download className="h-6 w-6 text-accent" />,
    title: "Instant Downloads",
    description: "Get your recordings immediately with no wait times for processing or rendering."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 px-6 bg-gradient-to-b from-podmint to-podmint/50 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful <span className="text-gradient">Features</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create professional podcast content, all in one intuitive platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-podmint border border-white/10 p-6 hover:border-accent/50 transition-all hover-glow hover-lift animate-fade-up" 
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 animate-pulse-slow">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
