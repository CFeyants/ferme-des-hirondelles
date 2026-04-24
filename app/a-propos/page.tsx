'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { TestimonialsColumn, type Testimonial } from '@/components/ui/testimonials-columns-1'
import { createClient } from '@/lib/supabase/client'

const PLACEHOLDER_TESTIMONIALS: Testimonial[] = [
  {
    text: "Des poulets comme on n'en trouve plus ! Chair tendre, goût d'antan. On reviendra chaque semaine.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    name: "Sophie V.",
    role: "Cliente fidèle",
  },
  {
    text: "La qualité est au rendez-vous chaque semaine. Je recommande vivement la Ferme des Hirondelles !",
    image: "https://randomuser.me/api/portraits/men/14.jpg",
    name: "Pierre D.",
    role: "Client depuis 6 mois",
  },
  {
    text: "Enfin une ferme locale où l'on peut faire confiance. Produits frais, traçabilité totale.",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    name: "Marie L.",
    role: "Cliente de la ferme",
  },
  {
    text: "Le colis porc est parfait pour remplir le congélateur. Excellent rapport qualité/prix !",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
    name: "François M.",
    role: "Client de la ferme",
  },
  {
    text: "Les légumes sont d'une fraîcheur incomparable. Une adresse à ne plus lâcher, c'est certain.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Isabelle B.",
    role: "Cliente fidèle",
  },
  {
    text: "Service impeccable et produits authentiques. Merci pour votre passion et votre dévouement !",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    name: "Thomas R.",
    role: "Client de la ferme",
  },
  {
    text: "Je commande depuis plusieurs mois, jamais déçu. La viande de porc est vraiment d'exception.",
    image: "https://randomuser.me/api/portraits/women/66.jpg",
    name: "Julie C.",
    role: "Cliente depuis 4 mois",
  },
  {
    text: "Le système click & collect est super pratique. Et les poulets… un vrai délice !",
    image: "https://randomuser.me/api/portraits/men/77.jpg",
    name: "Antoine H.",
    role: "Client de la ferme",
  },
  {
    text: "On sent vraiment la différence avec les produits du supermarché. Bravo et merci !",
    image: "https://randomuser.me/api/portraits/women/88.jpg",
    name: "Nathalie P.",
    role: "Cliente fidèle",
  },
]

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          className={`h-6 w-6 transition-colors ${
            i <= (hovered || value) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
          } ${onChange ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          onClick={() => onChange?.(i)}
          onMouseEnter={() => onChange && setHovered(i)}
          onMouseLeave={() => onChange && setHovered(0)}
        />
      ))}
    </div>
  )
}

interface SupabaseReview {
  id: string
  name: string
  rating: number
  comment: string
  created_at: string
}

function supabaseReviewToTestimonial(r: SupabaseReview): Testimonial {
  return {
    text: r.comment,
    image: `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name)}&background=16a34a&color=fff&size=40`,
    name: r.name,
    role: '⭐'.repeat(r.rating),
  }
}

export default function AboutPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(PLACEHOLDER_TESTIMONIALS)
  const [name, setName] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) {
          const real = data.map(supabaseReviewToTestimonial)
          setTestimonials([...real, ...PLACEHOLDER_TESTIMONIALS])
        }
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!name.trim() || !comment.trim()) return
    setSubmitting(true)
    setError('')
    const supabase = createClient()
    const { data, error: err } = await supabase
      .from('reviews')
      .insert({ name: name.trim(), rating, comment: comment.trim() })
      .select()
      .single()
    if (err) {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } else if (data) {
      const newTestimonial = supabaseReviewToTestimonial(data)
      setTestimonials(prev => [newTestimonial, ...prev])
      setSubmitted(true)
      setName('')
      setRating(5)
      setComment('')
    }
    setSubmitting(false)
  }

  const firstColumn = testimonials.slice(0, Math.ceil(testimonials.length / 3))
  const secondColumn = testimonials.slice(
    Math.ceil(testimonials.length / 3),
    Math.ceil((testimonials.length * 2) / 3)
  )
  const thirdColumn = testimonials.slice(Math.ceil((testimonials.length * 2) / 3))

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-10">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">
            À propos de la Ferme des Hirondelles
          </h1>
          <div className="w-20 h-1 bg-green-600 mx-auto rounded-full" />
        </div>

        {/* Hero photo */}
        <img
          src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
          alt="La Ferme des Hirondelles"
          className="w-full h-[420px] object-cover rounded-2xl shadow-lg"
        />

        {/* Photo grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <img
              src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
              alt="Nos poulets élevés en plein air"
              className="w-full h-48 object-cover rounded-xl shadow-md"
            />
            <p className="text-xs text-center text-stone-500 font-medium">Nos poulets</p>
          </div>
          <div className="space-y-2">
            <img
              src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
              alt="Nos charcuteries artisanales"
              className="w-full h-48 object-cover rounded-xl shadow-md"
            />
            <p className="text-xs text-center text-stone-500 font-medium">Nos charcuteries</p>
          </div>
          <div className="space-y-2">
            <img
              src="https://images.unsplash.com/photo-1518977676601-b53f82aba655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
              alt="Nos légumes de saison"
              className="w-full h-48 object-cover rounded-xl shadow-md"
            />
            <p className="text-xs text-center text-stone-500 font-medium">Nos légumes</p>
          </div>
        </div>

        {/* Text content */}
        <div className="prose prose-stone prose-lg max-w-none">
          <p>
            Bienvenue à la Ferme des Hirondelles, située au cœur de Kraainem. Nous sommes une
            exploitation familiale passionnée par l'agriculture durable et le respect de la nature.
          </p>
          <h3>Notre Histoire</h3>
          <p>
            Depuis plusieurs générations, nous cultivons la terre et élevons nos animaux avec amour.
            Ce qui a commencé comme une petite exploitation est devenu un lieu de rencontre pour tous
            les amateurs de produits frais et locaux : poulets élevés en plein air, porc fermier
            transformé sur place, légumes de saison…
          </p>
          <h3>Nos Valeurs</h3>
          <ul>
            <li>
              <strong>Qualité :</strong> Nous ne vendons que ce que nous produisons ou sélectionnons
              rigoureusement chez nos partenaires locaux.
            </li>
            <li>
              <strong>Transparence :</strong> Vous savez exactement d'où vient ce que vous mangez.
            </li>
            <li>
              <strong>Environnement :</strong> Nous pratiquons une agriculture raisonnée pour
              préserver la biodiversité de notre région.
            </li>
          </ul>
          <h3>Pourquoi le Click &amp; Collect ?</h3>
          <p>
            Pour garantir une fraîcheur absolue et éviter le gaspillage, nous fonctionnons uniquement
            sur commande. Cela nous permet de récolter et de préparer vos colis juste avant votre
            venue, chaque vendredi et samedi.
          </p>
        </div>

        {/* Testimonials section */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-center mb-8 space-y-3"
          >
            <div className="inline-flex justify-center">
              <span className="border border-stone-300 text-stone-600 text-sm py-1 px-4 rounded-full">
                Témoignages
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">
              Ce que disent nos clients
            </h2>
            <p className="text-stone-500">
              Ils font confiance à la Ferme des Hirondelles chaque semaine.
            </p>
          </motion.div>

          <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[640px] overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn} duration={18} />
            <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={22} />
            <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={20} />
          </div>
        </div>

        {/* Review form */}
        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
          <h3 className="text-xl font-serif font-bold text-stone-900 mb-1">Laissez votre avis</h3>
          <p className="text-stone-500 text-sm mb-6">Votre expérience compte pour nous et pour les autres clients.</p>

          {submitted ? (
            <div className="text-center py-6">
              <p className="text-green-700 font-semibold text-lg">Merci pour votre avis !</p>
              <p className="text-stone-500 text-sm mt-1">Votre témoignage nous aide beaucoup.</p>
              <Button variant="link" className="text-green-600 mt-2" onClick={() => setSubmitted(false)}>
                Laisser un autre avis
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-stone-700 block mb-1">Votre prénom</label>
                <Input
                  placeholder="ex. Marie"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="border-stone-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-stone-700 block mb-2">Note</label>
                <StarRating value={rating} onChange={setRating} />
              </div>
              <div>
                <label className="text-sm font-medium text-stone-700 block mb-1">Votre commentaire</label>
                <Textarea
                  placeholder="Partagez votre expérience avec la Ferme des Hirondelles…"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  required
                  rows={4}
                  className="border-stone-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <Button
                type="submit"
                disabled={submitting}
                className="bg-green-700 hover:bg-green-800 text-white"
              >
                {submitting ? 'Envoi en cours…' : 'Envoyer mon avis'}
              </Button>
            </form>
          )}
        </div>

      </div>
    </div>
  )
}
