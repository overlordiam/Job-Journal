import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import Image from "next/image";
import Logo from "@/assets/logo.svg";
import LandingImg from "@/assets/main.svg";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <header className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
        <Image src={Logo} alt="Logo"/>
      </header>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid
      lg:grid-cols-[1fr,400px] items-center">
        <div>
          <h1 className="capitalize text-bold text-4xl md:text-7xl">Job <span 
          className="text-primary">Tracking</span> app</h1>
          <p className="max-w-md mt-4 leading-loose">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam doloremque omnis sunt velit ea dolores quibusdam sit rerum? Quae ut expedita rerum? Unde blanditiis inventore ipsam harum cupiditate? Quae, nam.
          </p>
          <Button asChild className="mt-4">
            <Link href="/add-job">Get Started</Link>
          </Button>
        </div>
        <Image src={LandingImg} alt="Landing image" className="hidden lg:block"/>
      </div>
    </main>
  );
}
