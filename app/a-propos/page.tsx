'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Star, Award, Eye, Leaf, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { TestimonialsColumn, type Testimonial } from '@/components/ui/testimonials-columns-1'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/context/LanguageContext'

const PLACEHOLDER_TESTIMONIALS: Testimonial[] = [
  { text: "Des poulets comme on n'en trouve plus ! Chair tendre, goût d'antan. On reviendra chaque semaine.", image: "https://randomuser.me/api/portraits/women/12.jpg", name: "Sophie V.", role: "Cliente fidèle" },
  { text: "La qualité est au rendez-vous chaque semaine. Je recommande vivement la Ferme des Hirondelles !", image: "https://randomuser.me/api/portraits/men/14.jpg", name: "Pierre D.", role: "Client depuis 6 mois" },
  { text: "Enfin une ferme locale où l'on peut faire confiance. Produits frais, traçabilité totale.", image: "https://randomuser.me/api/portraits/women/22.jpg", name: "Marie L.", role: "Cliente de la ferme" },
  { text: "Le colis porc est parfait pour remplir le congélateur. Excellent rapport qualité/prix !", image: "https://randomuser.me/api/portraits/men/33.jpg", name: "François M.", role: "Client de la ferme" },
  { text: "Les légumes sont d'une fraîcheur incomparable. Une adresse à ne plus lâcher, c'est certain.", image: "https://randomuser.me/api/portraits/women/44.jpg", name: "Isabelle B.", role: "Cliente fidèle" },
  { text: "Service impeccable et produits authentiques. Merci pour votre passion et votre dévouement !", image: "https://randomuser.me/api/portraits/men/55.jpg", name: "Thomas R.", role: "Client de la ferme" },
  { text: "Je commande depuis plusieurs mois, jamais déçu. La viande de porc est vraiment d'exception.", image: "https://randomuser.me/api/portraits/women/66.jpg", name: "Julie C.", role: "Cliente depuis 4 mois" },
  { text: "Le système click & collect est super pratique. Et les poulets… un vrai délice !", image: "https://randomuser.me/api/portraits/men/77.jpg", name: "Antoine H.", role: "Client de la ferme" },
  { text: "On sent vraiment la différence avec les produits du supermarché. Bravo et merci !", image: "https://randomuser.me/api/portraits/women/88.jpg", name: "Nathalie P.", role: "Cliente fidèle" },
]

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          className={`h-6 w-6 transition-colors ${i <= (hovered || value) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'} ${onChange ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          onClick={() => onChange?.(i)}
          onMouseEnter={() => onChange && setHovered(i)}
          onMouseLeave={() => onChange && setHovered(0)}
        />
      ))}
    </div>
  )
}

interface SupabaseReview { id: string; name: string; rating: number; comment: string; created_at: string }

function supabaseReviewToTestimonial(r: SupabaseReview): Testimonial {
  return {
    text: r.comment,
    image: `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&background=16a34a&color=fff&size=40`,
    name: r.name,
    role: '⭐'.repeat(r.rating),
  }
}

const VALUES = [
  { icon: Award, labelKey: 'about.qualityLabel', textKey: 'about.qualityText', color: 'bg-green-50 border-green-100', iconColor: 'text-green-700' },
  { icon: Eye, labelKey: 'about.transparencyLabel', textKey: 'about.transparencyText', color: 'bg-amber-50 border-amber-100', iconColor: 'text-amber-700' },
  { icon: Leaf, labelKey: 'about.environmentLabel', textKey: 'about.environmentText', color: 'bg-emerald-50 border-emerald-100', iconColor: 'text-emerald-700' },
]

export default function AboutPage() {
  const { t } = useLanguage()
  const [testimonials, setTestimonials] = useState<Testimonial[]>(PLACEHOLDER_TESTIMONIALS)
  const [name, setName] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const supabase = createClient()
    supabase.from('reviews').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data && data.length > 0) {
        setTestimonials([...data.map(supabaseReviewToTestimonial), ...PLACEHOLDER_TESTIMONIALS])
      }
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!name.trim() || !comment.trim()) return
    setSubmitting(true)
    setError('')
    const supabase = createClient()
    const { data, error: err } = await supabase.from('reviews').insert({ name: name.trim(), rating, comment: comment.trim() }).select().single()
    if (err) {
      setError(t('about.reviewError'))
    } else if (data) {
      setTestimonials(prev => [supabaseReviewToTestimonial(data), ...prev])
      setSubmitted(true)
      setName('')
      setRating(5)
      setComment('')
    }
    setSubmitting(false)
  }

  const firstColumn = testimonials.slice(0, Math.ceil(testimonials.length / 3))
  const secondColumn = testimonials.slice(Math.ceil(testimonials.length / 3), Math.ceil((testimonials.length * 2) / 3))
  const thirdColumn = testimonials.slice(Math.ceil((testimonials.length * 2) / 3))

  return (
    <div className="min-h-screen bg-stone-50">

      {/* Hero — two-column */}
      <section className="bg-white border-b border-stone-100">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-medium px-4 py-1.5 rounded-full border border-green-100">
                <Leaf className="h-3.5 w-3.5" />
                Ferme des Hirondelles · Kraainem
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight">
                {t('about.title')}
              </h1>
              <div className="w-16 h-1 bg-green-600 rounded-full" />
              <p className="text-stone-600 text-lg leading-relaxed">
                {t('about.intro')}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900"
                alt="La Ferme des Hirondelles"
                className="w-full h-[380px] object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-md px-4 py-3 flex items-center gap-3 border border-stone-100">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">🌿</span>
                </div>
                <div>
                  <p className="font-semibold text-stone-800 text-sm">Click &amp; Collect</p>
                  <p className="text-xs text-stone-400">{t('about.pickupHours')}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Photo grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-3 gap-4">
          {[
            { src: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', captionKey: 'about.captionChickens' },
            { src: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', captionKey: 'about.captionCharcuterie' },
            { src: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', captionKey: 'about.captionVeggies' },
          ].map(({ src, captionKey }) => (
            <div key={captionKey} className="space-y-2">
              <img src={src} alt={t(captionKey)} className="w-full h-48 object-cover rounded-xl shadow-md" />
              <p className="text-xs text-center text-stone-500 font-medium">{t(captionKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* History — two-column */}
      <section className="bg-white border-y border-stone-100">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Histoire de la ferme"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="bg-white/90 backdrop-blur-sm text-stone-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                  Kraainem, Belgique
                </span>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              <h2 className="text-3xl font-serif font-bold text-stone-900">{t('about.historyTitle')}</h2>
              <div className="w-12 h-1 bg-green-500 rounded-full" />
              <p className="text-stone-600 leading-relaxed text-lg">{t('about.historyText')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values — icon cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-3xl font-serif font-bold text-stone-900">{t('about.valuesTitle')}</h2>
          <div className="w-12 h-1 bg-green-500 rounded-full mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUES.map(({ icon: Icon, labelKey, textKey, color, iconColor }) => (
            <motion.div
              key={labelKey}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`rounded-2xl border p-6 space-y-3 ${color}`}
            >
              <div className={`w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center`}>
                <Icon className={`h-5 w-5 ${iconColor}`} />
              </div>
              <h3 className="font-semibold text-stone-900 text-lg">{t(labelKey)}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{t(textKey)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Click & Collect — two-column */}
      <section className="bg-[#1a2e17] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              <div className="w-12 h-12 bg-green-700 rounded-xl flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-serif font-bold">{t('about.clickTitle')}</h2>
              <p className="text-stone-300 leading-relaxed text-lg">{t('about.clickText')}</p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { day: 'Vendredi', time: '16h00 – 19h00' },
                  { day: 'Samedi', time: '10h00 – 17h30' },
                ].map(({ day, time }) => (
                  <div key={day} className="bg-white/10 rounded-xl p-4 border border-white/10">
                    <p className="font-semibold text-white">{day}</p>
                    <p className="text-green-300 text-sm">{time}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Click & Collect"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-10 space-y-3"
          >
            <span className="border border-stone-300 text-stone-600 text-sm py-1 px-4 rounded-full inline-block">
              {t('about.testimonialsBadge')}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">{t('about.testimonialsTitle')}</h2>
            <p className="text-stone-500">{t('about.testimonialsSubtitle')}</p>
          </motion.div>
          <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[640px] overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn} duration={18} />
            <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={22} />
            <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={20} />
          </div>
        </div>
      </section>

      {/* Review form */}
      <section className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
          <h3 className="text-xl font-serif font-bold text-stone-900 mb-1">{t('about.reviewTitle')}</h3>
          <p className="text-stone-500 text-sm mb-6">{t('about.reviewSubtitle')}</p>

          {submitted ? (
            <div className="text-center py-6">
              <p className="text-green-700 font-semibold text-lg">{t('about.reviewSuccess')}</p>
              <p className="text-stone-500 text-sm mt-1">{t('about.reviewSuccessDesc')}</p>
              <Button variant="link" className="text-green-600 mt-2" onClick={() => setSubmitted(false)}>
                {t('about.reviewSuccessLink')}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-stone-700 block mb-1">{t('about.reviewName')}</label>
                <Input placeholder="ex. Marie" value={name} onChange={e => setName(e.target.value)} required className="border-stone-300 focus:border-green-500 focus:ring-green-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-stone-700 block mb-2">{t('about.reviewRating')}</label>
                <StarRating value={rating} onChange={setRating} />
              </div>
              <div>
                <label className="text-sm font-medium text-stone-700 block mb-1">{t('about.reviewComment')}</label>
                <Textarea placeholder={t('about.reviewPlaceholder')} value={comment} onChange={e => setComment(e.target.value)} required rows={4} className="border-stone-300 focus:border-green-500 focus:ring-green-500" />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <Button type="submit" disabled={submitting} className="bg-green-700 hover:bg-green-800 text-white">
                {submitting ? t('about.reviewSubmitting') : t('about.reviewSubmit')}
              </Button>
            </form>
          )}
        </div>
      </section>

    </div>
  )
}
