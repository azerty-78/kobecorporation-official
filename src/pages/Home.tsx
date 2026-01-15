import HeroHome from '../components/sections/HeroHome'
import ServicesGrid from '../components/sections/ServicesGrid'
import ProgramsPreview from '../components/sections/ProgramsPreview'
import MissionsSection from '../components/sections/MissionsSection'
import ProcessSection from '../components/sections/ProcessSection'
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

      {/* Process Section */}
      <section>
        <ProcessSection />
      </section>

      {/* Testimonials Section - Masquée temporairement */}
      {/* <section>
        <TestimonialsSection />
      </section> */}

      {/* CTA Section - Plus d'espace avant le footer */}
      <section className="pb-8">
        <CTASection />
      </section>
    </div>
  )
}

export default Home
