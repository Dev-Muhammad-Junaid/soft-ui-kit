import { useMemo, useState } from "react";
import {
  Flag,
  GripVertical,
  Plus,
  Timer,
} from "lucide-react";
import { BarChart, LineChart } from "../../components/charts/Charts";
import { GlassRing } from "../../components/effects/GlassRing";
import { SuggestedTasteBanner } from "../../components/saas/SuggestedTasteBanner";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Dialog,
  EmptyState,
  IconButton,
  Input,
  Progress,
  Radio,
  Textarea,
  Toast,
  Toggle,
} from "../../components/ui";
import { SAAS_PRESETS } from "../../theme/presets";

const INITIAL = {
  backlog: [
    { id: "t1", title: "Onboarding checklist", points: 3, assignee: "Maya", tag: "Growth" },
    { id: "t2", title: "Billing webhook retries", points: 5, assignee: "Jordan", tag: "Platform" },
  ],
  doing: [
    { id: "t3", title: "Kanban swimlanes", points: 8, assignee: "Sam", tag: "Design" },
    { id: "t4", title: "KPI sparkline pack", points: 5, assignee: "Alex", tag: "Data" },
  ],
  review: [
    { id: "t5", title: "Taste drawer a11y", points: 3, assignee: "Riley", tag: "Quality" },
  ],
  done: [
    { id: "t6", title: "Glass ring polish", points: 2, assignee: "You", tag: "Design" },
  ],
};

const COL_META = [
  { id: "backlog", label: "Backlog", tone: "neutral" },
  { id: "doing", label: "In progress", tone: "accent" },
  { id: "review", label: "Review", tone: "warning" },
  { id: "done", label: "Done", tone: "success" },
];

export function KanbanDashboard() {
  const preset = SAAS_PRESETS.kanban;
  const [board, setBoard] = useState(INITIAL);
  const [compact, setCompact] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [draft, setDraft] = useState({ title: "", points: "3", column: "backlog" });
  const [toast, setToast] = useState(false);

  const kpis = useMemo(() => {
    const all = Object.values(board).flat();
    const points = all.reduce((s, t) => s + t.points, 0);
    return [
      { label: "WIP", value: String(board.doing.length), hint: "cards" },
      { label: "Cycle pts", value: String(points), hint: "board" },
      { label: "Done", value: String(board.done.length), hint: "this sprint" },
      { label: "Blocked", value: "1", hint: "needs owner" },
    ];
  }, [board]);

  function moveCard(cardId, from, to) {
    if (from === to) return;
    setBoard((prev) => {
      const card = prev[from].find((c) => c.id === cardId);
      if (!card) return prev;
      return {
        ...prev,
        [from]: prev[from].filter((c) => c.id !== cardId),
        [to]: [card, ...prev[to]],
      };
    });
  }

  function addCard() {
    if (!draft.title.trim()) return;
    const id = `t${Date.now()}`;
    setBoard((prev) => ({
      ...prev,
      [draft.column]: [
        {
          id,
          title: draft.title.trim(),
          points: Number(draft.points) || 1,
          assignee: "You",
          tag: "New",
        },
        ...prev[draft.column],
      ],
    }));
    setDialogOpen(false);
    setDraft({ title: "", points: "3", column: "backlog" });
    setToast(true);
  }

  return (
    <div>
      <header className="page-header">
        <div>
          <h1>{preset.name}</h1>
          <p>{preset.tagline}</p>
        </div>
        <div className="page-actions">
          <Toggle pressed={compact} onPressedChange={setCompact}>
            Compact cards
          </Toggle>
          <Button leftIcon={<Plus size={16} />} onClick={() => setDialogOpen(true)}>
            Add card
          </Button>
        </div>
      </header>

      <SuggestedTasteBanner presetId="kanban" />

      <div className="grid-4" style={{ marginTop: 18, marginBottom: 18 }}>
        {kpis.map((k, i) => (
          <Card key={k.label} className="stat-card is-hoverable" padded>
            <span className="stat-card__label">{k.label}</span>
            <span className="stat-card__value">{k.value}</span>
            <span className="stat-card__delta up">{k.hint}</span>
            {i === 0 ? (
              <LineChart values={[2, 3, 4, 3, 5, 4, board.doing.length]} labels={[]} />
            ) : null}
            {i === 1 ? (
              <BarChart values={[8, 13, 11, 16, 14, Object.values(board).flat().reduce((s, t) => s + t.points, 0)]} labels={[]} />
            ) : null}
          </Card>
        ))}
      </div>

      <div className="kanban-board">
        {COL_META.map((col) => (
          <section key={col.id} className="kanban-col glass sheen">
            <header className="kanban-col__head">
              <strong>{col.label}</strong>
              <Badge tone={col.tone}>{board[col.id].length}</Badge>
            </header>
            <div className="kanban-col__list">
              {board[col.id].length === 0 ? (
                <EmptyState title="Empty" description="Move a card here" />
              ) : (
                board[col.id].map((card) => (
                  <article
                    key={card.id}
                    className={`kanban-card is-hoverable${compact ? " is-compact" : ""}`}
                  >
                    <div className="row" style={{ justifyContent: "space-between" }}>
                      <span className="row" style={{ color: "var(--ink-faint)" }}>
                        <GripVertical size={14} />
                        <Badge>{card.tag}</Badge>
                      </span>
                      <IconButton
                        label="Flag"
                        onClick={() => setToast(true)}
                      >
                        <Flag size={14} />
                      </IconButton>
                    </div>
                    <h4>{card.title}</h4>
                    {!compact ? (
                      <div className="row" style={{ justifyContent: "space-between" }}>
                        <span className="row">
                          <Avatar name={card.assignee} size="sm" />
                          <span style={{ fontSize: 12, color: "var(--ink-muted)" }}>{card.assignee}</span>
                        </span>
                        <span className="row" style={{ fontSize: 12, color: "var(--ink-muted)" }}>
                          <Timer size={12} /> {card.points} pts
                        </span>
                      </div>
                    ) : null}
                    <div className="kanban-card__moves">
                      {COL_META.filter((c) => c.id !== col.id).map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => moveCard(card.id, col.id, c.id)}
                        >
                          → {c.label}
                        </button>
                      ))}
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        ))}
      </div>

      <div className="section-title">Sprint health</div>
      <Card className="is-hoverable">
        <div className="grid-2">
          <div>
            <Progress label="Commitment burned" value={62} />
            <div style={{ height: 12 }} />
            <Progress label="Review queue" value={board.review.length * 20} />
          </div>
          <div className="row">
            <GlassRing size={56} tone="lavender" active>
              <Flag size={20} />
            </GlassRing>
            <div>
              <strong>Focus mode</strong>
              <p style={{ margin: "4px 0 0", color: "var(--ink-muted)", fontSize: 13 }}>
                WIP limited to keep delivery predictable. Use Taste to tune board glow.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="New board card"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addCard}>Add</Button>
          </>
        }
      >
        <div className="stack">
          <Input
            label="Title"
            value={draft.title}
            onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
          />
          <Input
            label="Points"
            value={draft.points}
            onChange={(e) => setDraft((d) => ({ ...d, points: e.target.value }))}
          />
          <Textarea label="Notes" placeholder="Optional context" />
          <div className="row">
            {COL_META.map((c) => (
              <Radio
                key={c.id}
                name="col"
                label={c.label}
                checked={draft.column === c.id}
                onChange={() => setDraft((d) => ({ ...d, column: c.id }))}
              />
            ))}
          </div>
        </div>
      </Dialog>
      <Toast open={toast} message="Board updated" onClose={() => setToast(false)} />
    </div>
  );
}
