import { useState, useEffect } from "react";

const C = {
  bg: "#07070A", surface: "#0D0D12", surface2: "#111118",
  border: "#1C1C28", gold: "#C9A84C", goldDim: "#8A6E2F",
  text: "#EDE8DF", muted: "#6B6878", dim: "#2A2A38",
  red: "#C94C4C", green: "#4CC97A", blue: "#4C8EC9", purple: "#8B4CC9",
};

const daily = [
  { time: "06:00", label: "WAKE — ZERO PHONE", dur: "5 min", tag: "BODY",
    items: ["Alarm rings — phone stays face down", "Glass of cold water immediately", "Change into training clothes — out in under 10 min", "First decision defines the rest of the day"],
    why: "INFJs bypass resistance best by moving before the brain fully wakes." },
  { time: "06:10", label: "TRAINING", dur: "80 min", tag: "BODY",
    items: ["Martial arts / gym / run — rotate weekly", "No lyrics — instrumental or silence only", "Let Flowity problems process unconsciously", "5 min breathwork to close the session"],
    why: "Physical training simultaneously improves cognition, discipline, stress tolerance and longevity." },
  { time: "07:30", label: "MORNING RITUAL", dur: "45 min", tag: "BODY",
    items: ["Cold shower — fully wakes the nervous system", "SKIN: cold rinse → aloe vera gel → SPF 30+ (4 min)", "BREAKFAST: eggs + oats + fruit, or Greek yogurt + nuts", "Dress well even at home. Phone for messages only."],
    why: "Aloe vera + SPF daily is the highest ROI skin investment that exists." },
  { time: "08:15", label: "MORNING SHIFT — GET CLIENTS", dur: "3.5 hrs", tag: "GROW",
    items: ["CONTENT (60 min): write + publish 1 LinkedIn post — pain → insight → Flowity angle", "ENGAGE (30 min): meaningful comments on 10 ICP posts", "OUTREACH (75 min): 5 ICP companies identified, 3–5 personalised messages sent", "FOLLOW-UP (15 min): reply to every open conversation", "LOG: update CRM — contacted / replied / auditing / converted"],
    why: "Revenue requires daily visible motion. This shift is the engine." },
  { time: "12:00", label: "LUNCH", dur: "45 min", tag: "REST",
    items: ["Lean protein + carbs + vegetables — nothing processed", "No screens during the meal", "Walk outside 15–20 min after eating"],
    why: "A real lunch break doubles afternoon output quality." },
  { time: "13:00", label: "AFTERNOON SHIFT — BUILD", dur: "3.5 hrs", tag: "BUILD",
    items: ["Phone silent. ONE task written at top of doc before starting.", "MON/WED/FRI: Product — signal engine, Pulse Deck, Flowity Cortex", "TUE/THU: Delivery — active audits, client reports, output quality", "SAT: Systems — documentation, SOPs, templates", "50 min focus / 10 min break. End with: what was built, what is next."],
    why: "The morning makes companies aware of Flowity. The afternoon makes it real." },
  { time: "16:30", label: "DAILY CLOSE", dur: "20 min", tag: "BUILD",
    items: ["Did you publish? Did you send outreach? Did you build?", "Write the ONE thing that moves Flowity most tomorrow", "Close all work apps. Hard close.", "Revenue check: where are you vs this month's target?"],
    why: "Clean endings signal recovery — which sustains 20 months of this." },
  { time: "16:50", label: "PERSONAL TIME", dur: "2 hrs", tag: "LIFE",
    items: ["Family, music, walking, reading — zero structure", "Blues, jazz, rock — feed the part of you that builds better", "Fiction, philosophy, history — non-business only", "Protected. No client checks. No quick replies."],
    why: "This is not leisure. It is maintenance. INFJs who skip this become brittle within weeks." },
  { time: "19:00", label: "DINNER", dur: "45 min", tag: "REST",
    items: ["Lighter than lunch — protein + vegetables", "Eat with people. Not at a desk, not with screens.", "Optional snack if hungry: nuts or plain yogurt only"],
    why: "Heavy dinners destroy deep sleep. Lighter evenings support recovery." },
  { time: "20:00", label: "LANGUAGE STUDY", dur: "60 min", tag: "LIFE",
    items: ["Alternate: French (Talloires) / German (Spiez)", "20 min structured lesson", "20 min YouTube content in target language", "20 min speaking aloud — describe your day"],
    why: "Language fluency is the difference between living in France and being a tourist who pays rent." },
  { time: "21:00", label: "WIND DOWN", dur: "55 min", tag: "REST",
    items: ["EVENING SKIN: cleanser → aloe vera → moisturiser (5 min)", "No screens after 21:30", "Light stretching — 10 min", "Read your vision: Spiez, Lake Thun, the Urus, the life"],
    why: "Screens block melatonin for 90 min. Sleep before 22:30 doubles deep sleep." },
  { time: "22:00", label: "SLEEP — 8 HOURS", dur: "8 hrs", tag: "REST",
    items: ["Room dark and cool — 18°C optimal", "Phone in another room", "Brain consolidates Flowity patterns while you sleep"],
    why: "Sleep is the most powerful performance tool available. And it is free." },
];

const strategy = [
  { phase: "01", title: "FOUNDATION", period: "Months 1–3", target: "First paying client", color: C.goldDim,
    actions: [
      { cat: "PRODUCT", items: ["Build free audit pipeline end-to-end — your sales weapon", "Create 3 Pulse Deck templates deliverable in under 8 hours", "Set up Stripe, basic website, LinkedIn company page", "Build Signal Engine v1 — ingest CSV/text and generate insights"] },
      { cat: "SALES", items: ["Run 3 free audits on real companies — even cold outreach", "Get written testimonials from every audit", "Your offer: 'I'll analyse your customer signals free, no strings'"] },
      { cat: "CONTENT", items: ["Post on LinkedIn every single day — thinking not product", "Format: problem → insight → what AI brain would do differently", "Goal: 500 meaningful followers by end of month 3"] },
      { cat: "STUDY", items: ["Read SPIN Selling by Neil Rackham", "Study LinkedIn algorithm — reach, engagement, timing", "Value-based pricing fundamentals"] },
    ]
  },
  { phase: "02", title: "FIRST REVENUE", period: "Months 4–7", target: "€5–12k/month", color: C.gold,
    actions: [
      { cat: "PRODUCT", items: ["Launch Interpret tier €1,199/month", "Build Cortex Interpretation Engine — multiple signal sources", "Improve Pulse Deck until clients forward it to investors", "Add Slack/email delivery of weekly alerts"] },
      { cat: "SALES", items: ["Convert 2 free audit clients to Interpret tier", "Publish first anonymised case study", "Introduce Brain tier €3,499 to best Interpret client", "Price new prospects at €3,499+ — anchor high"] },
      { cat: "CONTENT", items: ["One long-form LinkedIn article per week", "Own the term 'Executive Intelligence' — document the category", "Engage in SaaS founder Slack groups and communities"] },
      { cat: "STUDY", items: ["Read Obviously Awesome by April Dunford", "Customer success and onboarding — value in week 1", "Cold email copywriting — The Cold Email Manifesto"] },
    ]
  },
  { phase: "03", title: "MOMENTUM", period: "Months 8–13", target: "€15–22k/month", color: C.blue,
    actions: [
      { cat: "PRODUCT", items: ["Launch Brain Full Service €3,499–5,000/month", "Multi-channel ingestion: tickets + reviews + Slack + CRM simultaneously", "Real-time alerts when critical signals detected", "First enterprise pilot — build custom €8–12k tier"] },
      { cat: "SALES", items: ["Hire one part-time analyst for delivery leverage", "Referral system — every client introduces one founder", "Target 1 enterprise client at €8k+/month", "Attend virtual SaaS events — be visible"] },
      { cat: "CONTENT", items: ["Publish 2 detailed case studies", "Guest posts or podcast appearances in founder communities", "Launch 'The Intelligence Brief' — weekly email newsletter"] },
      { cat: "STUDY", items: ["Read Monetizing Innovation — Madhavan Ramanujam", "Hiring and delegation for freelancers", "Enterprise sales — longer cycles, multiple stakeholders"] },
    ]
  },
  { phase: "04", title: "PRE-DEPARTURE", period: "Months 14–20", target: "€30k+/month stable", color: C.green,
    actions: [
      { cat: "PRODUCT", items: ["Enterprise tier live: €8,000–12,000+/month custom", "Team of 2–3 delivering without you in every detail", "Flowity runs without you for 2 weeks — test before move", "Build proprietary Flowity Industry Intelligence Index"] },
      { cat: "SALES", items: ["Pipeline self-generates from content and referrals", "Push enterprise hard — 2 clients at €10k = €20k alone", "New clients at €5,000–12,000+ only — stop underselling", "You close deals, others prospect"] },
      { cat: "CONTENT", items: ["You are the known voice in Executive Intelligence", "LinkedIn 5,000+ relevant followers, consistent inbound", "Apply as speaker at SaaS conferences"] },
      { cat: "STUDY", items: ["French accountant hired before moving", "Swiss business structure for Spiez transition", "Index fund investing — MSCI World, Swiss banking basics"] },
    ]
  },
];

const milestones = [
  { month: "M2", event: "First free audit delivered + genuine testimonial", revenue: "€0", status: "foundation",
    next: "Now run 2 more free audits immediately. Refine the Pulse Deck until it surprises people." },
  { month: "M3", event: "3 free audits done. Pulse Deck quality refined.", revenue: "€0", status: "foundation",
    next: "Reach out to all 3 audit clients and propose the Interpret tier. At least 1 should say yes." },
  { month: "M4", event: "First paying client — Interpret tier €1,199", revenue: "€1,199", status: "revenue",
    next: "Deliver so well that this client refers someone within 60 days. Ask them directly." },
  { month: "M5", event: "3 paying clients. First case study published.", revenue: "€3,597", status: "revenue",
    next: "Propose Brain tier to your best Interpret client. Show them the intelligence gap they're missing." },
  { month: "M6", event: "First Brain tier client. Content gaining traction.", revenue: "€6,000–8,000", status: "revenue",
    next: "Hire a part-time analyst. You cannot scale delivery alone past €10k." },
  { month: "M8", event: "5 clients mixed tiers. Part-time analyst hired.", revenue: "€10,000+", status: "scaling",
    next: "Begin your first enterprise conversation. Target a Series B company with a clear churn problem." },
  { month: "M10", event: "First enterprise conversation. Referrals starting.", revenue: "€15,000+", status: "scaling",
    next: "Close the enterprise deal. One client at €8-10k alone changes your trajectory permanently." },
  { month: "M12", event: "First enterprise client signed. Team of 2.", revenue: "€20,000+", status: "scaling",
    next: "Build the referral machine. Every client should introduce one founder in the next 30 days." },
  { month: "M15", event: "Pipeline self-generating. Inbound leads from content.", revenue: "€25,000+", status: "departure",
    next: "Apply for Italian citizenship now if not already done. Hire French accountant. Plan the move." },
  { month: "M18", event: "Enterprise tier fully active. Italian citizenship in process.", revenue: "€30,000+", status: "departure",
    next: "Book a trip to Talloires. Find the house. Start grandmother's car and house in Brazil." },
  { month: "M20", event: "Stable €30k+/month. Ready to move to Talloires.", revenue: "€30–50k", status: "departure",
    next: "You did it. Move. Keep building. Spiez is next." },
];

const tagColors = { BODY: C.red, GROW: C.purple, BUILD: C.blue, REST: C.green, LIFE: C.gold };
const statusColors = { foundation: C.muted, revenue: C.gold, scaling: C.blue, departure: C.green };

const TODAY = new Date().toISOString().split("T")[0];

function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }) + " " +
    d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

export default function FlowityMasterPlan() {
  const [tab, setTab] = useState("daily");
  const [dailyBlocks, setDailyBlocks] = useState({});
  const [stratChecks, setStratChecks] = useState({});
  const [mileChecks, setMileChecks] = useState({});
  const [historyLog, setHistoryLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [phaseOpen, setPhaseOpen] = useState(null);

  useEffect(() => { loadAll(); }, []);

  async function loadAll() {
    // Daily — reset if different day
    try {
      const r = await window.storage.get("daily-v1");
      if (r) {
        const d = JSON.parse(r.value);
        setDailyBlocks(d.date === TODAY ? (d.blocks || {}) : {});
      }
    } catch (_) { setDailyBlocks({}); }

    try {
      const r = await window.storage.get("strat-v1");
      if (r) setStratChecks(JSON.parse(r.value));
    } catch (_) {}

    try {
      const r = await window.storage.get("mile-v1");
      if (r) setMileChecks(JSON.parse(r.value));
    } catch (_) {}

    try {
      const r = await window.storage.get("history-v1");
      if (r) setHistoryLog(JSON.parse(r.value));
    } catch (_) {}

    setLoading(false);
  }

  async function addHistory(entry) {
    const newLog = [entry, ...historyLog].slice(0, 300);
    setHistoryLog(newLog);
    try { await window.storage.set("history-v1", JSON.stringify(newLog)); } catch (_) {}
  }

  async function removeHistory(id) {
    const newLog = historyLog.filter(h => h.id !== id);
    setHistoryLog(newLog);
    try { await window.storage.set("history-v1", JSON.stringify(newLog)); } catch (_) {}
  }

  async function toggleDaily(blockIdx) {
    const was = !!dailyBlocks[blockIdx];
    const newBlocks = { ...dailyBlocks, [blockIdx]: !was };
    if (was) delete newBlocks[blockIdx];
    setDailyBlocks(newBlocks);
    try { await window.storage.set("daily-v1", JSON.stringify({ date: TODAY, blocks: newBlocks })); } catch (_) {}
    const id = `daily-${blockIdx}-${TODAY}`;
    if (!was) await addHistory({ id, label: daily[blockIdx].label, category: "DAILY", completedAt: new Date().toISOString() });
    else await removeHistory(id);
  }

  async function toggleStrat(pi, ci, ii) {
    const key = `s-${pi}-${ci}-${ii}`;
    const was = !!stratChecks[key];
    const newS = { ...stratChecks, [key]: !was };
    if (was) delete newS[key];
    setStratChecks(newS);
    try { await window.storage.set("strat-v1", JSON.stringify(newS)); } catch (_) {}
    if (!was) await addHistory({ id: key, label: strategy[pi].actions[ci].items[ii], category: `PHASE ${strategy[pi].phase}`, completedAt: new Date().toISOString() });
    else await removeHistory(key);
  }

  async function toggleMile(idx) {
    const was = !!mileChecks[idx];
    const newM = { ...mileChecks, [idx]: !was ? new Date().toISOString() : null };
    if (was) delete newM[idx];
    setMileChecks(newM);
    try { await window.storage.set("mile-v1", JSON.stringify(newM)); } catch (_) {}
    const id = `mile-${idx}`;
    if (!was) await addHistory({ id, label: milestones[idx].event, category: "MILESTONE", completedAt: new Date().toISOString() });
    else await removeHistory(id);
  }

  // Progress calculations
  const dailyDoneCount = Object.values(dailyBlocks).filter(Boolean).length;
  const dailyPct = Math.round((dailyDoneCount / daily.length) * 100);

  const phaseProgress = strategy.map((phase, pi) => {
    let total = 0, done = 0;
    phase.actions.forEach((block, ci) => block.items.forEach((_, ii) => {
      total++;
      if (stratChecks[`s-${pi}-${ci}-${ii}`]) done++;
    }));
    return { total, done, pct: Math.round((done / total) * 100) };
  });

  // First incomplete phase
  const activePhaseIdx = phaseProgress.findIndex(p => p.done < p.total);

  // Next uncompleted strategy item for daily bonus queue
  const nextStratItem = (() => {
    for (let pi = 0; pi < strategy.length; pi++) {
      for (let ci = 0; ci < strategy[pi].actions.length; ci++) {
        for (let ii = 0; ii < strategy[pi].actions[ci].items.length; ii++) {
          if (!stratChecks[`s-${pi}-${ci}-${ii}`]) {
            return { pi, ci, ii, text: strategy[pi].actions[ci].items[ii], phase: strategy[pi].phase, cat: strategy[pi].actions[ci].cat };
          }
        }
      }
    }
    return null;
  })();

  const tabs = [
    { id: "daily", label: "DAILY" },
    { id: "strategy", label: "STRATEGY" },
    { id: "milestones", label: "MILESTONES" },
    { id: "done", label: "DONE" },
  ];

  if (loading) return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: C.gold, fontFamily: "'Courier New', monospace", fontSize: "11px", letterSpacing: "4px" }}>LOADING...</div>
    </div>
  );

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'Georgia', serif" }}>
      {/* Header */}
      <div style={{ padding: "32px 18px 18px", borderBottom: `1px solid ${C.border}`, background: `linear-gradient(180deg, #0D0A04 0%, ${C.bg} 100%)` }}>
        <div style={{ fontSize: "9px", letterSpacing: "5px", color: C.goldDim, fontFamily: "'Courier New', monospace", marginBottom: "8px" }}>
          FLOWITY AI · MASTER PLAN
        </div>
        <h1 style={{ fontSize: "clamp(18px, 5vw, 28px)", fontWeight: "400", letterSpacing: "-0.5px", margin: "0 0 4px 0" }}>
          Brazil → Talloires → <span style={{ color: C.gold }}>Spiez</span>
        </h1>

        {/* Progress bar */}
        <div style={{ marginTop: "14px", marginBottom: "18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <div style={{ fontSize: "10px", color: C.muted, fontFamily: "'Courier New', monospace", letterSpacing: "2px" }}>TODAY</div>
            <div style={{ fontSize: "10px", color: C.gold, fontFamily: "'Courier New', monospace" }}>{dailyDoneCount}/{daily.length} · {dailyPct}%</div>
          </div>
          <div style={{ background: C.dim, borderRadius: "4px", height: "3px", overflow: "hidden" }}>
            <div style={{ width: `${dailyPct}%`, height: "100%", background: dailyPct === 100 ? C.green : C.gold, transition: "width 0.4s", borderRadius: "4px" }} />
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "3px", background: C.surface, borderRadius: "8px", padding: "3px", width: "fit-content", border: `1px solid ${C.border}` }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: "7px 13px", borderRadius: "5px", border: "none",
              background: tab === t.id ? C.gold : "transparent",
              color: tab === t.id ? C.bg : C.muted,
              cursor: "pointer", fontSize: "10px", letterSpacing: "2px",
              fontFamily: "'Courier New', monospace", fontWeight: "700", transition: "all 0.2s",
              position: "relative"
            }}>
              {t.label}
              {t.id === "done" && historyLog.length > 0 && (
                <span style={{
                  position: "absolute", top: "-4px", right: "-4px",
                  background: C.green, color: C.bg, borderRadius: "50%",
                  width: "14px", height: "14px", fontSize: "8px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: "700"
                }}>{historyLog.length > 99 ? "99" : historyLog.length}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* DAILY TAB */}
      {tab === "daily" && (
        <div style={{ padding: "16px" }}>
          {dailyDoneCount > 0 && dailyDoneCount < daily.length && (
            <div style={{ background: `${C.gold}0D`, border: `1px solid ${C.gold}33`, borderRadius: "10px", padding: "12px 14px", marginBottom: "14px" }}>
              <div style={{ fontSize: "10px", color: C.gold, fontFamily: "'Courier New', monospace", letterSpacing: "2px", marginBottom: "4px" }}>KEEP GOING</div>
              <div style={{ fontSize: "13px", color: "#C0BDB5" }}>{daily.length - dailyDoneCount} blocks remaining today.</div>
            </div>
          )}

          {dailyDoneCount === daily.length && (
            <div style={{ background: `${C.green}0D`, border: `1px solid ${C.green}44`, borderRadius: "10px", padding: "14px", marginBottom: "14px" }}>
              <div style={{ fontSize: "10px", color: C.green, fontFamily: "'Courier New', monospace", letterSpacing: "2px", marginBottom: "6px" }}>✓ TODAY COMPLETE</div>
              <div style={{ fontSize: "13px", color: "#C0BDB5", marginBottom: "10px" }}>All blocks done. Excellent execution.</div>
              {nextStratItem && (
                <>
                  <div style={{ fontSize: "10px", color: C.gold, fontFamily: "'Courier New', monospace", letterSpacing: "2px", marginBottom: "6px" }}>BONUS — NEXT STRATEGY PRIORITY</div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Checkbox checked={!!stratChecks[`s-${nextStratItem.pi}-${nextStratItem.ci}-${nextStratItem.ii}`]} color={C.gold}
                      onClick={() => toggleStrat(nextStratItem.pi, nextStratItem.ci, nextStratItem.ii)} />
                    <div>
                      <div style={{ fontSize: "10px", color: C.goldDim, fontFamily: "'Courier New', monospace", marginBottom: "3px" }}>
                        PHASE {nextStratItem.phase} · {nextStratItem.cat}
                      </div>
                      <div style={{ fontSize: "13px", color: "#C8C4BC", lineHeight: "1.4" }}>{nextStratItem.text}</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {(() => {
            let shownMorning = false, shownAfternoon = false, shownEvening = false;
            return daily.map((item, i) => {
              const isAfternoon = item.label === "AFTERNOON SHIFT — BUILD";
              const isEvening = item.label === "PERSONAL TIME";
              const isFirst = i === 0;
              const isOpen = expanded === i;
              const isDone = !!dailyBlocks[i];
              const showMorning = isFirst && !shownMorning; if (showMorning) shownMorning = true;
              const showAfternoon = isAfternoon && !shownAfternoon; if (showAfternoon) shownAfternoon = true;
              const showEvening = isEvening && !shownEvening; if (showEvening) shownEvening = true;
              return (
                <div key={i}>
                  {showMorning && <SLabel label="MORNING" />}
                  {showAfternoon && <SLabel label="AFTERNOON" />}
                  {showEvening && <SLabel label="EVENING" />}
                  <div style={{
                    background: isDone ? `${C.surface}55` : C.surface,
                    border: `1px solid ${isDone ? C.dim : (isOpen ? tagColors[item.tag] + "44" : C.border)}`,
                    borderLeft: `3px solid ${isDone ? C.dim : tagColors[item.tag]}`,
                    borderRadius: "10px", padding: "12px", marginBottom: "8px",
                    opacity: isDone ? 0.6 : 1, transition: "all 0.2s"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div onClick={() => toggleDaily(i)} style={{ flexShrink: 0 }}>
                        <Checkbox checked={isDone} color={tagColors[item.tag]} />
                      </div>
                      <div style={{ flex: 1, cursor: "pointer" }} onClick={() => setExpanded(isOpen ? null : i)}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                            <div style={{ fontSize: "10px", letterSpacing: "2px", fontFamily: "'Courier New', monospace", fontWeight: "700", textDecoration: isDone ? "line-through" : "none", color: isDone ? C.muted : C.text }}>
                              {item.time} · {item.label}
                            </div>
                            <div style={{ fontSize: "10px", color: C.muted, fontFamily: "'Courier New', monospace", marginTop: "2px" }}>{item.dur}</div>
                          </div>
                          <div style={{ color: isOpen ? tagColors[item.tag] : C.dim, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", fontSize: "12px" }}>↓</div>
                        </div>
                      </div>
                    </div>
                    {isOpen && !isDone && (
                      <div style={{ marginTop: "12px", paddingLeft: "28px" }}>
                        {item.items.map((it, j) => (
                          <div key={j} style={{ display: "flex", gap: "8px", marginBottom: "7px" }}>
                            <div style={{ color: tagColors[item.tag], fontSize: "10px", fontFamily: "'Courier New', monospace", marginTop: "3px", flexShrink: 0 }}>›</div>
                            <div style={{ fontSize: "13px", color: "#C8C4BC", lineHeight: "1.5" }}>{it}</div>
                          </div>
                        ))}
                        <div style={{ background: `${tagColors[item.tag]}0C`, border: `1px solid ${tagColors[item.tag]}20`, borderRadius: "8px", padding: "10px", marginTop: "8px", fontSize: "12px", color: C.muted, fontStyle: "italic", lineHeight: "1.6" }}>
                          → {item.why}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            });
          })()}
        </div>
      )}

      {/* STRATEGY TAB */}
      {tab === "strategy" && (
        <div style={{ padding: "16px" }}>
          <div style={{ background: C.surface, border: `1px solid ${C.gold}33`, borderRadius: "10px", padding: "14px", marginBottom: "14px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "3px", color: C.gold, fontFamily: "'Courier New', monospace", marginBottom: "6px" }}>THE ONLY GOAL</div>
            <div style={{ fontSize: "14px", color: C.text, lineHeight: "1.6" }}>
              Get 3 clients to say <em>"Flowity showed us something our team couldn't see."</em>
            </div>
          </div>

          {strategy.map((phase, pi) => {
            const prog = phaseProgress[pi];
            const isComplete = prog.done === prog.total;
            const isActive = pi === activePhaseIdx;
            const isOpen = phaseOpen === pi;
            return (
              <div key={pi} style={{ marginBottom: "10px" }}>
                {isActive && !isComplete && (
                  <div style={{ fontSize: "9px", letterSpacing: "3px", color: C.green, fontFamily: "'Courier New', monospace", marginBottom: "6px", paddingLeft: "4px" }}>
                    ▶ ACTIVE PHASE
                  </div>
                )}
                <div style={{
                  background: isComplete ? `${C.surface}55` : C.surface,
                  border: `1px solid ${isOpen ? phase.color + "55" : (isActive ? phase.color + "33" : C.border)}`,
                  borderLeft: `3px solid ${isComplete ? C.green : phase.color}`,
                  borderRadius: "10px", overflow: "hidden",
                  opacity: isComplete ? 0.7 : 1, transition: "all 0.2s"
                }}>
                  <div onClick={() => setPhaseOpen(isOpen ? null : pi)} style={{ padding: "14px", cursor: "pointer" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        {isComplete
                          ? <div style={{ fontSize: "16px", color: C.green }}>✓</div>
                          : <div style={{ fontFamily: "'Courier New', monospace", fontSize: "16px", color: phase.color, fontWeight: "700" }}>{phase.phase}</div>
                        }
                        <div>
                          <div style={{ fontSize: "12px", letterSpacing: "2px", fontFamily: "'Courier New', monospace", fontWeight: "700", textDecoration: isComplete ? "line-through" : "none", color: isComplete ? C.muted : C.text }}>
                            {phase.title}
                          </div>
                          <div style={{ fontSize: "10px", color: C.muted, fontFamily: "'Courier New', monospace", marginTop: "2px" }}>
                            {phase.period} · {prog.done}/{prog.total} done
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ fontSize: "11px", color: isComplete ? C.green : phase.color, fontFamily: "'Courier New', monospace", fontWeight: "700" }}>
                          {prog.pct}%
                        </div>
                        <div style={{ color: isOpen ? phase.color : C.dim, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>↓</div>
                      </div>
                    </div>
                    {/* Mini progress bar */}
                    <div style={{ background: C.dim, borderRadius: "3px", height: "2px", marginTop: "10px", overflow: "hidden" }}>
                      <div style={{ width: `${prog.pct}%`, height: "100%", background: isComplete ? C.green : phase.color, transition: "width 0.4s", borderRadius: "3px" }} />
                    </div>
                  </div>

                  {isOpen && (
                    <div style={{ padding: "0 14px 14px", borderTop: `1px solid ${C.border}` }}>
                      <div style={{ paddingTop: "12px" }}>
                        {phase.actions.map((block, ci) => (
                          <div key={ci} style={{ marginBottom: "14px" }}>
                            <div style={{ fontSize: "9px", letterSpacing: "3px", color: phase.color, fontFamily: "'Courier New', monospace", marginBottom: "8px" }}>
                              {block.cat}
                            </div>
                            {block.items.map((item, ii) => {
                              const key = `s-${pi}-${ci}-${ii}`;
                              const done = !!stratChecks[key];
                              return (
                                <div key={ii} style={{ display: "flex", gap: "10px", marginBottom: "8px", alignItems: "flex-start" }}>
                                  <div onClick={() => toggleStrat(pi, ci, ii)} style={{ flexShrink: 0, marginTop: "2px" }}>
                                    <Checkbox checked={done} color={phase.color} />
                                  </div>
                                  <div style={{ fontSize: "13px", color: done ? C.muted : "#C8C4BC", lineHeight: "1.5", textDecoration: done ? "line-through" : "none", transition: "all 0.2s" }}>
                                    {item}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ))}

                        {isComplete && pi + 1 < strategy.length && (
                          <div style={{ background: `${C.green}0D`, border: `1px solid ${C.green}33`, borderRadius: "8px", padding: "12px", marginTop: "4px" }}>
                            <div style={{ fontSize: "10px", color: C.green, fontFamily: "'Courier New', monospace", letterSpacing: "2px", marginBottom: "4px" }}>✓ PHASE COMPLETE — NEXT UP</div>
                            <div style={{ fontSize: "13px", color: "#C0BDB5" }}>
                              Move to <strong style={{ color: strategy[pi + 1].color }}>{strategy[pi + 1].title}</strong> — {strategy[pi + 1].period}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MILESTONES TAB */}
      {tab === "milestones" && (
        <div style={{ padding: "16px" }}>
          <div style={{ fontSize: "11px", color: C.muted, fontFamily: "'Courier New', monospace", letterSpacing: "2px", marginBottom: "14px" }}>
            {Object.keys(mileChecks).length}/{milestones.length} MILESTONES REACHED
          </div>

          {milestones.map((m, i) => {
            const done = !!mileChecks[i];
            const isNext = !done && i === milestones.findIndex((_, idx) => !mileChecks[idx]);
            const prevDone = i === 0 || !!mileChecks[i - 1];
            return (
              <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "6px" }}>
                {/* Line */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{
                    width: "30px", height: "30px", borderRadius: "50%",
                    background: done ? statusColors[m.status] + "33" : (isNext ? statusColors[m.status] + "15" : "transparent"),
                    border: `2px solid ${done ? statusColors[m.status] : (isNext ? statusColors[m.status] + "88" : C.border)}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "9px", color: done ? statusColors[m.status] : (isNext ? statusColors[m.status] : C.muted),
                    fontFamily: "'Courier New', monospace", fontWeight: "700", cursor: "pointer",
                    transition: "all 0.2s"
                  }} onClick={() => toggleMile(i)}>
                    {done ? "✓" : m.month}
                  </div>
                  {i < milestones.length - 1 && (
                    <div style={{ width: "1px", height: "20px", background: done ? statusColors[m.status] + "44" : C.border, margin: "3px 0" }} />
                  )}
                </div>

                <div style={{
                  background: C.surface, border: `1px solid ${done ? C.dim : (isNext ? statusColors[m.status] + "33" : C.border)}`,
                  borderRadius: "10px", padding: "12px", flex: 1, marginBottom: "4px",
                  opacity: done ? 0.55 : 1, transition: "all 0.2s"
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <div onClick={() => toggleMile(i)} style={{ flexShrink: 0, marginTop: "2px" }}>
                      <Checkbox checked={done} color={statusColors[m.status]} />
                    </div>
                    <div style={{ flex: 1 }}>
                      {isNext && <div style={{ fontSize: "9px", color: statusColors[m.status], fontFamily: "'Courier New', monospace", letterSpacing: "2px", marginBottom: "4px" }}>▶ NEXT TARGET</div>}
                      <div style={{ fontSize: "13px", color: done ? C.muted : C.text, lineHeight: "1.4", textDecoration: done ? "line-through" : "none", marginBottom: "4px" }}>
                        {m.event}
                      </div>
                      <div style={{ fontSize: "11px", fontFamily: "'Courier New', monospace", color: done ? C.muted : statusColors[m.status], fontWeight: "700", marginBottom: done && mileChecks[i] ? "4px" : "0" }}>
                        {m.revenue}
                      </div>
                      {done && mileChecks[i] && (
                        <div style={{ fontSize: "10px", color: C.muted, fontFamily: "'Courier New', monospace" }}>
                          ✓ {formatTime(mileChecks[i])}
                        </div>
                      )}
                      {/* Next step queue - shows after checking */}
                      {!done && isNext && (
                        <div style={{ background: `${statusColors[m.status]}0C`, border: `1px solid ${statusColors[m.status]}22`, borderRadius: "6px", padding: "8px", marginTop: "8px" }}>
                          <div style={{ fontSize: "10px", color: statusColors[m.status], fontFamily: "'Courier New', monospace", letterSpacing: "1px", marginBottom: "3px" }}>ONCE DONE →</div>
                          <div style={{ fontSize: "12px", color: "#B0ACA4", lineHeight: "1.5" }}>{m.next}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DONE TAB */}
      {tab === "done" && (
        <div style={{ padding: "16px" }}>
          {historyLog.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <div style={{ fontSize: "28px", marginBottom: "12px", opacity: 0.3 }}>◇</div>
              <div style={{ fontSize: "13px", color: C.muted, fontFamily: "'Courier New', monospace", letterSpacing: "2px" }}>
                NOTHING COMPLETED YET
              </div>
              <div style={{ fontSize: "12px", color: C.dim, marginTop: "8px" }}>Start checking off your daily blocks.</div>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <div style={{ fontSize: "11px", color: C.muted, fontFamily: "'Courier New', monospace", letterSpacing: "2px" }}>
                  {historyLog.length} ITEMS COMPLETED
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  {["DAILY", "MILESTONE", "PHASE 01", "PHASE 02", "PHASE 03", "PHASE 04"].map(cat => {
                    const count = historyLog.filter(h => h.category === cat).length;
                    if (count === 0) return null;
                    const color = cat === "DAILY" ? C.red : cat === "MILESTONE" ? C.green : C.gold;
                    return (
                      <div key={cat} style={{ fontSize: "9px", color, fontFamily: "'Courier New', monospace", background: color + "15", padding: "3px 7px", borderRadius: "4px", border: `1px solid ${color}33` }}>
                        {count}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Group by date */}
              {(() => {
                const groups = {};
                historyLog.forEach(h => {
                  const date = new Date(h.completedAt).toISOString().split("T")[0];
                  if (!groups[date]) groups[date] = [];
                  groups[date].push(h);
                });
                return Object.entries(groups).map(([date, items]) => {
                  const label = date === TODAY ? "TODAY" : new Date(date).toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short" }).toUpperCase();
                  return (
                    <div key={date} style={{ marginBottom: "16px" }}>
                      <div style={{ fontSize: "9px", letterSpacing: "3px", color: date === TODAY ? C.gold : C.muted, fontFamily: "'Courier New', monospace", marginBottom: "8px" }}>
                        {label} · {items.length} items
                      </div>
                      {items.map((h, i) => {
                        const catColor = h.category === "DAILY" ? C.red : h.category === "MILESTONE" ? C.green : C.gold;
                        return (
                          <div key={i} style={{
                            background: C.surface, border: `1px solid ${C.border}`,
                            borderLeft: `3px solid ${catColor}`,
                            borderRadius: "8px", padding: "10px 12px", marginBottom: "6px",
                            display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px"
                          }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: "9px", color: catColor, fontFamily: "'Courier New', monospace", letterSpacing: "2px", marginBottom: "3px" }}>
                                {h.category}
                              </div>
                              <div style={{ fontSize: "13px", color: "#C8C4BC", lineHeight: "1.4" }}>{h.label}</div>
                            </div>
                            <div style={{ fontSize: "10px", color: C.muted, fontFamily: "'Courier New', monospace", flexShrink: 0, marginTop: "2px" }}>
                              {new Date(h.completedAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                });
              })()}
            </>
          )}
        </div>
      )}

      <div style={{ padding: "20px", textAlign: "center", color: C.dim, fontSize: "9px", fontFamily: "'Courier New', monospace", letterSpacing: "3px", borderTop: `1px solid ${C.border}` }}>
        FLOWITY AI · 2026–2030 · BRAZIL → TALLOIRES → SPIEZ
      </div>
    </div>
  );
}

function Checkbox({ checked, color, onClick }) {
  return (
    <div onClick={onClick} style={{
      width: "18px", height: "18px", borderRadius: "4px", cursor: "pointer",
      border: `2px solid ${checked ? color : "#2A2A38"}`,
      background: checked ? color + "22" : "transparent",
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "all 0.2s", flexShrink: 0
    }}>
      {checked && <div style={{ fontSize: "10px", color }}>{"\u2713"}</div>}
    </div>
  );
}

function SLabel({ label }) {
  return (
    <div style={{ fontSize: "9px", letterSpacing: "4px", color: "#252535", fontFamily: "'Courier New', monospace", margin: "12px 0 8px 4px" }}>
      — {label} —
    </div>
  );
}
