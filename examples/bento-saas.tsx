'use client';

/**
 * MORSE — Sound design library workflow for game studios
 *
 * Demonstrates the Bento mode of the `modern-frontend` skill.
 * Five distinct card archetypes, each in its own memoized leaf
 * component, wrapped by a Server-Component-shaped parent. Spring
 * physics everywhere; sub-300ms easing; labels outside cards.
 *
 * Domain: a workflow tool used by audio teams at independent
 * game studios — tagging, queueing renders, sourcing field
 * recordings, tracking which build each cue ships in.
 *
 * Usage in a Next.js app:
 *   1. npm install framer-motion
 *   2. Place at e.g. `app/morse/page.tsx`
 *   3. Visit /morse
 *
 * Tailwind v3 + default theme. For v4, switch the build chain
 * accordingly; class names stay the same.
 */

import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { memo, useEffect, useState } from 'react';

// =========================================================================
// TOKENS
// =========================================================================

const SPRING = { type: 'spring', stiffness: 100, damping: 20 } as const;
const SPRING_POP = { type: 'spring', stiffness: 380, damping: 22 } as const;

// =========================================================================
// PAGE — Server Component shape (the leaves are 'use client')
// =========================================================================

export default function MorseShowcase() {
  return (
    <main className="min-h-[100dvh] bg-[#f4f1ea] text-stone-900 py-24 px-6 selection:bg-stone-900 selection:text-stone-100">
      <div className="mx-auto max-w-7xl">
        <PageHead />

        <section className="mt-20 grid grid-cols-1 md:grid-cols-6 gap-x-6 gap-y-10">
          {/* Row 1: 4-col library, 2-col render queue */}
          <BentoSlot label="Library — auto-organised by last touch" colSpanMd={4}>
            <LibraryList />
          </BentoSlot>

          <BentoSlot label="Render queue — live" colSpanMd={2}>
            <RenderStatus />
          </BentoSlot>

          {/* Row 2: 2-col tag search, 4-col cue stream */}
          <BentoSlot label="Tag search · ⌘K from anywhere" colSpanMd={2}>
            <TagSearch />
          </BentoSlot>

          <BentoSlot label="Cue stream — shipped this week" colSpanMd={4}>
            <CueStream />
          </BentoSlot>

          {/* Row 3: full-width session ledger */}
          <BentoSlot label="Today's session — Coral build 0.247" colSpanMd={6}>
            <SessionLedger />
          </BentoSlot>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}

// =========================================================================
// PAGE HEAD
// =========================================================================

function PageHead() {
  return (
    <header>
      <div className="flex items-baseline gap-4 text-xs font-mono uppercase tracking-[0.22em] text-stone-500">
        <span className="text-stone-900 font-medium">Morse</span>
        <span>·</span>
        <span>Audio team · Coral build 0.247</span>
        <span>·</span>
        <span className="text-emerald-700">11 sessions today</span>
      </div>

      <h1 className="mt-5 max-w-3xl font-medium text-[clamp(2.25rem,4.6vw,3.9rem)] leading-[1.02] tracking-[-0.025em] text-stone-900">
        Every footstep, every door, every gunshot — kept where you left it.
      </h1>

      <p className="mt-4 max-w-xl text-stone-600 leading-relaxed">
        Morse is the room your audio team works out of. Library, render queue, session log, version trail — all on the same page, all addressable from <span className="font-mono text-stone-900">⌘K</span>.
      </p>
    </header>
  );
}

// =========================================================================
// BENTO SLOT — label below, gallery style
// =========================================================================

function BentoSlot({
  children,
  label,
  colSpanMd,
}: {
  children: React.ReactNode;
  label: string;
  colSpanMd: 2 | 3 | 4 | 6;
}) {
  const span = {
    2: 'md:col-span-2',
    3: 'md:col-span-3',
    4: 'md:col-span-4',
    6: 'md:col-span-6',
  }[colSpanMd];

  return (
    <div className={span}>
      <div className="rounded-[2.25rem] border border-stone-200 bg-white p-7 md:p-9 shadow-[0_18px_36px_-18px_rgba(15,15,15,0.08)] min-h-[340px] flex flex-col">
        {children}
      </div>
      <p className="mt-4 px-1 text-sm text-stone-600 tracking-tight">
        {label}
      </p>
    </div>
  );
}

// =========================================================================
// ARCHETYPE 1 — LIBRARY LIST (auto-sorting with layoutId)
// =========================================================================

type LibraryItem = {
  id: string;
  name: string;
  type: 'foley' | 'amb' | 'sfx' | 'voice';
  duration: string;
  touched: number;
};

const SEED_LIBRARY: LibraryItem[] = [
  { id: 'a', name: 'Cellar door — wet stone, slow', type: 'foley', duration: '0:04', touched: 1 },
  { id: 'b', name: 'Cargo loader — distant, idle', type: 'amb', duration: '1:18', touched: 0 },
  { id: 'c', name: 'Pistol slide — clean rack', type: 'sfx', duration: '0:01', touched: 2 },
  { id: 'd', name: 'Naya — "we should move"', type: 'voice', duration: '0:02', touched: 3 },
  { id: 'e', name: 'Rope tension — creak loop', type: 'foley', duration: '0:08', touched: 4 },
];

const TYPE_DOT: Record<LibraryItem['type'], string> = {
  foley: 'bg-amber-600',
  amb: 'bg-teal-600',
  sfx: 'bg-rose-600',
  voice: 'bg-violet-600',
};

const TYPE_LABEL: Record<LibraryItem['type'], string> = {
  foley: 'Foley',
  amb: 'Amb',
  sfx: 'SFX',
  voice: 'VO',
};

const LibraryList = memo(function LibraryList() {
  const [items, setItems] = useState(SEED_LIBRARY);

  useEffect(() => {
    const t = setInterval(() => {
      setItems((prev) => {
        const next = prev.map((it) => ({ ...it }));
        const i = Math.floor(Math.random() * next.length);
        next[i].touched = Math.max(...next.map((x) => x.touched)) + 1;
        return [...next].sort((x, y) => y.touched - x.touched);
      });
    }, 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <LayoutGroup>
      <div className="flex-1 flex flex-col">
        <div className="flex items-baseline justify-between mb-5">
          <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
            14,827 cues
          </p>
          <p className="text-xs font-mono text-stone-400">sorted · last touched</p>
        </div>

        <ul className="space-y-2">
          {items.map((item) => (
            <motion.li
              key={item.id}
              layout
              layoutId={item.id}
              transition={SPRING}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-stone-50 border border-stone-100 hover:border-stone-200 transition-colors"
            >
              <span className={`h-2 w-2 rounded-full shrink-0 ${TYPE_DOT[item.type]}`} />
              <span className="text-xs font-mono w-12 uppercase tracking-wider text-stone-400">
                {TYPE_LABEL[item.type]}
              </span>
              <span className="flex-1 text-sm text-stone-800">{item.name}</span>
              <span className="text-xs font-mono text-stone-400 tabular-nums">{item.duration}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </LayoutGroup>
  );
});

// =========================================================================
// ARCHETYPE 2 — RENDER STATUS (breathing indicator + overshoot toast)
// =========================================================================

const RENDER_EVENTS = [
  'Cellar door — rendered (4 takes)',
  'Cargo loader amb — bounced to OGG',
  'Pistol slide — added to Coral build',
  'Naya VO take 03 — replaced (was 02)',
];

const RenderStatus = memo(function RenderStatus() {
  const [showBadge, setShowBadge] = useState(false);
  const [eventIdx, setEventIdx] = useState(0);
  const [queue, setQueue] = useState(7);

  useEffect(() => {
    const t = setInterval(() => {
      setEventIdx((i) => (i + 1) % RENDER_EVENTS.length);
      setShowBadge(true);
      setQueue((q) => Math.max(0, q - 1));
      const hide = setTimeout(() => setShowBadge(false), 2400);
      return () => clearTimeout(hide);
    }, 4600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setQueue((q) => Math.min(12, q + 2));
    }, 9000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-stone-500 mb-5">
          Workers · 4 of 4
        </p>

        <div className="flex items-baseline gap-3">
          <p className="font-mono font-medium text-[2.5rem] leading-none text-stone-900 tabular-nums">
            {String(queue).padStart(2, '0')}
          </p>
          <p className="text-sm text-stone-600">in queue</p>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <div className="relative w-2.5 h-2.5">
            <motion.span
              animate={{ scale: [1, 1.9, 1], opacity: [0.55, 0, 0.55] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full bg-emerald-500"
            />
            <span className="absolute inset-0 rounded-full bg-emerald-500" />
          </div>
          <span className="text-sm text-stone-700">healthy · 218ms avg</span>
        </div>
      </div>

      <div className="mt-6 min-h-[44px]">
        <AnimatePresence mode="popLayout">
          {showBadge && (
            <motion.div
              key={eventIdx}
              initial={{ y: 14, opacity: 0, scale: 0.94 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -10, opacity: 0, scale: 0.96 }}
              transition={SPRING_POP}
              className="inline-flex items-start gap-2 max-w-full px-3.5 py-2 rounded-2xl bg-stone-900 text-white text-xs leading-snug"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0" />
              <span className="font-mono">{RENDER_EVENTS[eventIdx]}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});

// =========================================================================
// ARCHETYPE 3 — TAG SEARCH (typewriter cycle)
// =========================================================================

const SEARCH_PROMPTS = [
  'wet stone footsteps, slow',
  'distant industrial loop, no music',
  'all of Naya\'s lines tagged "tense"',
];

const TagSearch = memo(function TagSearch() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'holding' | 'deleting'>('typing');

  useEffect(() => {
    const current = SEARCH_PROMPTS[idx];

    if (phase === 'typing') {
      if (text.length < current.length) {
        const t = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          34 + Math.random() * 28
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase('holding'), 1700);
      return () => clearTimeout(t);
    }

    if (phase === 'holding') {
      const t = setTimeout(() => setPhase('deleting'), 700);
      return () => clearTimeout(t);
    }

    if (text.length > 0) {
      const t = setTimeout(() => setText(text.slice(0, -1)), 16);
      return () => clearTimeout(t);
    }
    setPhase('typing');
    setIdx((i) => (i + 1) % SEARCH_PROMPTS.length);
  }, [text, phase, idx]);

  return (
    <div className="flex-1 flex flex-col">
      <p className="text-xs uppercase tracking-[0.18em] text-stone-500 mb-5">
        Search the library
      </p>

      <div className="flex-1 flex items-start">
        <div className="w-full rounded-2xl border border-stone-200 bg-stone-50 p-5 font-mono text-sm leading-relaxed text-stone-800">
          <div className="flex items-baseline gap-2 text-stone-400">
            <span className="select-none">›</span>
            <span className="text-stone-800">{text}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.85, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block w-[2px] h-4 bg-stone-900 align-middle"
            />
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-1.5">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
        <span className="ml-2 text-xs text-stone-500">from any window</span>
      </div>
    </div>
  );
});

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center justify-center min-w-[1.6rem] h-7 px-2 rounded-md border border-stone-200 bg-white text-xs font-medium text-stone-700 shadow-[0_1px_0_0_rgba(15,15,15,0.05)]">
      {children}
    </span>
  );
}

// =========================================================================
// ARCHETYPE 4 — CUE STREAM (seamless infinite carousel of shipped cues)
// =========================================================================

type Cue = {
  id: number;
  name: string;
  build: string;
  bytes: string;
  status: 'shipped' | 'reviewing' | 'rejected';
};

const CUES: Cue[] = [
  { id: 1, name: 'Cellar door · slow', build: '0.247', bytes: '184k', status: 'shipped' },
  { id: 2, name: 'Cargo loader · idle', build: '0.247', bytes: '912k', status: 'shipped' },
  { id: 3, name: 'Pistol slide', build: '0.247', bytes: '38k', status: 'shipped' },
  { id: 4, name: 'Naya · "move"', build: '0.247', bytes: '74k', status: 'reviewing' },
  { id: 5, name: 'Rope tension loop', build: '0.246', bytes: '241k', status: 'shipped' },
  { id: 6, name: 'Glass shatter · close', build: '0.246', bytes: '52k', status: 'rejected' },
  { id: 7, name: 'Naya · "behind you"', build: '0.246', bytes: '88k', status: 'shipped' },
  { id: 8, name: 'Wind · pine canopy', build: '0.245', bytes: '1.4M', status: 'shipped' },
];

const STATUS_STYLE: Record<Cue['status'], string> = {
  shipped: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  reviewing: 'text-amber-700 bg-amber-50 border-amber-200',
  rejected: 'text-rose-700 bg-rose-50 border-rose-200',
};

const STATUS_LABEL: Record<Cue['status'], string> = {
  shipped: 'shipped',
  reviewing: 'in review',
  rejected: 'rejected',
};

const CueStream = memo(function CueStream() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-baseline justify-between mb-5">
        <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
          Last 7 days · 47 cues
        </p>
        <p className="text-xs font-mono text-stone-400">·LIVE</p>
      </div>

      <div className="flex-1 flex items-center overflow-hidden -mx-4">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
          className="flex gap-4 w-max pl-4"
        >
          {[...CUES, ...CUES].map((cue, i) => (
            <div
              key={`${cue.id}-${i}`}
              className="shrink-0 w-[220px] rounded-2xl border border-stone-200 bg-white px-5 py-4"
            >
              <p className="text-sm font-medium text-stone-900 leading-tight">
                {cue.name}
              </p>
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="font-mono text-[0.7rem] text-stone-500 tabular-nums">
                  build {cue.build}
                </span>
                <span className={`text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded-full border ${STATUS_STYLE[cue.status]}`}>
                  {STATUS_LABEL[cue.status]}
                </span>
              </div>
              <p className="mt-2 font-mono text-[0.65rem] text-stone-400 tabular-nums">
                {cue.bytes}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
});

// =========================================================================
// ARCHETYPE 5 — SESSION LEDGER (staggered highlight + floating toolbar)
// =========================================================================

const SESSION_LINES = [
  { time: '09:14', who: 'Mira',  what: 'pulled "cellar door — wet" from field trip 04' },
  { time: '09:28', who: 'Petros', what: 'added 3 takes to Naya · "we should move"' },
  { time: '10:01', who: 'Mira',  what: 'tagged 12 amb loops with "Coral · Act II"' },
  { time: '10:42', who: 'Yui',   what: 'rejected glass shatter v3 — too close-mic\'d' },
  { time: '11:19', who: 'Petros', what: 'merged "pistol slide" branch into build 0.247' },
];

const SessionLedger = memo(function SessionLedger() {
  const [highlightIdx, setHighlightIdx] = useState(-1);

  useEffect(() => {
    const t = setInterval(() => {
      setHighlightIdx((i) => (i >= SESSION_LINES.length - 1 ? -1 : i + 1));
    }, 1100);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex-1 flex flex-col relative">
      <div className="flex items-baseline justify-between mb-5">
        <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
          Coral build 0.247 · session log
        </p>
        <p className="text-xs font-mono text-stone-400">5 events today</p>
      </div>

      <ol className="flex-1 space-y-1 relative">
        {SESSION_LINES.map((line, i) => (
          <motion.li
            key={line.time}
            animate={{
              backgroundColor:
                highlightIdx === i
                  ? 'rgba(16, 185, 129, 0.10)'
                  : 'rgba(16, 185, 129, 0)',
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="grid grid-cols-[auto_auto_1fr] gap-4 items-baseline px-4 py-2.5 rounded-xl text-sm"
          >
            <span className="font-mono text-xs text-stone-400 tabular-nums">{line.time}</span>
            <span className="font-medium text-stone-900 min-w-[3.5rem]">{line.who}</span>
            <span className="text-stone-600">{line.what}</span>
          </motion.li>
        ))}

        <motion.div
          initial={{ y: 26, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...SPRING, delay: 0.3 }}
          className="absolute -bottom-3 right-0 flex gap-1.5 px-2.5 py-1.5 rounded-full bg-stone-900 shadow-[0_14px_30px_-10px_rgba(15,15,15,0.45)]"
        >
          <ToolbarPill>Replay</ToolbarPill>
          <ToolbarPill>Tag</ToolbarPill>
          <ToolbarPill>Branch</ToolbarPill>
          <ToolbarPill>Ship</ToolbarPill>
        </motion.div>
      </ol>
    </div>
  );
});

function ToolbarPill({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="px-3 py-1 rounded-full text-xs font-medium text-white/80 transition-colors duration-200 hover:text-white hover:bg-white/10 active:scale-[0.97]"
    >
      {children}
    </button>
  );
}

// =========================================================================
// FOOTER
// =========================================================================

function SiteFooter() {
  return (
    <footer className="mt-24 pt-8 border-t border-stone-300 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 text-xs font-mono uppercase tracking-[0.16em] text-stone-500">
      <div>
        <p className="font-medium text-stone-900 text-sm tracking-[0.06em]">Morse</p>
        <p className="mt-1">Built for small audio teams.</p>
      </div>
      <div className="flex flex-col md:items-end gap-1 text-stone-600">
        <span>Three studios · Sixty-one cues since Monday</span>
        <span>v1.4.18 · made on the train between Lisbon &amp; Porto</span>
      </div>
    </footer>
  );
}
