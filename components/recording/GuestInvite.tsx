
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Mail, Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type GuestInviteProps = {
  sessionId: string;
  onClose: () => void;
};

const GuestInvite: React.FC<GuestInviteProps> = ({ sessionId, onClose }) => {
  const [email, setEmail] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);
  const { toast } = useToast();
  
  const inviteLink = `https://podmint.app/join/${sessionId}`;
  
  const handleSendInvite = () => {
    if (!email) return;
    
    setIsSending(true);
    // Simulate sending invite
    setTimeout(() => {
      setIsSending(false);
      setEmail("");
      toast({
        title: "Invitation sent!",
        description: `An invitation has been sent to ${email}`,
      });
    }, 1000);
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast({
      title: "Link copied!",
      description: "Invite link has been copied to clipboard.",
    });
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Invite guests</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Send invitation via email</Label>
          <div className="flex gap-2">
            <Input
              id="email"
              placeholder="guest@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={handleSendInvite} disabled={isSending || !email}>
              <Mail className="mr-2 h-4 w-4" />
              Send
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Share invite link</Label>
          <div className="flex items-center gap-2">
            <Input value={inviteLink} readOnly className="text-xs sm:text-sm" />
            <Button variant="outline" size="icon" onClick={handleCopyLink}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button variant="default" onClick={onClose}>Done</Button>
      </CardFooter>
    </Card>
  );
};

export default GuestInvite;
