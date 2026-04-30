/* globals React, Icon, Card, HeroPanel, Chip, Progress, Checkbox, Button, MonoLabel */
// Misn AI — Today screen.
// Shows the hero "Today at a glance" panel plus the Focus Blocks sequence.

const { useState: useStateToday } = React;

function DayHero() {
  return (
    <HeroPanel style={{ padding: '28px 30px', marginBottom: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20 }}>
        <div>
          <MonoLabel color="gold" tracking={0.32}>Thursday · Week 14</MonoLabel>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 38,
            lineHeight: 1.1,
            color: 'var(--text)',
            margin: '10px 0 0',
            letterSpacing: '-0.015em',
          }}>
            Today, you <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>validate</em> the pricing page copy.
          </h1>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 14,
            lineHeight: 1.6,
            color: 'var(--muted)',
            margin: '14px 0 0',
            maxWidth: 540,
          }}>
            Three execution blocks, one decision checkpoint. Finish the first block before 11:00 and the rest unfolds on rhythm.
          </p>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 48, color: 'var(--pink)', lineHeight: 1 }}>
            2/5
          </div>
          <MonoLabel tracking={0.22}>blocks closed</MonoLabel>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
        <Chip variant="pink">Execution</Chip>
        <Chip variant="gold">Phase 02 · Traction</Chip>
        <Chip variant="emerald">Saved next move</Chip>
      </div>
    </HeroPanel>
  );
}

function FocusBlock({ index, title, duration, state, output, kind }) {
  const toneByKind = { decide: 'gold', deliver: 'pink', reflect: 'sage' };
  const tone = toneByKind[kind];
  const isLocked = state === 'locked';
  const isDone   = state === 'done';
  const isActive = state === 'active';

  return (
    <Card
      surface={isActive ? 'plum' : isDone ? 'forest' : 'ink'}
      accent={isActive ? 'pink' : isDone ? 'emerald' : null}
      style={{ padding: '18px 22px', opacity: isLocked ? 0.55 : 1 }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        {/* Number */}
        <div style={{
          width: 36, height: 36, borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: isDone ? 'rgba(22,163,122,0.14)' : isActive ? 'rgba(255,58,174,0.12)' : 'rgba(255,255,255,0.03)',
          border: '1px solid',
          borderColor: isDone ? 'rgba(22,163,122,0.3)' : isActive ? 'rgba(255,58,174,0.3)' : 'var(--border)',
          flexShrink: 0,
        }}>
          {isDone
            ? <Icon name="check" size={16} color="#A7F06D" strokeWidth={2.25} />
            : isLocked
              ? <Icon name="lock" size={14} color="#9BA8A2" />
              : <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: isActive ? '#FF3AAE' : '#9BA8A2' }}>
                  {String(index).padStart(2, '0')}
                </span>}
        </div>

        {/* Body */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <Chip variant={tone}>{kind}</Chip>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--muted)', textTransform: 'uppercase' }}>
              {duration}
            </span>
          </div>
          <h3 style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            fontSize: 16,
            color: 'var(--text)',
            margin: '4px 0 0',
            textDecoration: isDone ? 'line-through' : 'none',
            textDecorationColor: isDone ? 'rgba(167,240,109,0.5)' : undefined,
          }}>{title}</h3>
          {output && (
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              lineHeight: 1.5,
              color: 'var(--muted)',
              margin: '8px 0 0',
              fontStyle: isDone ? 'italic' : 'normal',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginRight: 8 }}>Output</span>
              {output}
            </p>
          )}
        </div>

        {/* Action */}
        {isActive && (
          <Button variant="primary" size="sm" style={{ flexShrink: 0 }}>
            Start → 45m
          </Button>
        )}
      </div>
    </Card>
  );
}

function TodayScreen() {
  return (
    <div>
      <DayHero />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 22, margin: 0, color: 'var(--text)' }}>
          Focus blocks
        </h2>
        <MonoLabel tracking={0.22}>Ordered · not parallel</MonoLabel>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
        <FocusBlock index={1} kind="deliver" duration="45 min"
          title="Draft three value propositions for landing hero"
          state="done"
          output="Clarity · Rhythm · Trust variant saved as v3" />
        <FocusBlock index={2} kind="decide" duration="25 min"
          title="Pick the pricing tier to show above the fold"
          state="done"
          output="Pro tier chosen — decision logged with 4 weighted criteria" />
        <FocusBlock index={3} kind="deliver" duration="45 min"
          title="Validate hero copy with three founders in your cohort"
          state="active"
          output="Collect reactions, log one refinement per voice" />
        <FocusBlock index={4} kind="deliver" duration="30 min"
          title="Ship the refined pricing page to staging"
          state="locked" />
        <FocusBlock index={5} kind="reflect" duration="15 min"
          title="Close the day — write tomorrow's first block"
          state="locked" />
      </div>

      {/* End-of-day saved move */}
      <Card surface="amber" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <Icon name="arrow" size={18} color="#E0B84A" />
          <div style={{ flex: 1 }}>
            <MonoLabel color="gold" tracking={0.28}>Saved next move</MonoLabel>
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 18, color: 'var(--text)', margin: '8px 0 0', lineHeight: 1.4 }}>
              Tomorrow, open with the refined hero and send it to Priya for one blunt read.
            </p>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--muted)', marginTop: 6, display: 'inline-block' }}>
              Written yesterday · 22:14 local
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

Object.assign(window, { TodayScreen });
