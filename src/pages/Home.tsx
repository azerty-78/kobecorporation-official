import HeroHome from '../components/sections/HeroHome'
import ServicesGrid from '../components/sections/ServicesGrid'
import ProgramsPreview from '../components/sections/ProgramsPreview'
import MissionsSection from '../components/sections/MissionsSection'
import TechnologiesSection from '../components/sections/TechnologiesSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import CTASection from '../components/sections/CTASection'

function Home() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-20 px-4 py-16 sm:px-6 md:gap-24 md:py-24 lg:px-8">
      {/* Hero Section - Plus d'espace en haut */}
      <section className="pt-4">
        <HeroHome />
      </section>

      {/* Services Section */}
      <section>
        <ServicesGrid />
      </section>

      {/* Programs Section */}
      <section>
        <ProgramsPreview />
      </section>

      {/* Missions Section */}
      <section>
        <MissionsSection />
      </section>

      {/* Technologies Section */}
      <section>
        <TechnologiesSection />
      </section>

      {/* Testimonials Section */}
      <section>
        <TestimonialsSection />
      </section>

      {/* CTA Section - Plus d'espace avant le footer */}
      <section className="pb-8">
        <CTASection />
      </section>
    </div>
  )
}

export default Home
