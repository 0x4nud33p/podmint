
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "Up to 2 hours of recording per month",
      "2 participants per recording",
      "720p video quality",
      "Basic audio editing tools",
      "Standard support"
    ],
    highlighted: false,
    buttonText: "Start for Free"
  },
  {
    name: "Pro",
    price: "$15",
    description: "Everything you need for a professional podcast",
    features: [
      "Unlimited recording hours",
      "Up to 4 participants per recording",
      "1080p video quality",
      "Advanced audio processing",
      "Separate audio tracks",
      "Priority support",
      "Brand customization"
    ],
    highlighted: true,
    buttonText: "Get Pro"
  },
  {
    name: "Business",
    price: "$39",
    description: "For teams and professional studios",
    features: [
      "Unlimited everything",
      "Up to 8 participants",
      "4K video recording",
      "Advanced editing suite",
      "Team collaboration",
      "API access",
      "Dedicated account manager",
      "Custom integrations"
    ],
    highlighted: false,
    buttonText: "Contact Sales"
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 px-6 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, <span className="text-gradient">Transparent</span> Pricing</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your podcasting needs. All plans include our core recording technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`border rounded-xl p-6 ${
                plan.highlighted ? 
                'border-accent bg-gradient-to-b from-accent/20 to-transparent animate-pulse-glow' : 
                'border-white/10 bg-podmint hover:border-white/30'
              } transition-all relative overflow-hidden animate-fade-up hover-lift`}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0">
                  <div className="bg-accent text-white text-xs py-1 px-3 rotate-45 transform translate-x-6 -translate-y-1">
                    Popular
                  </div>
                </div>
              )}
              
              {/* Add a subtle animated gradient background for the highlighted plan */}
              {plan.highlighted && (
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/10 via-accent/5 to-transparent animate-pulse-slow"></div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 animate-fade-up" style={{ animationDelay: `${0.05 * i + 0.2}s` }}>
                    <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full btn-transition hover-scale ${
                  plan.highlighted ? 
                  'bg-accent hover:bg-accent/90 text-white' : 
                  'bg-secondary hover:bg-secondary/80'
                }`}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
