import { Hero } from "@/components/sections/home/Hero";
import { Credentials } from "@/components/sections/home/Credentials";
import { Sectors } from "@/components/sections/home/Sectors";
import { Process } from "@/components/sections/home/Process";
import { Studio } from "@/components/sections/home/Studio";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { Showreel } from "@/components/sections/home/Showreel";
import { Journal } from "@/components/sections/home/Journal";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Credentials />
      <Sectors />
      <Process />
      <Studio />
      <Testimonials />
      <Showreel />
       <Journal />
    </main>
  );
}
