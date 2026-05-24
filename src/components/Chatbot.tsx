import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
}

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
Ton rôle : conseiller les clients sur les meilleures destinations temporelles.

RÈGLE ABSOLUE : Tu ne proposes QUE ces 3 destinations. Tu n'inventes JAMAIS d'autres destinations, époques ou lieux. Si le client demande autre chose, tu le rediriges vers une de ces 3 options.

Ton ton :
- Professionnel mais chaleureux
- Passionné d'histoire
- Enthousiaste sans être trop familier

Les 3 SEULES destinations disponibles :

1. Paris 1889 (Belle Époque) - 12 500€/personne - 5 jours/4 nuits
   - Tour Eiffel fraîchement construite
   - Exposition Universelle
   - Moulin Rouge, cafés de Montmartre
   - Mouvement impressionniste
   - Climat : tempéré, frais en automne

2. Crétacé -65M (Ère des Dinosaures) - 18 900€/personne - 3 jours/2 nuits
   - T-Rex, Tricératops, Ptéranodons
   - Forêts primaires, volcans actifs
   - Base camp ultra-sécurisée
   - Climat : tropical, très chaud
   - Idéal pour familles et aventuriers

3. Florence 1504 (Renaissance) - 14 200€/personne - 6 jours/5 nuits
   - Michel-Ange sculptant le David
   - Atelier de Léonard de Vinci
   - Duomo, jardins des Médicis
   - Cours de peinture, banquets
   - Climat : méditerranéen, ensoleillé

Règles strictes :
- Réponds en français, 2-3 phrases max
- Ne propose JAMAIS d'autre destination que ces 3
- Si le client demande une destination qui n'existe pas → dis que tu n'as que ces 3 options et aide-le à choisir parmi elles
- Pour réserver : dirige vers le formulaire sur le site
- N'utilise pas de markdown (pas de ** ni de - pour les listes)
- Reste concis et naturel`

// Clé API Mistral
const MISTRAL_API_KEY = import.meta.env.VITE_MISTRAL_API_KEY || 'd59EdvO6PVuh8tmRpXbYy3CZiZoqFxmq'

async function callMistralAPI(messages: { role: string; content: string }[]): Promise<string> {
  if (!MISTRAL_API_KEY) {
    return fallbackResponse(messages[messages.length - 1]?.content || '')
  }

  try {
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      console.error('Mistral API error:', response.status)
      return fallbackResponse(messages[messages.length - 1]?.content || '')
    }

    const data = await response.json()
    return data.choices[0]?.message?.content || fallbackResponse('')
  } catch (error) {
    console.error('Mistral API error:', error)
    return fallbackResponse(messages[messages.length - 1]?.content || '')
  }
}

// Fallback si pas de clé API ou erreur
function fallbackResponse(message: string): string {
  const lower = message.toLowerCase().trim()

  const keywords: { words: string[]; response: string }[] = [
    { words: ['bonjour', 'salut', 'hello', 'hey', 'coucou', 'bonsoir'], response: "Bonjour ! Bienvenue chez TimeTravel Agency 🕰️ Je suis votre guide temporel. Comment puis-je vous aider ?" },
    { words: ['au revoir', 'bye', 'à bientôt', 'ciao', 'adieu'], response: "Merci pour votre visite ! 🕰️ Bon voyage temporel !" },
    { words: ['merci', 'thanks', 'cool', 'super', 'parfait'], response: "Avec plaisir ! 😊 N'hésitez pas si vous avez d'autres questions." },
    { words: ['paris', 'tour eiffel', '1889', 'montmartre'], response: "Paris 1889 🗼 La Tour Eiffel, l'Exposition Universelle, les cafés de Montmartre. Forfait à partir de 12 500€." },
    { words: ['crétacé', 'cretace', 'dinosaure', 'dino', 't-rex'], response: "Le Crétacé 🦕 T-Rex, forêts primaires, volcans. L'aventure ultime ! Forfait à partir de 18 900€." },
    { words: ['florence', 'renaissance', 'michel-ange', 'vinci', '1504'], response: "Florence 1504 🎨 Michel-Ange, Léonard de Vinci, le Duomo. Forfait à partir de 14 200€." },
    { words: ['prix', 'tarif', 'combien', 'budget', 'cher'], response: "Paris 1889 : 12 500€, Florence 1504 : 14 200€, Crétacé : 18 900€. Tout inclus !" },
    { words: ['réserver', 'reserver', 'reservation'], response: "Utilisez notre formulaire de réservation plus bas sur le site !" },
    { words: ['sécurité', 'securite', 'danger', 'risque'], response: "Chaque voyageur a un dispositif de retour instantané et un guide certifié. Sécurité maximale !" },
    { words: ['soleil', 'chaud', 'chaleur'], response: "Florence 1504 ☀️ offre un climat méditerranéen magnifique. Le Crétacé est tropical !" },
    { words: ['froid', 'frais', 'hiver'], response: "Paris 1889 en automne 🍂 est magnifique avec ses brumes et cafés chaleureux." },
    { words: ['aventure', 'nature', 'animal'], response: "Le Crétacé 🌿 65 millions d'années de nature sauvage !" },
    { words: ['art', 'culture', 'musée', 'peinture'], response: "Florence 1504 🎨 est le paradis des amateurs d'art et de culture !" },
    { words: ['famille', 'enfant', 'enfants'], response: "Le Crétacé 🦕 est un rêve pour les enfants ! Base ultra-sécurisée." },
    { words: ['romantique', 'couple', 'amour'], response: "Paris 1889 💕 est parfait pour un voyage romantique !" },
  ]

  for (const entry of keywords) {
    if (entry.words.some(w => lower.includes(w))) {
      return entry.response
    }
  }

  return "Je suis votre guide TimeTravel Agency ! Demandez-moi des infos sur Paris 1889 🗼, le Crétacé 🦕 ou Florence 1504 🎨."
}

// Formater le texte markdown basique en HTML
function formatMessage(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n- /g, '<br>• ')
    .replace(/\n/g, '<br>')
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour ! 🕰️ Je suis votre assistant TimeTravel Agency, propulsé par l'IA. Comment puis-je vous aider à planifier votre voyage temporel ?",
      sender: 'bot',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userText = input
    const userMsg: Message = { id: Date.now(), text: userText, sender: 'user' }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    // Ajouter au historique pour contexte
    const newHistory = [...chatHistory, { role: 'user', content: userText }]
    setChatHistory(newHistory)

    // Appeler Mistral AI
    const botResponse = await callMistralAPI(newHistory)

    // Ajouter la réponse au historique
    setChatHistory([...newHistory, { role: 'assistant', content: botResponse }])

    const botMsg: Message = { id: Date.now() + 1, text: botResponse, sender: 'bot' }
    setMessages((prev) => [...prev, botMsg])
    setIsLoading(false)
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-shadow"
      >
        {isOpen ? <X size={24} className="text-primary" /> : <MessageCircle size={24} className="text-primary" />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] bg-slate-900 border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="bg-slate-800 px-5 py-4 border-b border-white/10">
              <h3 className="font-serif text-lg font-bold text-white">Assistant TimeTravel</h3>
              <p className="text-xs text-white/50">
                {MISTRAL_API_KEY ? '🟢 Propulsé par Mistral AI' : '🟡 Mode hors-ligne (ajoutez VITE_MISTRAL_API_KEY)'}
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-accent text-primary rounded-br-md'
                        : 'bg-slate-800 text-white/90 rounded-bl-md'
                    }`}
                    dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                  />
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 px-4 py-2.5 rounded-2xl rounded-bl-md">
                    <Loader2 size={16} className="text-accent animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Posez votre question..."
                  disabled={isLoading}
                  className="flex-1 bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-accent/50 disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center hover:bg-accent-light transition-colors disabled:opacity-50"
                >
                  <Send size={16} className="text-primary" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
