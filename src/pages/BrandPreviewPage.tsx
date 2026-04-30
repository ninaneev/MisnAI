import { Link } from 'react-router-dom'

const palette = [
  { name: 'Mission Black', hex: '#090909', role: 'Base surface, app chrome, high focus zones' },
  { name: 'Paper White', hex: '#F6F3EC', role: 'Primary text, contrast, clean planning surfaces' },
  { name: 'Current Red', hex: '#E5484D', role: 'Primary action, urgency, active states, next move' },
  { name: 'Warm Grey', hex: '#A8A29A', role: 'Secondary copy, labels, quiet structure' },
  { name: 'Graphite', hex: '#1A1A1A', role: 'Cards, rails, divisions, mobile bars' },
  { name: 'Mist', hex: '#DDD8CF', role: 'Soft separators, restrained depth, subtle fill' },
]

const comparisons = [
  {
    label: 'Current Misn AI',
    tone: 'Botanical, expressive, almost ceremonial',
    feel: 'Beautiful, but more decorative than operational',
    decision: 'Feels farther from a founder operating system',
  },
  {
    label: 'Misn AI // Mission OS',
    tone: 'Personal mission with professional execution',
    feel: 'Clear, disciplined, human, directional, daily-usable',
    decision: 'Strongest fit for a founder system that tells you what matters now',
  },
  {
    label: 'Tactical OS Alt',
    tone: 'Sharper and more system-led',
    feel: 'Operational and credible, but less intimate',
    decision: 'Useful reference, but not as aligned with your identity-led mission',
  },
]

const logoConcepts = [
  {
    name: 'North Star',
    summary: 'A directional mark with a decisive red vector cutting through calm geometry.',
    idea: 'Best if Misn AI should feel like mission, heading, and chosen direction.',
    kind: 'north-star' as const,
  },
  {
    name: 'Mission Track',
    summary: 'A path-like symbol that suggests sequence, systems, and moving forward step by step.',
    idea: 'Best if the product should feel like an operating rail for founder execution.',
    kind: 'mission-track' as const,
  },
  {
    name: 'Signal Fold',
    summary: 'A folded abstract mark that hints at M, route, and signal becoming action.',
    idea: 'Best if you want a more ownable and slightly premium abstract brand mark.',
    kind: 'signal-fold' as const,
  },
]

const voiceRules = [
  {
    title: 'Clear before clever',
    text: 'Misn AI should speak with directness. It should sound like a good operator helping you move, not a poetic productivity app.',
  },
  {
    title: 'Mission, not pressure',
    text: 'The product can be intense without being harsh. It should energize action without making the founder feel judged.',
  },
  {
    title: 'Professional, then human',
    text: 'Use concise language, but let warmth come through. The voice should feel trustworthy enough for work and natural enough for life.',
  },
  {
    title: 'Daily guidance over inspiration',
    text: 'The tone should move from identity to next action: what matters, why it matters, and what to do now.',
  },
]

const inspirationFrames = [
  {
    src: '/misn-preview/autorelay-red.jpg',
    title: 'Red glow system',
    note: 'Use for heat, action, and depth. Borrow the red atmosphere, not the chatbot aesthetic.',
    span: 'xl:col-span-2',
  },
  {
    src: '/misn-preview/neovision-mono.jpg',
    title: 'Monochrome restraint',
    note: 'Good reference for the quiet black-and-paper baseline and premium whitespace.',
    span: '',
  },
  {
    src: '/misn-preview/statue-red.jpg',
    title: 'Sculptural focal point',
    note: 'Useful as a cue for one bold iconic visual, especially on launch and brand surfaces.',
    span: '',
  },
  {
    src: '/misn-preview/jellyfish-red.jpg',
    title: 'Organic motion',
    note: 'Strong for hero energy, motion language, and a more alive sense of intelligence.',
    span: '',
  },
  {
    src: '/misn-preview/salesrocket-black.jpg',
    title: 'Minimal SaaS frame',
    note: 'Useful for translating the brand into credible product marketing structure.',
    span: 'xl:col-span-2',
  },
]

const flowSteps = [
  'Identity',
  'Context',
  'Priority',
  'Next move',
  'Daily rhythm',
  'Review',
]

export default function BrandPreviewPage() {
  return (
    <div className="min-h-dvh bg-[#090909] text-[#F6F3EC]">
      <div
        className="min-h-dvh"
        style={{
          backgroundImage:
            'radial-gradient(circle at top, rgba(229,72,77,0.18), transparent 22%), linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 28px 28px, 28px 28px',
          backgroundPosition: 'center top, center center, center center',
        }}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-8 md:px-8 md:py-10">
          <header className="overflow-hidden rounded-[28px] border border-white/10 bg-[#111111]/90 shadow-[0_28px_90px_rgba(0,0,0,0.45)]">
            <div className="border-b border-white/10 px-5 py-4 md:px-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.42em] text-[#E5484D]">Misn AI Preview</p>
                  <h1 className="mt-2 font-display text-4xl leading-tight text-[#F6F3EC] md:text-6xl">
                    Mission OS for founders.
                  </h1>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-[#DDD8CF] md:text-base">
                    This is the brand direction before changing the live app: palette, tone, logo directions,
                    comparison logic, and coded interface mockups for the Misn AI identity.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/"
                    className="rounded-full border border-white/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#DDD8CF] transition-colors hover:border-[#E5484D] hover:text-[#F6F3EC]"
                  >
                    Back to app
                  </Link>
                  <span className="rounded-full border border-[#E5484D]/30 bg-[#E5484D]/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#E5484D]">
                    Review before rebrand
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-6 px-5 py-6 md:grid-cols-[1.2fr_0.8fr] md:px-8 md:py-8">
              <div className="rounded-[24px] border border-white/10 bg-[#0D0D0D] p-5 md:p-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#A8A29A]">Chosen direction</p>
                    <p className="mt-2 text-2xl font-semibold text-[#F6F3EC]">Mission OS</p>
                  </div>
                  <LogoMark kind="north-star" />
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <FeatureStat
                    label="Energy"
                    value="Focused"
                    note="Serious enough for work, alive enough for daily use."
                  />
                  <FeatureStat
                    label="Promise"
                    value="Know what matters now"
                    note="Business direction, life rhythm, and next action in one system."
                  />
                  <FeatureStat
                    label="Visual move"
                    value="Black, paper, red"
                    note="Minimal but not sterile; action color used with intention."
                  />
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-[0.65fr_0.35fr]">
                  <MockDesktop />
                  <MockMobile />
                </div>
              </div>

              <div className="space-y-4">
                <Panel
                  eyebrow="Core line"
                  title="Misn AI is the operating system for founders who need to know what matters now."
                  body="The identity is built around mission, direction, and the next real move. It is not framed as generic productivity or a decorative lifestyle planner."
                />
                <Panel
                  eyebrow="Red decision"
                  title="Use red as the action signal, not as the whole personality."
                  body="Black and warm white create credibility. Red carries urgency, choice, progress, and friction. That makes it meaningful instead of loud for the sake of loud."
                />
                <Panel
                  eyebrow="Why it works"
                  title="Personal mission + professional execution"
                  body="That balance is what differentiates Misn AI from sharper but colder systems and from softer but less credible productivity brands."
                />
              </div>
            </div>
          </header>

          <section className="rounded-[24px] border border-white/10 bg-[#111111]/90 p-5 md:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#A8A29A]">Inspiration board</p>
                <h2 className="mt-3 text-3xl font-semibold text-[#F6F3EC]">Visual references to keep and translate</h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-[#DDD8CF]">
                These are now the active references for the Misn AI direction. The site should pull from this black,
                white, and red language instead of the old green botanical system.
              </p>
            </div>

            <div className="mt-6 grid gap-4 xl:grid-cols-3">
              {inspirationFrames.map((frame) => (
                <div key={frame.src} className={`overflow-hidden rounded-[24px] border border-white/10 bg-[#0C0C0C] ${frame.span}`}>
                  <img src={frame.src} alt={frame.title} className="h-72 w-full object-cover object-top" />
                  <div className="border-t border-white/10 p-4">
                    <h3 className="text-lg font-semibold text-[#F6F3EC]">{frame.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#DDD8CF]">{frame.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-3">
            {comparisons.map((item, index) => (
              <div
                key={item.label}
                className={`rounded-[24px] border p-5 ${
                  index === 1
                    ? 'border-[#E5484D]/40 bg-[#140D0D]'
                    : 'border-white/10 bg-[#111111]/90'
                }`}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#A8A29A]">Comparison</p>
                <h2 className="mt-3 text-2xl font-semibold text-[#F6F3EC]">{item.label}</h2>
                <div className="mt-5 space-y-4 text-sm leading-7 text-[#DDD8CF]">
                  <ComparisonRow label="Tone" value={item.tone} />
                  <ComparisonRow label="Feel" value={item.feel} />
                  <ComparisonRow label="Decision" value={item.decision} emphasis={index === 1} />
                </div>
              </div>
            ))}
          </section>

          <section className="grid gap-5 xl:grid-cols-[0.92fr_1.08fr]">
            <div className="rounded-[24px] border border-white/10 bg-[#111111]/90 p-5 md:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#A8A29A]">Color system</p>
              <h2 className="mt-3 text-3xl font-semibold text-[#F6F3EC]">Palette for the rebrand</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#DDD8CF]">
                The system stays restrained. Black carries focus, paper white keeps it readable, and red is reserved
                for the active move, current state, and moments of commitment.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {palette.map((item) => (
                  <div key={item.name} className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                    <div className="h-20 rounded-2xl border border-white/10" style={{ backgroundColor: item.hex }} />
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-[#F6F3EC]">{item.name}</p>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.24em] text-[#A8A29A]">{item.hex}</p>
                      <p className="mt-3 text-sm leading-6 text-[#DDD8CF]">{item.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-[#111111]/90 p-5 md:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#A8A29A]">Logo directions</p>
              <h2 className="mt-3 text-3xl font-semibold text-[#F6F3EC]">Three abstract mark concepts</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {logoConcepts.map((concept) => (
                  <div key={concept.name} className="rounded-[22px] border border-white/10 bg-[#0C0C0C] p-4">
                    <div className="flex min-h-40 items-center justify-center rounded-[20px] border border-white/10 bg-[#090909]">
                      <LogoMark kind={concept.kind} large />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[#F6F3EC]">{concept.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#DDD8CF]">{concept.summary}</p>
                    <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#E5484D]">
                      {concept.idea}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[24px] border border-white/10 bg-[#111111]/90 p-5 md:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#A8A29A]">Voice and tone</p>
              <h2 className="mt-3 text-3xl font-semibold text-[#F6F3EC]">How Misn AI should sound</h2>
              <div className="mt-6 space-y-4">
                {voiceRules.map((rule) => (
                  <div key={rule.title} className="rounded-[22px] border border-white/10 bg-[#0C0C0C] p-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#E5484D]">{rule.title}</p>
                    <p className="mt-3 text-sm leading-7 text-[#DDD8CF]">{rule.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-[#111111]/90 p-5 md:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#A8A29A]">System diagram</p>
              <h2 className="mt-3 text-3xl font-semibold text-[#F6F3EC]">How the product should feel in motion</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#DDD8CF]">
                This is the emotional and product flow the brand should communicate: identity informs context, context
                sharpens priorities, and priorities resolve into one next move and a repeatable daily rhythm.
              </p>

              <div className="mt-6 rounded-[26px] border border-white/10 bg-[#0C0C0C] p-4 md:p-5">
                <div className="grid gap-3 md:grid-cols-6">
                  {flowSteps.map((step, index) => (
                    <div key={step} className="flex items-center gap-3 md:flex-col md:items-stretch">
                      <div className="flex min-h-[88px] flex-1 items-center justify-center rounded-[20px] border border-white/10 bg-[#111111] px-4 py-3 text-center">
                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#F6F3EC]">{step}</span>
                      </div>
                      {index < flowSteps.length - 1 && (
                        <div className="hidden h-px flex-1 self-center bg-gradient-to-r from-[#E5484D] to-white/10 md:block" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[22px] border border-[#E5484D]/25 bg-[#160E0E] px-4 py-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#E5484D]">Output state</p>
                  <p className="mt-2 text-sm leading-7 text-[#DDD8CF]">
                    The user should leave each session feeling less scattered, more directed, and more capable of
                    finishing the next meaningful action.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function FeatureStat({
  label,
  value,
  note,
}: {
  label: string
  value: string
  note: string
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-[#111111] p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#A8A29A]">{label}</p>
      <p className="mt-3 text-lg font-semibold text-[#F6F3EC]">{value}</p>
      <p className="mt-2 text-sm leading-6 text-[#DDD8CF]">{note}</p>
    </div>
  )
}

function ComparisonRow({
  label,
  value,
  emphasis = false,
}: {
  label: string
  value: string
  emphasis?: boolean
}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#A8A29A]">{label}</p>
      <p className={`mt-1 ${emphasis ? 'text-[#F6F3EC]' : 'text-[#DDD8CF]'}`}>{value}</p>
    </div>
  )
}

function Panel({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string
  title: string
  body: string
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-[#0D0D0D] p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#A8A29A]">{eyebrow}</p>
      <h3 className="mt-3 text-xl font-semibold text-[#F6F3EC]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[#DDD8CF]">{body}</p>
    </div>
  )
}

function MockDesktop() {
  return (
    <div className="overflow-hidden rounded-[26px] border border-white/10 bg-[#080808] shadow-[0_24px_70px_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5484D]" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[#A8A29A]">Desktop mockup</span>
      </div>

      <div className="grid min-h-[360px] grid-cols-[220px_1fr]">
        <div className="border-r border-white/10 bg-[#101010] p-4">
          <div className="flex items-center gap-3">
            <LogoMark kind="north-star" compact />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#E5484D]">Misn AI</p>
              <p className="text-sm text-[#F6F3EC]">Mission OS</p>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            {['Today', 'Priorities', 'Decisions', 'Rhythm', 'Review'].map((item, index) => (
              <div
                key={item}
                className={`rounded-2xl px-3 py-3 text-sm ${
                  index === 0 ? 'border border-[#E5484D]/30 bg-[#1A1111] text-[#F6F3EC]' : 'text-[#A8A29A]'
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#090909] p-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#A8A29A]">Today</p>
              <h3 className="mt-2 text-2xl font-semibold text-[#F6F3EC]">One clear mission for the day.</h3>
            </div>
            <div className="rounded-full border border-[#E5484D]/30 bg-[#E5484D]/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#E5484D]">
              Next move active
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[22px] border border-white/10 bg-[#111111] p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#A8A29A]">Focus block</p>
              <div className="mt-4 space-y-3">
                {[
                  'Refine positioning for solopreneur homepage',
                  'Ship one validation task before noon',
                  'Review weekly energy and adjust pace',
                ].map((task, index) => (
                  <div key={task} className="flex items-start gap-3">
                    <div
                      className={`mt-1 h-2.5 w-2.5 rounded-full ${
                        index === 0 ? 'bg-[#E5484D]' : 'bg-white/20'
                      }`}
                    />
                    <p className="text-sm leading-6 text-[#DDD8CF]">{task}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[22px] border border-white/10 bg-[#111111] p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#A8A29A]">Rhythm</p>
              <div className="mt-4 space-y-3">
                <ProgressLine label="Direction" value="84%" />
                <ProgressLine label="Energy" value="67%" />
                <ProgressLine label="Execution" value="52%" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MockMobile() {
  return (
    <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-[30px] border border-white/10 bg-[#080808] shadow-[0_24px_70px_rgba(0,0,0,0.4)]">
      <div className="border-b border-white/10 px-4 py-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#A8A29A]">Mobile mockup</p>
      </div>

      <div className="space-y-4 p-4">
        <div className="rounded-[22px] border border-[#E5484D]/30 bg-[#140D0D] p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#E5484D]">Today</p>
          <p className="mt-3 text-lg font-semibold text-[#F6F3EC]">Protect the mission.</p>
          <p className="mt-2 text-sm leading-6 text-[#DDD8CF]">
            One meaningful task. One life-supporting task. One review before sleep.
          </p>
        </div>

        <div className="space-y-3">
          {['Primary build task', 'Client follow-up', 'Walk and reset'].map((task, index) => (
            <div key={task} className="flex items-center gap-3 rounded-[18px] border border-white/10 bg-[#111111] px-4 py-3">
              <span className={`h-2.5 w-2.5 rounded-full ${index === 0 ? 'bg-[#E5484D]' : 'bg-white/20'}`} />
              <span className="text-sm text-[#F6F3EC]">{task}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProgressLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#A8A29A]">{label}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#F6F3EC]">{value}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/8">
        <div className="h-1.5 rounded-full bg-[#E5484D]" style={{ width: value }} />
      </div>
    </div>
  )
}

function LogoMark({
  kind,
  large = false,
  compact = false,
}: {
  kind: 'north-star' | 'mission-track' | 'signal-fold'
  large?: boolean
  compact?: boolean
}) {
  const size = large ? 88 : compact ? 34 : 56
  const stroke = large ? 5 : compact ? 2.8 : 3.5

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {kind === 'north-star' && (
        <>
          <circle cx="50" cy="50" r="34" stroke="#F6F3EC" strokeOpacity="0.92" strokeWidth={stroke} />
          <path
            d="M33 63L50 32L67 63"
            stroke="#F6F3EC"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M50 32L61 42"
            stroke="#E5484D"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}

      {kind === 'mission-track' && (
        <>
          <rect x="26" y="19" width="48" height="62" rx="24" stroke="#F6F3EC" strokeWidth={stroke} />
          <path
            d="M38 65L38 37C38 31.5 42.5 27 48 27H52"
            stroke="#F6F3EC"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          <path
            d="M62 35V63C62 68.5 57.5 73 52 73H48"
            stroke="#F6F3EC"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          <circle cx="62" cy="35" r="7" fill="#E5484D" />
        </>
      )}

      {kind === 'signal-fold' && (
        <>
          <path
            d="M25 73L42 25L50 50L58 25L75 73"
            stroke="#F6F3EC"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M50 50L67 67"
            stroke="#E5484D"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  )
}
