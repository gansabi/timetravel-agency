import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-primary/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-serif text-2xl font-bold text-accent">
          TimeTravel Agency
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#hero" className="text-white/80 hover:text-accent transition-colors">Accueil</a>
          <a href="#destinations" className="text-white/80 hover:text-accent transition-colors">Destinations</a>
          <a href="#booking" className="text-white/80 hover:text-accent transition-colors">Réserver</a>
          <a href="#contact" className="text-white/80 hover:text-accent transition-colors">Contact</a>
          <a
            href="#booking"
            className="px-5 py-2 bg-accent text-primary font-semibold rounded-full hover:bg-accent-light transition-colors"
          >
            Réserver
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-primary/95 backdrop-blur-md border-t border-white/10 px-6 py-4 flex flex-col gap-4"
        >
          <a href="#hero" className="text-white/80 hover:text-accent" onClick={() => setIsOpen(false)}>Accueil</a>
          <a href="#destinations" className="text-white/80 hover:text-accent" onClick={() => setIsOpen(false)}>Destinations</a>
          <a href="#contact" className="text-white/80 hover:text-accent" onClick={() => setIsOpen(false)}>Contact</a>
        </motion.div>
      )}
    </motion.nav>
  )
}
