
import { Button } from "@/components/ui/button";
import { ArrowRight, Mic, Calendar, Activity } from "lucide-react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <section className="pt-20 pb-20 px-6 overflow-hidden">
      <div className="container mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up">
          Create Professional <span className="text-gradient">Podcasts</span> with Ease
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Record studio-quality remote interviews with crystal-clear audio and 4K video. 
          The simplest platform for creating professional podcast content.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <Button 
            size="lg" 
            className="bg-accent text-white hover:bg-accent/90 hover-glow hover-scale btn-transition hover:cursor-pointer"
            onClick={() => router.push("/signin")}
          >
            Get Started Free
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"/>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white/20 hover:bg-white/5 btn-transition hover-lift hover:cursor-pointer"
          >
            View Demo
          </Button>
        </div>
        
        <div className="relative w-full max-w-5xl rounded-xl overflow-hidden border border-white/10 shadow-2xl animate-fade-up hover-glow transition-all duration-500" style={{ animationDelay: "0.3s" }}>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/20 to-transparent opacity-30 animate-pulse-slow"></div>
          <div className="flex">
            {/* Sidebar */}
            <div className="hidden md:block w-64 bg-podmint border-r border-white/10 min-h-[600px]">
              <div className="p-4">
                <h2 className="text-lg font-medium mb-4">Menu</h2>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 bg-secondary rounded-md transition-all duration-300 hover:bg-accent/20 cursor-pointer">
                    <span className="p-1.5 rounded-md bg-accent/20 animate-pulse-slow">
                      <Mic className="h-4 w-4 text-accent" />
                    </span>
                    <span>Dashboard</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 transition-all duration-300 hover:bg-white/5 cursor-pointer">
                    <span className="p-1.5 rounded-md bg-gray-800">
                      <Activity className="h-4 w-4" />
                    </span>
                    <span>Record New</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 transition-all duration-300 hover:bg-white/5 cursor-pointer">
                    <span className="p-1.5 rounded-md bg-gray-800">
                      <Calendar className="h-4 w-4" />
                    </span>
                    <span>Schedule</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main content placeholder */}
            <div className="w-full p-6 bg-gradient-to-br from-podmint to-black min-h-[600px] flex flex-col items-center justify-center">
              <div className="w-full max-w-3xl mx-auto">
                <div className="bg-podmint-muted p-6 rounded-lg mb-6 transition-all duration-300 hover:border-accent/30 hover:shadow-lg border border-transparent">
                  <h3 className="text-xl font-bold mb-3">Welcome to Podmint</h3>
                  <p className="text-gray-300">Your podcast recording studio is ready. Start creating amazing content today!</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-podmint-muted p-4 rounded-lg transition-all duration-300 hover:border-accent/30 hover:shadow-lg border border-transparent animate-slide-in-left" style={{ animationDelay: "0.5s" }}>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Recent Episodes</h4>
                      <Button variant="ghost" className="h-8 text-xs hover:bg-accent/20 transition-colors">View All</Button>
                    </div>
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div 
                          key={i} 
                          className="p-2 bg-black/30 rounded flex gap-2 items-center hover:bg-black/50 transition-all duration-300 cursor-pointer"
                          style={{ animationDelay: `${0.2 * i + 0.5}s` }}
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded animate-pulse-slow"></div>
                          <div className="flex-1">
                            <p className="text-sm">Episode {i}</p>
                            <p className="text-xs text-gray-400">Recorded 2d ago</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-podmint-muted p-4 rounded-lg transition-all duration-300 hover:border-accent/30 hover:shadow-lg border border-transparent animate-slide-in-right" style={{ animationDelay: "0.5s" }}>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Upcoming</h4>
                      <Button variant="ghost" className="h-8 text-xs hover:bg-accent/20 transition-colors">Schedule</Button>
                    </div>
                    <div className="space-y-2">
                      {[1, 2].map((i) => (
                        <div 
                          key={i} 
                          className="p-2 bg-black/30 rounded flex gap-2 items-center hover:bg-black/50 transition-all duration-300 cursor-pointer"
                          style={{ animationDelay: `${0.2 * i + 0.5}s` }}
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded animate-pulse-slow"></div>
                          <div className="flex-1">
                            <p className="text-sm">Interview {i}</p>
                            <p className="text-xs text-gray-400">Tomorrow, 2:00 PM</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-y-4 gap-x-8 mt-12 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          {["Spotify", "Apple Podcasts", "Google Podcasts", "Amazon Music", "Stitcher"].map((platform, i) => (
            <div 
              key={platform} 
              className="text-gray-400 text-sm font-medium transition-all duration-300 hover:text-white/70 cursor-pointer"
              style={{ animationDelay: `${0.1 * i + 0.4}s` }}
            >
              {platform}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
