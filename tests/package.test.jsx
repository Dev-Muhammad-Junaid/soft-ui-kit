import { describe, expect, it, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {
  cn,
  Button,
  Card,
  Badge,
  Input,
  ThemeProvider,
  useTheme,
  THEMES,
  DEFAULT_TWEAKS,
  BarChart,
  Sparkline,
  searchComponents,
  COMPONENT_REGISTRY,
  DashboardShell,
  icons,
} from "../src/index.js";

describe("cn", () => {
  it("merges class names like shared utility helpers", () => {
    expect(cn("a", false && "b", "c")).toBe("a c");
    expect(cn("ui-btn", "ui-btn--primary")).toBe("ui-btn ui-btn--primary");
  });
});

describe("package exports", () => {
  it("exposes themes and default tweaks", () => {
    expect(THEMES.length).toBe(5);
    expect(DEFAULT_TWEAKS.glassBlur).toBeTypeOf("number");
  });

  it("exposes the component registry", () => {
    expect(COMPONENT_REGISTRY.length).toBeGreaterThan(40);
    const hits = searchComponents("button", "forms");
    expect(hits.some((c) => c.id === "button")).toBe(true);
  });

  it("exposes phosphor icon aliases", () => {
    expect(icons.Search).toBeTypeOf("function");
    expect(icons.Sparkles).toBeTypeOf("function");
  });
});

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("applies theme tokens to the document", () => {
    function Probe() {
      const { themeId, themes } = useTheme();
      return (
        <span data-testid="theme">
          {themeId}:{themes.length}
        </span>
      );
    }

    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("theme").textContent).toMatch(/soft-glass:5/);
    expect(document.documentElement.dataset.theme).toBe("soft-glass");
    expect(document.documentElement.style.getPropertyValue("--t-glass-blur")).toContain("px");
  });
});

describe("core components", () => {
  it("renders Button variants", () => {
    render(
      <>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
      </>,
    );
    expect(screen.getByText("Primary")).toBeInTheDocument();
    expect(screen.getByText("Secondary").closest("button")).toHaveClass("ui-btn--secondary");
  });

  it("renders Card, Badge, and Input", () => {
    render(
      <Card title="Panel" description="Glass surface">
        <Badge tone="accent">Live</Badge>
        <Input label="Email" placeholder="you@studio.dev" />
      </Card>,
    );
    expect(screen.getByText("Panel")).toBeInTheDocument();
    expect(screen.getByText("Live")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });
});

describe("charts", () => {
  it("renders bar and sparkline charts", () => {
    const { container } = render(
      <>
        <BarChart values={[1, 2, 3]} labels={["A", "B", "C"]} />
        <Sparkline values={[1, 3, 2, 5]} />
      </>,
    );
    expect(container.querySelector(".chart--bar")).toBeTruthy();
    expect(container.querySelector(".sparkline")).toBeTruthy();
  });
});

describe("DashboardShell", () => {
  it("collapses with a single icon control", () => {
    render(
      <MemoryRouter>
        <DashboardShell
          brand={{ name: "Studio", tag: "Demo" }}
          items={[{ to: "/a", label: "Overview", icon: icons.Home }]}
        >
          <div>Canvas</div>
        </DashboardShell>
      </MemoryRouter>,
    );

    expect(screen.getByText("Canvas")).toBeInTheDocument();
    const collapse = screen.getByLabelText("Collapse sidebar");
    fireEvent.click(collapse);
    expect(screen.getByLabelText("Expand sidebar")).toBeInTheDocument();
    expect(document.querySelector(".app-shell.is-collapsed")).toBeTruthy();
  });
});
