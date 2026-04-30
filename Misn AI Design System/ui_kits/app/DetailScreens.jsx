/* globals React, Icon, Card, HeroPanel, Chip, Progress, Button, MonoLabel */
// Misn AI — Milestones & Decisions screens.

function MilestoneCard({ m }) {
  const done = m.state === 'done';
  return (
    <Card
      surface={done ? 'forest' : 'ink'}
      accent={done ? 'emerald' : 'gold'}
      style={{ padding: '18px 22px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <MonoLabel color={done ? 'emerald' : 'gold'} tracking={0.28}>{m.phase}</MonoLabel>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--muted)', textTransform: 'uppercase' }}>
          {m.when}
        </span>
      </div>
      <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 19, color: 'var(--text)', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
        {m.title}
      </h4>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, lineHeight: 1.55, color: 'var(--muted)', margin: 0 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', color: done ? 'var(--emerald-light)' : 'var(--gold)', textTransform: 'uppercase', marginRight: 8 }}>
          Proof
        </span>
        {m.proof}
      </p>
    </Card>
  );
}

function MilestonesScreen() {
  const milestones = [
    { phase: 'Phase 01 · Foundation', when: 'Feb 14', state: 'done',
      title: 'First paying user',
      proof: 'Invoice #001 to Ilana Reeve — $49, annual, referred by cohort peer.' },
    { phase: 'Phase 01 · Foundation', when: 'Mar 02', state: 'done',
      title: 'Five founders briefed',
      proof: 'Recorded calls with Maya, Koji, Priya, Devon, and Roan — playbook v1 written from transcripts.' },
    { phase: 'Phase 02 · Traction', when: 'Apr 11', state: 'done',
      title: 'Pricing page shipped',
      proof: 'Three-tier layout live. Pro-tier conversions tracked since launch.' },
    { phase: 'Phase 02 · Traction', when: 'Due Apr 28', state: 'open',
      title: 'Repeatable acquisition channel',
      proof: 'Need: two consecutive weeks of ≥3 inbound calls from the same source.' },
    { phase: 'Phase 02 · Traction', when: 'Due May 12', state: 'open',
      title: 'Paid cohort 01 — 12 founders',
      proof: 'Seven committed. Five outstanding. No discounts promised.' },
  ];
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <MonoLabel color="gold" tracking={0.32}>Visible proof of progress</MonoLabel>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 36, color: 'var(--text)', margin: '10px 0 10px', letterSpacing: '-0.015em' }}>
          Milestones <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>preserve timing</em>.
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.6, color: 'var(--muted)', maxWidth: 560, margin: 0 }}>
          Each one has a dated proof — invoice, transcript, shipped artifact. Nothing counts without one.
        </p>
      </div>

      <div style={{ display: 'flex', gap: 14, marginBottom: 24, flexWrap: 'wrap' }}>
        <Chip variant="emerald">3 completed</Chip>
        <Chip variant="gold">2 due in 21d</Chip>
        <Chip variant="muted">Last: Apr 11</Chip>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {milestones.map((m, i) => <MilestoneCard key={i} m={m} />)}
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// Decision matrix
// ------------------------------------------------------------
function DecisionMatrix() {
  const criteria = [
    { label: 'Reach new founders', weight: 30 },
    { label: 'Time to signal',       weight: 25 },
    { label: 'Cost per lead',        weight: 20 },
    { label: 'Compounds w/ content', weight: 25 },
  ];
  const options = [
    { name: 'Warm-intro outreach', scores: [8, 6, 9, 4], color: 'gold' },
    { name: 'Founder podcast circuit', scores: [7, 4, 7, 10], color: 'pink' },
    { name: 'Paid newsletter placements', scores: [9, 8, 3, 5], color: 'sage' },
  ];
  const totals = options.map(o =>
    Math.round(o.scores.reduce((s, v, i) => s + v * criteria[i].weight, 0) / 10) / 10
  );
  const winnerIdx = totals.indexOf(Math.max(...totals));

  return (
    <Card surface="ink" style={{ padding: '24px 28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
        <div>
          <MonoLabel color="pink" tracking={0.28}>Decision · active</MonoLabel>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 22, color: 'var(--text)', margin: '6px 0 0', letterSpacing: '-0.01em' }}>
            Where do we find the next twelve?
          </h3>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--muted)', textTransform: 'uppercase' }}>
          Logged apr 18
        </span>
      </div>

      {/* Header row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.8fr repeat(4, 1fr) 0.9fr',
        gap: 12,
        paddingBottom: 10,
        borderBottom: '1px solid var(--border)',
        marginBottom: 10,
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--muted)', textTransform: 'uppercase' }}>
          Option
        </span>
        {criteria.map(c => (
          <div key={c.label} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--muted)', textTransform: 'uppercase', lineHeight: 1.3 }}>
              {c.label}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--gold)', marginTop: 2 }}>
              w{c.weight}
            </div>
          </div>
        ))}
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--gold)', textTransform: 'uppercase', textAlign: 'right' }}>
          Score
        </span>
      </div>

      {/* Rows */}
      {options.map((o, i) => {
        const isWinner = i === winnerIdx;
        return (
          <div key={o.name} style={{
            display: 'grid',
            gridTemplateColumns: '1.8fr repeat(4, 1fr) 0.9fr',
            gap: 12,
            padding: '14px 0',
            borderBottom: i < options.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            alignItems: 'center',
            background: isWinner ? 'linear-gradient(90deg, rgba(255,58,174,0.08), transparent 70%)' : 'transparent',
            margin: isWinner ? '0 -28px' : 0,
            paddingLeft: isWinner ? 28 : 0,
            paddingRight: isWinner ? 28 : 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {isWinner && <Icon name="target" size={14} color="#FF3AAE" />}
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>
                {o.name}
              </span>
            </div>
            {o.scores.map((s, j) => (
              <span key={j} style={{
                textAlign: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                color: s >= 8 ? 'var(--emerald-light)' : s >= 6 ? 'var(--text-body)' : 'var(--muted)',
              }}>
                {s}
              </span>
            ))}
            <span style={{
              textAlign: 'right',
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 22,
              color: isWinner ? 'var(--pink)' : 'var(--text-body)',
              fontWeight: 500,
            }}>
              {totals[i].toFixed(1)}
            </span>
          </div>
        );
      })}

      <div style={{
        marginTop: 18,
        padding: '14px 18px',
        background: 'rgba(255,58,174,0.06)',
        border: '1px solid rgba(255,58,174,0.18)',
        borderRadius: 8,
      }}>
        <MonoLabel color="pink" tracking={0.28}>Provisional pick</MonoLabel>
        <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 17, color: 'var(--text)', margin: '6px 0 0', lineHeight: 1.4 }}>
          {options[winnerIdx].name} — commit for 14 days, then revisit.
        </p>
      </div>
    </Card>
  );
}

function DecisionsScreen() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <MonoLabel color="gold" tracking={0.32}>Weighted before committed</MonoLabel>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 36, color: 'var(--text)', margin: '10px 0 10px', letterSpacing: '-0.015em' }}>
          Every decision, <em style={{ fontStyle: 'italic', color: 'var(--pink)' }}>on record</em>.
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.6, color: 'var(--muted)', maxWidth: 560, margin: 0 }}>
          Gut calls go here too — they just need criteria. Logs stay local so you can look back without performing.
        </p>
      </div>
      <DecisionMatrix />
    </div>
  );
}

Object.assign(window, { MilestonesScreen, DecisionsScreen });
