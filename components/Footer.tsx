
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-podmint py-12 px-6 border-t border-white/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="font-bold text-black text-lg">P</span>
              </div>
              <h3 className="text-xl font-bold">Podmint</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              The all-in-one platform for creating professional podcasts with ease.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><Link href="#features" className="text-muted-foreground hover:text-white">Features</Link></li>
                  <li><Link href="#pricing" className="text-muted-foreground hover:text-white">Pricing</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-white">Integrations</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-white">Updates</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-muted-foreground hover:text-white">Blog</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-white">Tutorials</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-white">Support</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-white">Documentation</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-muted-foreground hover:text-white">About</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-white">Careers</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-white">Privacy</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-white">Terms</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Podmint. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-white text-sm">Privacy Policy</Link>
            <Link href="#" className="text-muted-foreground hover:text-white text-sm">Terms of Service</Link>
            <Link href="#" className="text-muted-foreground hover:text-white text-sm">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
