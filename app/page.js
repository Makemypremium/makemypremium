import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";
import logo from "@/public/logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className="flex min-h-screen relative p-24 bg-cover bg-bottom"
      style={{
        backgroundImage: "url(/bgcover.jpg)",
      }}
    >
      <div className="text-center mx-auto">
        <div className="w-72 h-72 relative invert mx-auto">
          <Image src={logo} alt="Make my Premium" fill />
        </div>
        <div className="text-lg">
          Your Gateway to Unlimited Entertainment!
          <p className="text-gray-500">
            Please sign up to explore most of our features
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button asChild>
            <Link href={"/signin"}>Sign In</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={"/signup"}>Sign Up</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
