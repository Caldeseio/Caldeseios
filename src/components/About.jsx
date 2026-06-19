import { useLang } from '../context/LangContext.jsx'

export default function About() {
  const { t } = useLang()
  const tags = ['about.tag1', 'about.tag2', 'about.tag3', 'about.tag4']

  return (
    <section className="page" id="about" style={{ display: 'flex', alignItems: 'center' }}>
      {/* Chapter watermark number */}
      <span style={{
        position: 'absolute',
        right: '40px',
        bottom: '20px',
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontWeight: 700,
        fontSize: 'clamp(120px, 20vw, 240px)',
        lineHeight: 1,
        color: '#F1EDE3',
        opacity: 0.03,
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 0,
      }}>
        01
      </span>

      {/* Content panel */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1180px',
        margin: '0 auto',
        width: '100%',
        padding: '0 clamp(28px, 6vw, 80px)',
        display: 'grid',
        gridTemplateColumns: '0.85fr 1.15fr',
        gap: '80px',
        alignItems: 'center',
      }}
        className="grid-about"
      >
        {/* Left */}
        <div className="reveal">
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            letterSpacing: '0.2em',
            color: '#4F9D5B',
          }}>
            01 — {t('about.tag')}
          </span>
          <h2 style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(32px, 4vw, 52px)',
            lineHeight: 1.04,
            letterSpacing: '-0.03em',
            margin: '20px 0 0',
          }}>
            {t('about.heading')}
          </h2>
        </div>

        {/* Right */}
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <p style={{ fontSize: '18px', lineHeight: 1.7, margin: 0, color: '#DDE4DE' }}>
            {t('about.p1')}
          </p>
          <p style={{ fontSize: '16px', lineHeight: 1.7, margin: 0, color: '#A9B8AB' }}>
            {t('about.p2')}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '9px', marginTop: '4px' }}>
            {tags.map(key => (
              <span key={key} style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                padding: '7px 13px',
                border: '1px solid rgba(241,237,227,0.22)',
                borderRadius: '999px',
              }}>
                {t(key)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
