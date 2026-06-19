import { useLang } from '../context/LangContext.jsx'

const DEV_SKILLS = [
  ['PHP', 92],
  ['JavaScript', 90],
  ['Python', 88],
  ['HTML / CSS', 94],
  ['React', 68],
  ['C#', 66],
  ['Java', 64],
]

const DATA_SKILLS = [
  ['Power BI', 90],
  ['MySQL', 90],
  ['SQL Server', 70],
  ['R', 66],
]

function SkillBar({ name, level, t }) {
  const label = level >= 85 ? t('skills.advanced') : t('skills.intermediate')
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
        <span style={{ fontSize: '16px', fontWeight: 500 }}>{name}</span>
        <span style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '10px',
          letterSpacing: '0.08em',
          color: '#8FA391',
        }}>
          {label}
        </span>
      </div>
      <div
        className="skillbar reveal"
        style={{
          height: '4px',
          background: 'rgba(241,237,227,0.10)',
          borderRadius: '99px',
          '--lv': level / 100,
        }}
      >
        <i />
      </div>
    </div>
  )
}

function SkillColumn({ titleKey, skills, t }) {
  return (
    <div className="reveal">
      <p style={{
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '11px',
        letterSpacing: '0.18em',
        color: '#9DB09F',
        margin: '0 0 20px',
        paddingBottom: '12px',
        borderBottom: '1px solid rgba(241,237,227,0.12)',
      }}>
        {t(titleKey)}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {skills.map(([name, lv]) => (
          <SkillBar key={name} name={name} level={lv} t={t} />
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const { t } = useLang()

  return (
    <section className="page" id="skills" style={{ display: 'flex', alignItems: 'center' }}>
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
        02
      </span>

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1180px',
        margin: '0 auto',
        width: '100%',
        padding: '0 clamp(28px, 6vw, 80px)',
      }}>
        <div className="reveal" style={{ marginBottom: 'clamp(24px, 3.5vh, 44px)' }}>
          <span style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: '12px',
            letterSpacing: '0.2em',
            color: '#4F9D5B',
          }}>
            02 — {t('skills.tag')}
          </span>
          <h2 style={{
            fontFamily: "'Bricolage Grotesque',sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(28px, 3.5vw, 46px)',
            letterSpacing: '-0.03em',
            margin: '14px 0 0',
          }}>
            {t('skills.heading')}
          </h2>
        </div>

        <div
          className="grid-skills"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(30px, 6vw, 80px)' }}
        >
          <SkillColumn titleKey="skills.dev" skills={DEV_SKILLS} t={t} />
          <SkillColumn titleKey="skills.data" skills={DATA_SKILLS} t={t} />
        </div>
      </div>
    </section>
  )
}
