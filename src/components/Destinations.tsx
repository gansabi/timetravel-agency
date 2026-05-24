import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Star } from 'lucide-react'
import DestinationModal from './DestinationModal'

const destinations = [
  {
    id: 1,
    title: 'Paris 1889',
    subtitle: 'La Belle Époque',
    description:
      "Vivez l'effervescence de l'Exposition Universelle, admirez la Tour Eiffel fraîchement construite et plongez dans le Paris artistique de la fin du XIXe siècle.",
    image: '/images/paris.jpeg',
    date: '1889',
    location: 'Paris, France',
    rating: 4.9,
    price: '12 500 €',
    highlights: ['Tour Eiffel', 'Exposition Universelle', 'Moulin Rouge', 'Impressionnisme'],
  },
  {
    id: 2,
    title: 'Crétacé -65M',
    subtitle: 'L\'Ère des Dinosaures',
    description:
      "Observez les créatures les plus majestueuses ayant foulé la Terre. Une expédition unique au cœur de la nature préhistorique, 65 millions d'années avant notre ère.",
    image: '/images/cretace.jpeg',
    date: '-65 000 000',
    location: 'Pangée',
    rating: 4.8,
    price: '18 900 €',
    highlights: ['T-Rex', 'Forêts primaires', 'Volcans actifs', 'Faune préhistorique'],
  },
  {
    id: 3,
    title: 'Florence 1504',
    subtitle: 'La Renaissance Italienne',
    description:
      "Rencontrez Michel-Ange, Léonard de Vinci et les plus grands artistes de l'Histoire. Découvrez Florence à l'apogée de la Renaissance.",
    image: '/images/florence.jpeg',
    date: '1504',
    location: 'Florence, Italie',
    rating: 4.9,
    price: '14 200 €',
    highlights: ['Michel-Ange', 'Léonard de Vinci', 'Duomo', 'Art Renaissance'],
  },
]

export default function Destinations() {
  const [selectedDest, setSelectedDest] = useState<typeof destinations[0] | null>(null)

  return (
    <>
    <section id="destinations" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent font-medium tracking-widest uppercase mb-3">
            Nos destinations
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">
            Choisissez votre époque
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="group bg-slate-800/50 rounded-2xl overflow-hidden border border-white/10 hover:border-accent/50 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="absolute top-4 right-4 bg-accent text-primary px-3 py-1 rounded-full text-sm font-bold">
                  {dest.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-2xl font-bold text-white mb-1">
                  {dest.title}
                </h3>
                <p className="text-accent text-sm font-medium mb-3">{dest.subtitle}</p>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  {dest.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-white/50 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {dest.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {dest.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={12} className="text-accent" /> {dest.rating}
                  </span>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {dest.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded-full text-white/70"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedDest(dest)}
                  className="w-full py-3 bg-accent/10 border border-accent/30 text-accent font-semibold rounded-xl hover:bg-accent hover:text-primary transition-all duration-300"
                >
                  Explorer cette époque
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <DestinationModal destination={selectedDest} onClose={() => setSelectedDest(null)} />
    </>
  )
}
