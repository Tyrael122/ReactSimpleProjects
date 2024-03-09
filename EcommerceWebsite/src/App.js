import { useEffect, useState } from "react";

import TopBar from "./TopBar";
import HeroSection from "./HeroSection";

export default function App() {
  return <HomePage />;
}

function HomePage() {
  return (
    <div>
      <TopBar />

      <HeroSection />

      <img src="./assets/brands-logos.png" />

      <NewArrivals />
    </div>
  )
}

function NewArrivals() {
  return (
    <div className="flex flex-col w-full mt-16">
      <b className="text-3xl self-center mb-10">NEW ARRIVALS</b>

      <div className="flex mx-20">
        <ProductCard image="./assets/tshirt.png" description="T-shirt with Tape Details" price="$120" />
      </div>
    </div>
  )
}

function ProductCard({ image, description, price }) {
  return (
    <div className="flex flex-col">
      <div className="bg-[#F0EEED] mb-3">
        <img src={image} width="295" height="300" />
      </div>

      <b className="text-lg">{description}</b>
      <b className="text-xl">{price}</b>
    </div>
  );
}
