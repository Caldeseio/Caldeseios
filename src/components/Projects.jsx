import { useLang } from '../context/LangContext.jsx'

const LogoSVG = ({ size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ opacity: 0.55 }}>
    <circle cx="50" cy="50" r="40" stroke="#8FA391" strokeWidth="9" strokeLinecap="round" strokeDasharray="190 251" transform="rotate(38 50 50)" />
    <circle cx="78" cy="28" r="9" fill="#4F9D5B" />
  </svg>
)

const PROJECTS = [
  {
    n: '01',
    titleKey: 'projects.1.title',
    descKey: 'projects.1.desc',
    tags: ['PHP', 'JavaScript', 'MariaDB', 'API Rest'],
  },
  {
    n: '02',
    titleKey: 'projects.2.title',
    descKey: 'projects.2.desc',
    tags: ['PHP', 'NodeJS', 'Bootstrap', 'API'],
  },
  {
    n: '03',
    titleKey: 'projects.3.title',
    descKey: 'projects.3.desc',
    tags: ['PHP', 'JavaScript', 'MariaDB', 'Bootstrap'],
  },
  {
    n: '04',
    titleKey: 'projects.4.title',
    descKey: 'projects.4.desc',
    tags: ['PHP', 'JavaScript', 'NodeJS', 'MariaDB'],
  },
  {
    n: '05',
    titleKey: 'projects.5.title',
    descKey: 'projects.5.desc',
    tags: ['PHP', 'JavaScript', 'NodeJS', 'MariaDB'],
  },
  {
    n: '06',
    titleKey: 'projects.6.title',
    descKey: 'projects.6.desc',
    tags: ['Three.js', 'JavaScript', 'HTML', 'CSS'],
  },
]

export default function Projects() {
  const { t } = useLang()

  return (
    <section className="page" id="projects" style={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      {/* Chapter watermark */}
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
        03
      </span>

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1180px',
        margin: '0 auto',
        width: '100%',
        padding: '0 clamp(28px, 6vw, 80px)',
      }}>
        <div className="reveal" style={{ marginBottom: 'clamp(18px, 2.5vh, 36px)' }}>
          <span style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: '12px',
            letterSpacing: '0.2em',
            color: '#4F9D5B',
          }}>
            03 — {t('projects.tag')}
          </span>
          <h2 style={{
            fontFamily: "'Bricolage Grotesque',sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(26px, 3.2vw, 44px)',
            letterSpacing: '-0.03em',
            margin: '12px 0 0',
          }}>
            {t('projects.heading')}
          </h2>
        </div>

        <div
          className="grid-projects reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: '14px',
          }}
        >
          {PROJECTS.map(({ n, titleKey, descKey, tags }) => (
            <a
              key={n}
              href="#projects"
              className="proj"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '22px 24px',
                background: '#2f3d31',
                border: '1px solid rgba(241,237,227,0.12)',
                borderRadius: '12px',
                minHeight: '200px',
                textDecoration: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  color: '#4F9D5B',
                }}>
                  {n}
                </span>
                <LogoSVG size={26} />
              </div>

              <h3 style={{
                fontFamily: "'Bricolage Grotesque',sans-serif",
                fontWeight: 600,
                fontSize: '20px',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                margin: '4px 0 0',
                color: '#F1EDE3',
              }}>
                {t(titleKey)}
              </h3>

              <p style={{
                fontSize: '13.5px',
                lineHeight: 1.6,
                color: '#A9B8AB',
                margin: 0,
                flex: 1,
              }}>
                {t(descKey)}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: '10px',
                      letterSpacing: '0.04em',
                      padding: '4px 8px',
                      background: 'rgba(79,157,91,0.14)',
                      color: '#A9D4AE',
                      borderRadius: '6px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
