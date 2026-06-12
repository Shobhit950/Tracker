"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Authmodal from "./Authmodal";
import { signOut } from "@/app/actions";

const Authbutton = ({user}) => {
  const [showAuthmodal, setShowAuthmodal] = useState(false);

  if(user) {
    return (
        <form action={signOut}>
            <button variant="ghost" size="sm" type="submit" className="gap-2">
                <logOut className="w-4 h-4" />
                Sign Out
        
            </button>
        </form>
    );
  }

  return (
    <>
      <Button
        onClick={() => setShowAuthmodal(true)}
        variant="default"
        size="sm"
        className="bg-orange-500 hover:bg-orange-600"
      >
        <LogIn className="w-4 h-4 mr-2" />
        Sign In
      </Button>

      <Authmodal
        isOpen={showAuthmodal}
        onClose={() => setShowAuthmodal(false)}
      />
    </>
  );
};

export default Authbutton;