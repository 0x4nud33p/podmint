"use client";

import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Podcast Host, The Creative Mind",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    content: "Podmint has transformed how I create my podcast. The audio quality is incredible, and the separate track recording makes editing so much easier. I've been able to grow my audience significantly since switching.",
    stars: 5
  },
  {
    name: "Michael Chen",
    role: "Producer, Tech Today Show",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    content: "As a producer working with multiple hosts and guests, Podmint's multi-track recording and easy scheduling features have been a game changer. The quality is studio-level, and the interface is so intuitive.",
    stars: 5
  },
  {
    name: "Emma Rodriguez",
    role: "Independent Creator",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    content: "I started my podcast as a complete beginner, and Podmint made it so easy to get professional results from day one. The customer support team has been incredible whenever I've had questions.",
    stars: 5
  },
  {
    name: "David Wilson",
    role: "Business Podcast Host",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    content: "The sound quality and ease of use with Podmint has helped me attract high-profile guests. The scheduling feature saves me hours of back-and-forth emails every week.",
    stars: 5
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 px-6 bg-gradient-to-b from-podmint/50 to-podmint overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by <span className="text-gradient">Creators</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of podcasters who are creating amazing content with Podmint.
          </p>
        </div>

        {/* Mobile View (Stack) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto lg:hidden">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <Card
              key={index}
              className="bg-podmint border border-white/10 p-6 hover-glow hover-lift transition-all animate-fade-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <img src={testimonial.image} alt={testimonial.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {Array(testimonial.stars).fill(0).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-accent fill-accent animate-pulse-slow" style={{ animationDelay: `${0.2 * i}s` }} />
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground">{testimonial.content}</p>
            </Card>
          ))}
        </div>
        
        {/* Desktop View (Carousel) */}
        <div className="hidden lg:block max-w-5xl mx-auto animate-fade-up">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-podmint border border-white/10 p-6 hover-glow hover-lift transition-all h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden">
                        <img src={testimonial.image} alt={testimonial.name} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-bold">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex mb-3">
                      {Array(testimonial.stars).fill(0).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                      ))}
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{testimonial.content}</p>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 bg-black/50 border-white/10 text-white hover:bg-black/70" />
            <CarouselNext className="right-0 bg-black/50 border-white/10 text-white hover:bg-black/70" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
