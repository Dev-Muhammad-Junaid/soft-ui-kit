import { useState } from "react";
import {
  CalendarDays,
  MapPin,
  Plane,
  Users,
} from "../../components/icons";
import { BarChart, DonutChart, LineChart } from "../../components/charts/Charts";
import { GlassRing } from "../../components/effects/GlassRing";
import { SuggestedTasteBanner } from "../../components/saas/SuggestedTasteBanner";
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Calendar,
  Card,
  Combobox,
  DateField,
  DropdownMenu,
  HoverCard,
  Progress,
  Sheet,
  Table,
  Tabs,
  Toast,
} from "../../components/ui";
import { SAAS_PRESETS } from "../../theme/presets";

export function TravelDashboard() {
  const preset = SAAS_PRESETS.travel;
  const [tab, setTab] = useState("upcoming");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [dest, setDest] = useState("lisbon");
  const [date, setDate] = useState("2026-08-12");
  const [toast, setToast] = useState(false);

  return (
    <div>
      <header className="page-header">
        <div>
          <Breadcrumb items={[{ label: "SaaS" }, { label: "Travel CRM" }]} />
          <h1 style={{ marginTop: 8 }}>{preset.name}</h1>
          <p>{preset.tagline}</p>
        </div>
        <div className="page-actions">
          <DropdownMenu
            trigger={<Button variant="secondary">Actions</Button>}
            items={[
              { label: "Export itineraries", onSelect: () => setToast(true) },
              { label: "Assign concierge", onSelect: () => setSheetOpen(true) },
            ]}
          />
          <Button leftIcon={<Plane size={16} />} onClick={() => setSheetOpen(true)}>
            New trip
          </Button>
        </div>
      </header>

      <SuggestedTasteBanner presetId="travel" />

      <div className="grid-4" style={{ marginTop: 18, marginBottom: 18 }}>
        {[
          { label: "Active trips", value: "128", icon: Plane, tone: "sky" },
          { label: "Guests in care", value: "842", icon: Users, tone: "mint" },
          { label: "Departures (7d)", value: "36", icon: CalendarDays, tone: "peach" },
          { label: "Top region", value: "EU", icon: MapPin, tone: "lavender" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="stat-card is-hoverable" padded>
              <div className="row" style={{ justifyContent: "space-between" }}>
                <span className="stat-card__label">{s.label}</span>
                <GlassRing size={52} tone={s.tone} soft>
                  <Icon size={20} strokeWidth={1.75} />
                </GlassRing>
              </div>
              <span className="stat-card__value">{s.value}</span>
            </Card>
          );
        })}
      </div>

      <div className="grid-2">
        <Card title="Booking pace" description="Confirmed bookings / week" className="is-hoverable">
          <LineChart
            fill
            values={[18, 22, 19, 28, 31, 27, 36, 41, 38, 44, 49, 53]}
            labels={["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"]}
            formatValue={(v) => `${v} trips`}
          />
        </Card>
        <Card title="Destination mix" description="Share of active trips" className="is-hoverable">
          <DonutChart
            centerLabel="Trips"
            centerValue="128"
            segments={[
              { label: "Europe", value: 48, color: "#38bdf8" },
              { label: "APAC", value: 32, color: "#a78bfa" },
              { label: "Americas", value: 28, color: "#34d399" },
              { label: "MENA", value: 20, color: "#fb923c" },
            ]}
          />
        </Card>
      </div>

      <div className="section-title">Concierge desk</div>
      <div className="grid-2">
        <Card title="Trip planner" className="is-hoverable">
          <div className="stack">
            <Combobox
              label="Destination"
              value={dest}
              onChange={setDest}
              options={[
                { value: "lisbon", label: "Lisbon escape" },
                { value: "kyoto", label: "Kyoto spring" },
                { value: "bali", label: "Bali retreat" },
                { value: "reykjavik", label: "Reykjavik lights" },
              ]}
            />
            <DateField label="Departure" value={date} onChange={(e) => setDate(e.target.value)} />
            <Calendar value={date} onChange={setDate} />
            <Button onClick={() => setToast(true)}>Hold inventory</Button>
          </div>
        </Card>

        <Card title="Guest roster" className="is-hoverable" padded={false}>
          <div style={{ padding: 18 }}>
            <Tabs
              value={tab}
              onChange={setTab}
              tabs={[
                {
                  id: "upcoming",
                  label: "Upcoming",
                  content: (
                    <Table
                      columns={[
                        {
                          key: "guest",
                          label: "Guest",
                          render: (r) => (
                            <HoverCard
                              trigger={
                                <div className="row">
                                  <Avatar name={r.guest} size="sm" />
                                  {r.guest}
                                </div>
                              }
                            >
                              Prefers {r.pref}. VIP tier {r.tier}.
                            </HoverCard>
                          ),
                        },
                        { key: "trip", label: "Trip" },
                        {
                          key: "status",
                          label: "Status",
                          render: (r) => <Badge tone="accent">{r.status}</Badge>,
                        },
                      ]}
                      rows={[
                        { id: 1, guest: "Elena Voss", trip: "Lisbon", status: "Confirmed", pref: "ocean view", tier: "Gold" },
                        { id: 2, guest: "Noah Park", trip: "Kyoto", status: "Briefing", pref: "tea houses", tier: "Silver" },
                        { id: 3, guest: "Mia Santos", trip: "Bali", status: "Deposit", pref: "villas", tier: "Gold" },
                      ]}
                    />
                  ),
                },
                {
                  id: "care",
                  label: "In care",
                  content: (
                    <div className="stack">
                      <Progress label="Airport transfers booked" value={82} />
                      <Progress label="Dining reservations" value={64} />
                      <BarChart values={[12, 18, 9, 22, 15]} labels={["Mon", "Tue", "Wed", "Thu", "Fri"]} />
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </Card>
      </div>

      <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Create trip">
        <div className="stack">
          <Combobox
            label="Package"
            value={dest}
            onChange={setDest}
            options={[
              { value: "lisbon", label: "Lisbon escape" },
              { value: "kyoto", label: "Kyoto spring" },
              { value: "bali", label: "Bali retreat" },
            ]}
          />
          <DateField label="Start date" value={date} onChange={(e) => setDate(e.target.value)} />
          <Button
            onClick={() => {
              setSheetOpen(false);
              setToast(true);
            }}
          >
            Save draft
          </Button>
        </div>
      </Sheet>
      <Toast open={toast} message="Travel workspace updated" onClose={() => setToast(false)} />
    </div>
  );
}
