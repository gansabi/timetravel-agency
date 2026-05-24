import Hero from './components/Hero'
import Destinations from './components/Destinations'
import BookingForm from './components/BookingForm'
import Chatbot from './components/Chatbot'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <Hero />
      <Destinations />
      <BookingForm />
      <Footer />
      <Chatbot />
    </div>
  )
}

export default App
