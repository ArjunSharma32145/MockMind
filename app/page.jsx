'use client'
import { AVATARS } from "@/lib/data";
import {Badge} from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { GoldTitle, GrayTitle, SectionLabel } from "@/components/reusables";
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import { StarsBackgroundDemo } from "@/components/demo-components-backgrounds-stars";
import Link from "next/link";
import { CodeDemo } from "@/components/demo-components-animate-code";

export default function Home() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-up');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
         <div className="bg-black overflow-x-hidden">
          {/* Hero Section */ }
          <section className="pt-28 sm:pt-32 relative min-h-screen grid grid-cols-1 lg:grid-cols-5 px-4 sm:px-8 pb-20 overflow-hidden">
            <StarsBackgroundDemo/>
            <div className="col-span-full lg:col-span-3 flex flex-col iteams-center justify-center text-center lg:-rotate-2">
              <Badge>Powered by AI - made by arjun</Badge>
              <h1 className="font-serif relative text-5xl sm:text-6xl lg:text-7xl tracking-tighter max-w-4xl">
                <GrayTitle>
                  MockBird: Your AI Interview Companion
                </GrayTitle>
                  <br />
                <GoldTitle>
                  Ace Your Interviews with Confidence
                </GoldTitle>
              </h1>
              <p className="relative text-sm sm:text-base md:text-lg text-stone-400 max-w-xl mt-6 leading-relaxed">
             Book 1:1 mock interviews with senior engineers from FAANGM++ and get personalized feedback to boost your confidence and land your dream job!
              </p>

              <div className="relative flex justify-center gap-2 sm:gap-4 mt-10 sm:w-auto">
                <Link href="/onboarding">
                  <Button size="hero" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-4 text-base">Get Started</Button>
                </Link>

                <Link href="/explore">
                <Button variant="outline" size="hero" className="px-6 py-4 text-base backdrop-blur-sm bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Browse Interviewers</Button></Link>
              </div>

              <div className= "relative flex items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-16">
                <div className="flex">
                  {AVATARS.map((av,i) =>
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white/20 overflow-hidden">
                   <Image src={av.src} alt="user avatar" width={32} height={32}
                   className = "w-full h-full object-cover"/>
                    </div>
                  )};
                </div>

                  <p className= "text-sm text-stone-500 text-center sm:text-left">
                    <strong className="text-stone-400 font-medium">
                      Trusted by 1000+ engineers and interviewers worldwide
                    </strong>{" "}
                    Cracked FAANG interviews via MockBird
                  </p>
              
              </div>
            </div>
          <div className="col-span-full lg:col-span-2 flex items-center justify-center lg:justify-start mt-12 lg:mt-0 lg:rotate-3">
            <CodeDemo duration={10000} delay={1000} writing cursor />
          </div>
        </section>
         </div>
  );
}
