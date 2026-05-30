import Head from 'next/head'
import { Home, ShieldCheck, Clock, Sparkles, Video } from 'lucide-react'
import Header from '../components/Header'
import BookingForm from '../components/BookingForm'
import Sidebar from '../components/Sidebar'
import FAQ from '../components/FAQ'
import SiteLinks from '../components/SiteLinks'
import Footer from '../components/Footer'

const HERO_IMG = 'https://waypointdentistry.com/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-22-at-00.50.01.jpeg'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Book a Visit — Waypoint Dentistry</title>
        <meta name="description" content="Request an in-home or virtual dental consultation from Waypoint Dentistry. Serving Maryland." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="https://waypointdentistry.com/wp-content/uploads/2026/03/waypoint-logo.png" />
      </Head>

      <Header />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg">
          <img src={HERO_IMG} alt="Waypoint Dentistry in-home dental care" loading="eager" />
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={11} /> New Patient Intake
          </div>
          <h1>Dental Care,<br /><em>Where You Are</em></h1>
          <p className="hero-desc">
            Tell us about yourself and what you need. Our team will follow up
            within 24 hours to confirm your appointment.
          </p>
          <div className="hero-trust">
            <div className="trust-chip"><Home size={13} /> In-home visits</div>
            <div className="trust-chip"><Video size={13} /> Virtual Consult</div>
            <div className="trust-chip"><ShieldCheck size={13} /> Secure &amp; private</div>
            <div className="trust-chip"><Clock size={13} /> Flexible scheduling</div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <main className="main-wrap">
        <div className="lift-card">
          <div className="content-grid">
            <BookingForm />
            <Sidebar />
          </div>
        </div>
      </main>

      <FAQ />
      <SiteLinks />
      <Footer />
    </>
  )
}
