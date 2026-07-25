import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, SlidersHorizontal } from "../components/icons";
import { GlassOrbField, GlassRing } from "../components/effects/GlassRing";
import { PlaygroundDrawer } from "../components/playground/PlaygroundDrawer";
import { ThemeFab } from "../components/layout/ThemeFab";
import {
  Button,
  Card,
  Checkbox,
  Input,
  OtpInput,
  Separator,
  Tabs,
} from "../components/ui";

export function SignupPage() {
  const [tab, setTab] = useState("email");
  const [otp, setOtp] = useState("");
  const [playgroundOpen, setPlaygroundOpen] = useState(false);

  return (
    <div className="marketing marketing--auth">
      <GlassOrbField />
      <div className="auth-layout">
        <aside className="auth-aside glass-surface sheen">
          <GlassRing size={56} tone="lavender" active>
            <Sparkles size={22} />
          </GlassRing>
          <h1>Build soft products faster</h1>
          <p>
            Sign up to explore Travel CRM, Ledger Finance, and Flowboard —
            all sharing one themed component system.
          </p>
          <ul className="marketing-checks">
            <li>Live Taste playground on every page</li>
            <li>Five themes · Shift+1–5 to switch</li>
            <li>Charts, forms, overlays, kanban</li>
          </ul>
        </aside>

        <Card className="auth-card" title="Create account" description="Soft UI Kit workspace">
          <Tabs
            value={tab}
            onChange={setTab}
            tabs={[
              {
                id: "email",
                label: "Email",
                content: (
                  <div className="stack">
                    <Input label="Full name" placeholder="Jordan Lee" />
                    <Input label="Work email" type="email" placeholder="you@studio.dev" />
                    <Input label="Password" type="password" placeholder="••••••••" />
                    <Checkbox label="Send me product tips" defaultChecked />
                    <Button>Create account</Button>
                    <Link className="ui-btn ui-btn--secondary ui-btn--md" to="/ui">
                      Continue to dashboard
                    </Link>
                  </div>
                ),
              },
              {
                id: "otp",
                label: "OTP",
                content: (
                  <div className="stack">
                    <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 13 }}>
                      Enter the 6-digit code we emailed you.
                    </p>
                    <OtpInput value={otp} onChange={setOtp} />
                    <Button disabled={otp.length < 6}>Verify & continue</Button>
                    <Link className="ui-btn ui-btn--ghost ui-btn--md" to="/ui">
                      Skip to dashboard
                    </Link>
                  </div>
                ),
              },
            ]}
          />
          <Separator label="Or" />
          <Button variant="secondary">Continue with Google</Button>
          <p style={{ margin: "14px 0 0", fontSize: 13, color: "var(--ink-muted)" }}>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </Card>
      </div>

      <div className="fab-stack">
        <ThemeFab />
        <button
          type="button"
          className={`taste-fab glass sheen${playgroundOpen ? " is-active" : ""}`}
          onClick={() => setPlaygroundOpen((open) => !open)}
          aria-label={playgroundOpen ? "Close taste playground" : "Open taste playground"}
          aria-pressed={playgroundOpen}
        >
          <SlidersHorizontal size={18} />
          <span>Taste</span>
        </button>
      </div>
      <PlaygroundDrawer open={playgroundOpen} onClose={() => setPlaygroundOpen(false)} />
    </div>
  );
}

export function LoginPage() {
  const [playgroundOpen, setPlaygroundOpen] = useState(false);
  return (
    <div className="marketing marketing--auth">
      <GlassOrbField />
      <div className="auth-layout auth-layout--single">
        <Card className="auth-card" title="Welcome back" description="Log in to Soft UI Kit">
          <div className="stack">
            <Input label="Email" type="email" placeholder="you@studio.dev" />
            <Input label="Password" type="password" placeholder="••••••••" />
            <Button>Log in</Button>
            <Link className="ui-btn ui-btn--secondary ui-btn--md" to="/ui">
              Continue to dashboard
            </Link>
            <p style={{ margin: 0, fontSize: 13, color: "var(--ink-muted)" }}>
              New here? <Link to="/signup">Create an account</Link>
            </p>
          </div>
        </Card>
      </div>
      <div className="fab-stack">
        <ThemeFab />
        <button
          type="button"
          className={`taste-fab glass sheen${playgroundOpen ? " is-active" : ""}`}
          onClick={() => setPlaygroundOpen((open) => !open)}
          aria-label={playgroundOpen ? "Close taste playground" : "Open taste playground"}
          aria-pressed={playgroundOpen}
        >
          <SlidersHorizontal size={18} />
          <span>Taste</span>
        </button>
      </div>
      <PlaygroundDrawer open={playgroundOpen} onClose={() => setPlaygroundOpen(false)} />
    </div>
  );
}
