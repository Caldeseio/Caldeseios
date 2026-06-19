import { useEffect, useRef, useState } from 'react'
import { LangProvider } from './context/LangContext.jsx'
import { useAmbientSeeds } from './hooks/useAmbientSeeds.js'
import NavBar from './components/NavBar.jsx'
import ChapterNav from './components/ChapterNav.jsx'
import Cover from './components/Cover.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'

function MagnetInit() {
  useEffect(() => {
    function attach() {
      document.querySelectorAll('.magnet').forEach(el => {
        if (el._magnetAttached) return
        el._magnetAttached = true
        el.addEventListener('mousemove', (ev) => {
          const r = el.getBoundingClientRect()
          const x = ev.clientX - r.left - r.width / 2
          const y = ev.clientY - r.top - r.height / 2
          el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`
        })
        el.addEventListener('mouseleave', () => { el.style.transform = 'translate(0,0)' })
      })
    }
    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })
    attach()
    return () => observer.disconnect()
  }, [])
  return null
}

const PAGES = ['cover', 'about', 'skills', 'projects', 'contact']

export default function App() {
  const canvasRef = useRef(null)
  const bookRef   = useRef(null)
  const [activePage, setActivePage] = useState(0)

  useAmbientSeeds(canvasRef, bookRef)

  // Track active chapter via IntersectionObserver on the book's scroll container
  useEffect(() => {
    const book = bookRef.current
    if (!book) return
    const pages = book.querySelectorAll('.page')
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const idx = Array.from(pages).indexOf(e.target)
            if (idx >= 0) setActivePage(idx)
          }
        })
      },
      { root: book, threshold: 0.6 }
    )
    pages.forEach(p => io.observe(p))
    return () => io.disconnect()
  }, [])

  // Reveal observer (for .reveal elements within each page)
  useEffect(() => {
    const book = bookRef.current
    if (!book) return

    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      }),
      { root: book, threshold: 0.15 }
    )
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal, .skillbar').forEach(el => io.observe(el))
    }, 200)
    return () => { clearTimeout(timer); io.disconnect() }
  }, [])

  const scrollToPage = (idx) => {
    const book = bookRef.current
    if (!book) return
    book.scrollTo({ top: idx * window.innerHeight, behavior: 'smooth' })
  }

  return (
    <LangProvider>
      <MagnetInit />

      {/* Single ambient Three.js canvas — fixed behind everything */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
          display: 'block',
        }}
      />

      {/* Fixed UI: Nav + Chapter dots */}
      <NavBar activePage={activePage} />
      <ChapterNav activePage={activePage} onNavigate={scrollToPage} pages={PAGES} />

      {/* Snap-scroll book container */}
      <div ref={bookRef} className="book">
        <Cover />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </LangProvider>
  )
}
