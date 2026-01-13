import HeroHome from '../components/sections/HeroHome'
import ServicesGrid from '../components/sections/ServicesGrid'
import ProgramsPreview from '../components/sections/ProgramsPreview'
import MissionsSection from '../components/sections/MissionsSection'
import CTASection from '../components/sections/CTASection'

function Home() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-16 px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <HeroHome />
      <ServicesGrid />
      <ProgramsPreview />
      <MissionsSection />
      <CTASection />
    </div>
  )
}

export default Home
