import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, MapPin, Star, Shield, Clock, Users } from 'lucide-react'

interface Destination {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  date: string
  location: string
  rating: number
  price: string
  highlights: string[]
}

interface Props {
  destination: Destination | null
  onClose: () => void
}

const details: Record<number, { longDescription: string; includes: string[]; duration: string; groupSize: string }> = {
  1: {
    longDescription:
      "Plongez au cœur de la Belle Époque parisienne ! Assistez à l'inauguration de la Tour Eiffel lors de l'Exposition Universelle de 1889, flânez dans les cafés de Montmartre aux côtés des impressionnistes, et découvrez un Paris en pleine effervescence culturelle et technologique. Votre guide personnel vous fera vivre les moments les plus marquants de cette époque dorée.",
    includes: [
      'Transport temporel aller-retour',
      'Hébergement 4 nuits en hôtel d\'époque',
      'Guide personnel francophone',
      'Accès VIP Exposition Universelle',
      'Dîner au Moulin Rouge',
      'Dispositif de sécurité temporelle',
    ],
    duration: '5 jours / 4 nuits',
    groupSize: '2 à 6 personnes',
  },
  2: {
    longDescription:
      "Une expédition unique au cœur du Crétacé supérieur, 65 millions d'années avant notre ère. Observez des T-Rex, Tricératops et Ptéranodons dans leur habitat naturel depuis notre base sécurisée. Traversez des forêts de fougères géantes, admirez des volcans actifs à distance sûre, et vivez l'aventure la plus extraordinaire de votre vie.",
    includes: [
      'Transport temporel aller-retour',
      'Base camp sécurisée tout confort',
      'Combinaison de protection intégrale',
      'Guide paléontologue certifié',
      'Kit d\'observation longue distance',
      'Assurance temporelle premium',
    ],
    duration: '3 jours / 2 nuits',
    groupSize: '2 à 4 personnes',
  },
  3: {
    longDescription:
      "Vivez la Renaissance italienne à son apogée ! Visitez l'atelier de Michel-Ange alors qu'il sculpte le David, observez Léonard de Vinci travailler sur ses inventions, et admirez le Duomo de Florence dans toute sa splendeur. Une immersion totale dans l'art, la culture et le génie créatif du XVIe siècle italien.",
    includes: [
      'Transport temporel aller-retour',
      'Hébergement 5 nuits en palazzo',
      'Guide historien de l\'art',
      'Visite privée des ateliers d\'artistes',
      'Cours de peinture Renaissance',
      'Banquet médicéen inclus',
    ],
    duration: '6 jours / 5 nuits',
    groupSize: '2 à 8 personnes',
  },
}

export default function DestinationModal({ destination, onClose }: Props) {
  if (!destination) return null
  const detail = details[destination.id]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-900 border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header image */}
          <div className="relative h-64 overflow-hidden rounded-t-2xl">
            <img
              src={destination.image}
              alt={destination.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="absolute bottom-6 left-6">
              <p className="text-accent text-sm font-medium mb-1">{destination.subtitle}</p>
              <h2 className="font-serif text-3xl font-bold text-white">{destination.title}</h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Meta row */}
            <div className="flex flex-wrap gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-accent" /> {destination.date}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-accent" /> {destination.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Star size={14} className="text-accent" /> {destination.rating}/5
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-accent" /> {detail.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <Users size={14} className="text-accent" /> {detail.groupSize}
              </span>
            </div>

            {/* Description */}
            <p className="text-white/70 leading-relaxed">{detail.longDescription}</p>

            {/* Highlights */}
            <div>
              <h3 className="font-semibold text-white mb-3">Points forts</h3>
              <div className="flex flex-wrap gap-2">
                {destination.highlights.map((h) => (
                  <span
                    key={h}
                    className="text-sm bg-accent/10 border border-accent/30 text-accent px-3 py-1 rounded-full"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Includes */}
            <div>
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Shield size={16} className="text-accent" /> Le forfait inclut
              </h3>
              <ul className="grid sm:grid-cols-2 gap-2">
                {detail.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-accent mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div>
                <p className="text-white/50 text-sm">À partir de</p>
                <p className="font-serif text-3xl font-bold text-accent">{destination.price}</p>
                <p className="text-white/40 text-xs">par personne</p>
              </div>
              <button
                onClick={() => {
                  onClose()
                  setTimeout(() => {
                    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
                  }, 100)
                }}
                className="px-8 py-3 bg-accent text-primary font-bold rounded-full hover:bg-accent-light transition-all hover:scale-105"
              >
                Réserver ce voyage
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
