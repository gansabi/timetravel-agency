import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-900/50 border-t border-white/10 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-12"
        >
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-accent mb-4">TimeTravel Agency</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Votre agence de voyage temporel de luxe. Explorez les époques les plus fascinantes
              de l'Histoire avec style et sécurité.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#hero" className="hover:text-accent transition-colors">Accueil</a></li>
              <li><a href="#destinations" className="hover:text-accent transition-colors">Destinations</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">À propos</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>📧 contact@timetravel-agency.com</li>
              <li>📞 +33 1 23 45 67 89</li>
              <li>📍 42 Rue du Temps, 75001 Paris</li>
            </ul>
          </div>
        </motion.div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/40">
          <p>© 2025 TimeTravel Agency — Projet pédagogique M1/M2 Digital & IA</p>
        </div>
      </div>
    </footer>
  )
}
