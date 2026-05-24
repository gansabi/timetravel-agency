import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, MapPin, CheckCircle, AlertCircle } from 'lucide-react'

const destinations = [
  { id: 'paris', label: 'Paris 1889 — La Belle Époque', price: 12500 },
  { id: 'cretace', label: 'Crétacé -65M — L\'Ère des Dinosaures', price: 18900 },
  { id: 'florence', label: 'Florence 1504 — La Renaissance', price: 14200 },
]

interface FormErrors {
  name?: string
  email?: string
  destination?: string
  date?: string
  travelers?: string
}

export default function BookingForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    destination: '',
    date: '',
    travelers: '2',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!form.name.trim()) newErrors.name = 'Le nom est requis'
    if (!form.email.trim()) {
      newErrors.email = 'L\'email est requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Email invalide'
    }
    if (!form.destination) newErrors.destination = 'Choisissez une destination'
    if (!form.date) {
      newErrors.date = 'La date est requise'
    } else {
      const selected = new Date(form.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selected <= today) newErrors.date = 'La date doit être dans le futur'
    }
    const travelers = parseInt(form.travelers)
    if (isNaN(travelers) || travelers < 1 || travelers > 8) {
      newErrors.travelers = 'Entre 1 et 8 voyageurs'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      setSubmitted(true)
    }
  }

  const selectedDest = destinations.find((d) => d.id === form.destination)
  const totalPrice = selectedDest ? selectedDest.price * parseInt(form.travelers || '1') : 0

  if (submitted) {
    return (
      <section id="booking" className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center bg-slate-800/50 border border-accent/30 rounded-2xl p-12"
        >
          <CheckCircle size={64} className="text-accent mx-auto mb-6" />
          <h2 className="font-serif text-3xl font-bold text-white mb-4">Réservation confirmée !</h2>
          <p className="text-white/70 mb-2">
            Merci <span className="text-accent font-semibold">{form.name}</span>, votre demande de voyage vers{' '}
            <span className="text-accent font-semibold">{selectedDest?.label}</span> a bien été enregistrée.
          </p>
          <p className="text-white/50 text-sm mb-6">
            Un email de confirmation sera envoyé à {form.email}
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm({ name: '', email: '', destination: '', date: '', travelers: '2', message: '' }) }}
            className="px-6 py-3 bg-accent/10 border border-accent/30 text-accent font-semibold rounded-xl hover:bg-accent hover:text-primary transition-all"
          >
            Nouvelle réservation
          </button>
        </motion.div>
      </section>
    )
  }

  return (
    <section id="booking" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-accent font-medium tracking-widest uppercase mb-3">Réservation</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">
            Planifiez votre voyage
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-slate-800/50 border border-white/10 rounded-2xl p-8 space-y-6"
        >
          {/* Name + Email */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Nom complet</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Jean Dupont"
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 transition-colors"
              />
              {errors.name && <p className="mt-1 text-sm text-red-400 flex items-center gap-1"><AlertCircle size={12} />{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="jean@exemple.com"
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 transition-colors"
              />
              {errors.email && <p className="mt-1 text-sm text-red-400 flex items-center gap-1"><AlertCircle size={12} />{errors.email}</p>}
            </div>
          </div>

          {/* Destination */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2 flex items-center gap-2">
              <MapPin size={14} className="text-accent" /> Destination
            </label>
            <select
              value={form.destination}
              onChange={(e) => setForm({ ...form, destination: e.target.value })}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 transition-colors appearance-none"
            >
              <option value="">— Choisissez votre destination —</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label} — {d.price.toLocaleString('fr-FR')} €/pers.
                </option>
              ))}
            </select>
            {errors.destination && <p className="mt-1 text-sm text-red-400 flex items-center gap-1"><AlertCircle size={12} />{errors.destination}</p>}
          </div>

          {/* Date + Travelers */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2 flex items-center gap-2">
                <Calendar size={14} className="text-accent" /> Date de départ
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 transition-colors"
              />
              {errors.date && <p className="mt-1 text-sm text-red-400 flex items-center gap-1"><AlertCircle size={12} />{errors.date}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2 flex items-center gap-2">
                <Users size={14} className="text-accent" /> Nombre de voyageurs
              </label>
              <input
                type="number"
                min="1"
                max="8"
                value={form.travelers}
                onChange={(e) => setForm({ ...form, travelers: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent/50 transition-colors"
              />
              {errors.travelers && <p className="mt-1 text-sm text-red-400 flex items-center gap-1"><AlertCircle size={12} />{errors.travelers}</p>}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Message (optionnel)</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Des demandes particulières pour votre voyage ?"
              rows={3}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 transition-colors resize-none"
            />
          </div>

          {/* Price summary + Submit */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div>
              {selectedDest && (
                <div className="text-center sm:text-left">
                  <p className="text-white/50 text-sm">Total estimé</p>
                  <p className="font-serif text-2xl font-bold text-accent">
                    {totalPrice.toLocaleString('fr-FR')} €
                  </p>
                  <p className="text-white/40 text-xs">{form.travelers} voyageur(s) × {selectedDest.price.toLocaleString('fr-FR')} €</p>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-accent text-primary font-bold rounded-full hover:bg-accent-light transition-all hover:scale-105"
            >
              Confirmer la réservation
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  )
}
