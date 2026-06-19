import { useState } from 'react'

const LABELS = {
  cover:    'Inicio',
  about:    'Sobre mí',
  skills:   'Skills',
  projects: 'Proyectos',
  contact:  'Contacto',
}

export default function ChapterNav({ activePage, onNavigate, pages }) {
  const [hoveredIdx, setHoveredIdx] = useState(null)

  return (
    <nav style={{
      position: 'fixed',
      right: '24px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 30,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '14px',
    }}>
      {pages.map((page, idx) => {
        const isActive = idx === activePage
        const isHovered = idx === hoveredIdx
        return (
          <div key={page} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            {/* Tooltip label */}
            {isHovered && (
              <span style={{
                position: 'absolute',
                right: '20px',
                whiteSpace: 'nowrap',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.1em',
                color: '#AFC3B2',
                background: 'rgba(44,58,46,0.9)',
                padding: '4px 10px',
                borderRadius: '4px',
                pointerEvents: 'none',
              }}>
                {LABELS[page]}
              </span>
            )}

            <button
              onClick={() => onNavigate(idx)}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              aria-label={`Ir a ${LABELS[page]}`}
              style={{
                width: isActive ? '10px' : '8px',
                height: isActive ? '10px' : '8px',
                borderRadius: '50%',
                border: `1.5px solid ${isActive ? '#4F9D5B' : 'rgba(241,237,227,0.35)'}`,
                background: isActive ? '#4F9D5B' : 'transparent',
                boxShadow: isActive ? '0 0 10px rgba(79,157,91,0.7)' : 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s ease',
                flexShrink: 0,
              }}
            />
          </div>
        )
      })}
    </nav>
  )
}
