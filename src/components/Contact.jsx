import { useLang } from '../context/LangContext.jsx'

const LogoSVG = () => (
  <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="40" stroke="#F1EDE3" strokeWidth="9" strokeLinecap="round" strokeDasharray="190 251" transform="rotate(38 50 50)" />
    <circle cx="78" cy="28" r="9" fill="#4F9D5B" />
  </svg>
)

export default function Contact() {
  const { t } = useLang()

  const socials = [
    { label: 'GitHub ↗', href: 'https://github.com/caldeseio' },
    { label: 'LinkedIn ↗', href: 'https://www.linkedin.com/in/luis-calderon-962a57258' },
    { label: 'Instagram ↗', href: 'https://www.instagram.com/luis_calde_' },
  ]

  return (
    <section className="page" id="contact" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      {/* Chapter watermark */}
      <span style={{
        position: 'absolute',
        right: '40px',
        bottom: '80px',
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
        04
      </span>

      {/* Main content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1180px',
        margin: '0 auto',
        width: '100%',
        padding: 'clamp(80px, 12vh, 140px) clamp(28px, 6vw, 80px) 0',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <div
          className="grid-contact reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.3fr 1fr',
            gap: '70px',
            alignItems: 'end',
          }}
        >
          {/* Left: heading + email */}
          <div>
            <span style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: '12px',
              letterSpacing: '0.2em',
              color: '#4F9D5B',
            }}>
              04 — {t('contact.tag')}
            </span>
            <h2 style={{
              fontFamily: "'Bricolage Grotesque',sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(38px, 6vw, 88px)',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              margin: '20px 0 0',
            }}>
              {t('contact.heading')}
            </h2>
            <a
              href="mailto:luiscalderontcit@gmail.com"
              className="magnet"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 'clamp(13px, 1.8vw, 20px)',
                marginTop: '32px',
                paddingBottom: '8px',
                borderBottom: '2px solid #4F9D5B',
              }}
            >
              luiscalderontcit@gmail.com <span style={{ color: '#4F9D5B' }}>→</span>
            </a>
          </div>

          {/* Right: location, phone, socials */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <p style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '11px',
                letterSpacing: '0.14em',
                color: '#7E907F',
                margin: '0 0 6px',
              }}>
                {t('contact.location.label')}
              </p>
              <p style={{ fontSize: '16px', margin: 0 }}>{t('contact.location')}</p>
            </div>
            <div>
              <p style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '11px',
                letterSpacing: '0.14em',
                color: '#7E907F',
                margin: '0 0 6px',
              }}>
                {t('contact.phone.label')}
              </p>
              <p style={{ fontSize: '16px', margin: 0 }}>+506 8339-1192</p>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '6px', flexWrap: 'wrap' }}>
              {socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="magnet"
                  style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: '12px',
                    padding: '8px 14px',
                    border: '1px solid rgba(241,237,227,0.24)',
                    borderRadius: '999px',
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1180px',
        margin: '0 auto',
        width: '100%',
        padding: '0 clamp(28px, 6vw, 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '28px',
        paddingTop: '24px',
        borderTop: '1px solid rgba(241,237,227,0.10)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
          <LogoSVG />
          <span style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: '11px',
            letterSpacing: '0.16em',
          }}>
            CALDESEIO © 2026
          </span>
        </div>
        <span style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '11px',
          letterSpacing: '0.12em',
          color: '#7E907F',
        }}>
          LUIS CALDERÓN JIMÉNEZ
        </span>
      </div>
    </section>
  )
}
