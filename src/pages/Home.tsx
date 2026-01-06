import HeroHome from '../components/sections/HeroHome'
import ServicesGrid from '../components/sections/ServicesGrid'
import MissionsSection from '../components/sections/MissionsSection'
import ContactSection from '../components/sections/ContactSection'

function Home() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-14 md:py-20">
      <HeroHome />
      <ServicesGrid />
      <MissionsSection />
      <ContactSection />
    </div>
  )
}

export default Home

