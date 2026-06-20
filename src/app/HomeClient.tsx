"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

import HeroSection from "@/components/home/HeroSection"
import InfoBar from "@/components/home/InfoBar"
import WelcomeSection from "@/components/home/WelcomeSection"
import ServicesSection from "@/components/home/ServicesSection"
import RoomsSection from "@/components/home/RoomsSection"
import RestaurantSection from "@/components/home/RestaurantSection"
import EventsSection from "@/components/home/EventsSection"
import ReviewsSection from "@/components/home/ReviewsSection"

export default function HomeClient() {
  return (
    <div className="bg-[#f5f1ea] text-[#2f241d]">

      <Navbar />

    <HeroSection />
    <InfoBar />
    <WelcomeSection />
    <ServicesSection />
    <RoomsSection />
    <RestaurantSection />
    <EventsSection />
    <ReviewsSection />

      <Footer />

    </div>
  )
}