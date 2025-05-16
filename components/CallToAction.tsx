
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 px-6 overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-gradient-to-br from-accent/20 to-transparent border border-accent/30 rounded-2xl p-8 md:p-12 relative animate-fade-up">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/5 to-transparent opacity-70 animate-pulse-slow"></div>
          
          {/* Background animated elements */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
          
          <div className="relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">
                Ready to Start Your Podcast Journey?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
                Join thousands of creators who trust Podmint for their podcast production.
                Start for free today.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <Button 
                size="lg" 
                className="bg-accent text-white hover:bg-accent/90 hover-glow hover-scale btn-transition animate-pulse-glow w-full md:w-auto"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 hover:bg-white/5 btn-transition hover-lift w-full md:w-auto"
              >
                Schedule a Demo
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
              {["No credit card required", "14-day free trial on Pro", "Cancel anytime"].map((item, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-2 animate-fade-up" 
                  style={{ animationDelay: `${0.1 * i + 0.3}s` }}
                >
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
