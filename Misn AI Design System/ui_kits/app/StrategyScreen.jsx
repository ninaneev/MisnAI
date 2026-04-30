/* globals React, Icon, Card, HeroPanel, Chip, Progress, Button, MonoLabel */
// Misn AI — Strategy / Phases screen.
// Staged business path with locked future phases revealed, not hidden.

const PHASES = [
  {
    id: 1, num: '01', name: 'Foundation', kicker: 'Complete',
    state: 'done',
    window: 'W01 — W08',
    milestones: 4, milestonesDone: 4,
    summary: 'Narrative, audience, promise, first five hand-built users.',
  },
  {
    id: 2, num: '02', name: 'Traction', kicker: 'Active · 34%',
    state: 'active',
    window: 'W09 — W20',
    milestones: 6, milestonesDone: 2,
    summary: 'Pricing, onboarding, repeatable acquisition channel, paid cohort 01.',
  },
  {
    id: 3, num: '03', name: 'Rhythm', kicker: 'Next',
    state: 'next',
    window: 'W21 — W32',
    milestones: 5, milestonesDone: 0,
    summary: 'Weekly cadence, support loop, renewal signal, founder rest schedule.',
  },
  {
    id: 4, num: '04', name: 'Durability', kicker: 'Later',
    state: 'later',
    window: 'W33+',
    milestones: 7, milestonesDone: 0,
    summary: 'Two-person team, on-call separation, margin target, six-month runway.',
  },
];

function PhaseRow({ p }) {
  const state = p.state;
  const accent = state === 'done' ? 'emerald' : state === 'active' ? 'pink' : state === 'next' ? 'gold' : null;
  const pct = Math.round((p.milestonesDone / p.milestones) * 100);

  return (
    <Card
      surface={state === 'active' ? 'plum' : state === 'done' ? 'forest' : state === 'next' ? 'amber' : 'ink'}
      accent={accent}
      style={{ padding: '22px 26px', opacity: state === 'later' ? 0.72 : 1 }}
    >
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
        {/* Number block */}
        <div style={{ minWidth: 64 }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 44,
            fontWeight: 500,
            color: state === 'active' ? 'var(--pink)' : state === 'done' ? 'var(--emerald-light)' : state === 'next' ? 'var(--gold)' : 'rgba(232,223,200,0.25)',
            lineHeight: 1,
          }}>{p.num}</div>
          <MonoLabel tracking={0.22} size={9}>{p.window}</MonoLabel>
        </div>

        {/* Body */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 22, color: 'var(--text)', margin: 0, letterSpacing: '-0.01em' }}>
              {p.name}
            </h3>
            <Chip variant={accent || 'muted'}>{p.kicker}</Chip>
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.55, color: 'var(--text-body)', margin: '0 0 14px' }}>
            {p.summary}
          </p>
          <Progress
            value={pct}
            tone={state === 'done' ? 'emerald' : state === 'active' ? 'pink' : 'gold'}
            label="Milestones"
            count={`${p.milestonesDone} / ${p.milestones}`}
          />
        </div>

        {/* Indicator icon */}
        <div style={{ flexShrink: 0 }}>
          {state === 'done' && <Icon name="check" size={18} color="#A7F06D" strokeWidth={2.25} />}
          {state === 'later' && <Icon name="lock" size={16} color="#9BA8A2" />}
        </div>
      </div>
    </Card>
  );
}

function StrategyScreen() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <MonoLabel color="gold" tracking={0.32}>The staged path</MonoLabel>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 36,
          color: 'var(--text)',
          margin: '10px 0 10px',
          letterSpacing: '-0.015em',
        }}>
          Four phases, <em style={{ fontStyle: 'italic', color: 'var(--pink)' }}>one at a time</em>.
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.6, color: 'var(--muted)', maxWidth: 560, margin: 0 }}>
          Future phases stay visible so you can orient — but today's focus belongs to the one that's active. Nothing else gets your attention.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
        {PHASES.map(p => <PhaseRow key={p.id} p={p} />)}
      </div>

      {/* Refresh banner */}
      <Card surface="surface" style={{ padding: '16px 22px', borderStyle: 'dashed', borderColor: 'rgba(224,184,74,0.22)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Icon name="history" size={16} color="#E0B84A" />
          <div style={{ flex: 1 }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-body)' }}>
              Last strategy review — <strong style={{ color: 'var(--gold)', fontWeight: 500 }}>11 days ago</strong>. Due in 3.
            </span>
          </div>
          <Button variant="gold" size="sm">Open review →</Button>
        </div>
      </Card>
    </div>
  );
}

Object.assign(window, { StrategyScreen, PHASES });
