import { useLang } from '../context/LangContext.jsx'

const stats = [
  { value: '10+', key: 'stats.projects' },
  { value: '2+',  key: 'stats.experience' },
  { value: '11+', key: 'stats.tech' },
  { value: '100%', key: 'stats.dedication' },
]

export default function Cover() {
  const { t } = useLang()

  return (
    <section className="page" id="cover" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Botanical illustration — renders when image exists, hidden otherwise */}
      <img
        src="/images/botanical.svg"
        alt=""
        aria-hidden="true"
        onError={e => { e.target.style.display = 'none' }}
        style={{
          position: 'absolute',
          right: '8%',
          top: '50%',
          transform: 'translateY(-48%)',
          width: 'clamp(220px, 28vw, 400px)',
          opacity: 0.7,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Content — centered left-ish */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 clamp(28px, 8vw, 100px)',
        maxWidth: '860px',
      }}>
        {/* Brand label */}
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          letterSpacing: '0.3em',
          color: '#AFC3B2',
          marginBottom: '32px',
          display: 'block',
        }}>
          CALDESEIO
        </span>

        {/* Availability badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <span style={{
            width: '8px', height: '8px',
            borderRadius: '50%',
            background: '#4F9D5B',
            animation: 'floaty 3s ease-in-out infinite',
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            letterSpacing: '0.16em',
            color: '#6FB877',
          }}>
            {t('hero.badge')}
          </span>
        </div>

        {/* Name — big book cover typography */}
        <h1 style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(64px, 11vw, 140px)',
          lineHeight: 0.88,
          letterSpacing: '-0.04em',
          margin: 0,
        }}>
          Luis<br />
          Calderón<br />
          <span style={{ color: '#4F9D5B' }}>Jiménez</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 'clamp(13px, 1.6vw, 18px)',
          letterSpacing: '0.08em',
          color: '#9DB09F',
          margin: '28px 0 0',
        }}>
          {t('hero.subtitle')}
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '14px', marginTop: '36px', flexWrap: 'wrap' }}>
          <a href="#projects" className="magnet" style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '13px',
            fontWeight: 600,
            padding: '13px 24px',
            background: '#F1EDE3',
            color: '#1B2B1E',
            borderRadius: '999px',
            letterSpacing: '0.02em',
          }}>
            {t('hero.btn.primary')}
          </a>
          <a href="#contact" className="magnet" style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '13px',
            fontWeight: 600,
            padding: '13px 24px',
            border: '1px solid rgba(241,237,227,0.28)',
            borderRadius: '999px',
            letterSpacing: '0.02em',
          }}>
            {t('hero.btn.secondary')}
          </a>
        </div>
      </div>

      {/* Stats strip — bottom of cover page */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        borderTop: '1px solid rgba(241,237,227,0.10)',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
      }}>
        {stats.map(({ value, key }, i) => (
          <div key={key} style={{
            padding: '20px 28px',
            borderRight: i < 3 ? '1px solid rgba(241,237,227,0.10)' : 'none',
          }}>
            <p style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
              fontSize: '28px',
              lineHeight: 1,
              margin: 0,
              color: '#4F9D5B',
            }}>
              {value}
            </p>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.1em',
              color: '#7E907F',
              margin: '6px 0 0',
            }}>
              {t(key)}
            </p>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute',
        bottom: '80px',
        right: '40px',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '11px',
        letterSpacing: '0.22em',
        color: '#7E907F',
        animation: 'pulse-scroll 2s ease-in-out infinite',
        writingMode: 'vertical-lr',
        textOrientation: 'mixed',
        zIndex: 2,
      }}>
        SCROLL ↓
      </div>
    </section>
  )
}
