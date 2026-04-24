'use client'

import { HeroSection } from '@/components/home/HeroSection'
import { HowItWorksSection } from '@/components/home/HowItWorksSection'
import { ProductsSection } from '@/components/home/ProductsSection'
import { ValuesSection } from '@/components/home/ValuesSection'
import { RecipesSection } from '@/components/home/RecipesSection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { OrderCountdown } from '@/components/shop/OrderCountdown'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <div className="container mx-auto px-4 py-6">
        <OrderCountdown />
      </div>
      <HowItWorksSection />
      <ProductsSection />
      <ValuesSection />
      <RecipesSection />
      <TestimonialsSection />
    </div>
  )
}
