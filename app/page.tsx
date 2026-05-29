import HeroSection from '@/components/home/HeroSection'
import SeasonalStrip from '@/components/home/SeasonalStrip'
import FeaturedFlowers from '@/components/home/FeaturedFlowers'
import EventsSection from '@/components/home/EventsSection'
import GalleryGrid from '@/components/home/GalleryGrid'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import AtmosphereSection from '@/components/home/AtmosphereSection'
import InquiryBanner from '@/components/home/InquiryBanner'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SeasonalStrip />
      <FeaturedFlowers />
      <AtmosphereSection />
      <EventsSection />
      <GalleryGrid />
      <TestimonialsSection />
      <InquiryBanner />
    </>
  )
}
