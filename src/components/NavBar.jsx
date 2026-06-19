import { useLang } from '../context/LangContext.jsx'

const LogoSVG = () => (
  <svg width="24" height="24" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="40" stroke="#F1EDE3" strokeWidth="9" strokeLinecap="round" strokeDasharray="190 251" transform="rotate(38 50 50)" />
    <circle cx="78" cy="28" r="9" fill="#4F9D5B" />
  </svg>
)

export default function NavBar({ activePage }) {
  const { t, lang, toggleLang } = useLang()
  const visible = activePage > 0

  const links = [
    { href: '#about',    key: 'nav.about' },
    { href: '#skills',   key: 'nav.skills' },
    { href: '#projects', key: 'nav.projects' },
    { href: '#contact',  key: 'nav.contact' },
  ]

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 25,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 40px',
      background: 'rgba(44,58,46,0.82)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      borderBottom: '1px solid rgba(241,237,227,0.08)',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(-100%)',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
      pointerEvents: visible ? 'auto' : 'none',
    }}>
      <a href="#cover" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <LogoSVG />
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          letterSpacing: '0.22em',
          fontWeight: 500,
        }}>
          CALDESEIO
        </span>
      </a>

      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        {links.map(({ href, key }) => (
          <a key={key} className="navlink" href={href} style={{ fontSize: '13px' }}>
            {t(key)}
          </a>
        ))}

        <button
          className="magnet"
          onClick={toggleLang}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.1em',
            padding: '6px 12px',
            border: '1px solid rgba(241,237,227,0.25)',
            background: 'transparent',
            color: '#F1EDE3',
            borderRadius: '999px',
            cursor: 'pointer',
          }}
        >
          {lang === 'es'
            ? <><span>ES</span> / <span style={{ opacity: 0.5 }}>EN</span></>
            : <><span style={{ opacity: 0.5 }}>ES</span> / <span>EN</span></>
          }
        </button>

        <a
          href="/pdf/CV_Luis_Calderon_ESP.pdf"
          target="_blank"
          rel="noreferrer"
          className="magnet"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.08em',
            padding: '7px 14px',
            background: '#4F9D5B',
            color: '#102414',
            borderRadius: '999px',
            fontWeight: 600,
          }}
        >
          {t('nav.cv')}
        </a>
      </div>
    </nav>
  )
}
