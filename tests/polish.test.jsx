import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Alert,
  Breadcrumb,
  DataTable,
  IconButton,
  IconTile,
  Pagination,
  RadialBars,
  Select,
  Slider,
  ThemeProvider,
  useTheme,
  icons,
} from "../src/index.js";

describe("icon consistency", () => {
  it("gives every Alert tone an icon, overridable and hideable", () => {
    const { container, rerender } = render(<Alert tone="warning" title="Heads up" />);
    expect(container.querySelector(".ui-alert__icon svg")).toBeTruthy();
    expect(screen.getByRole("alert")).toBeInTheDocument();

    rerender(<Alert tone="info" title="Note" icon={false} />);
    expect(container.querySelector(".ui-alert__icon")).toBeNull();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders the Select chevron as a kit icon, not a CSS triangle", () => {
    const { container } = render(
      <Select label="Role" options={[{ value: "d", label: "Design" }]} />,
    );
    expect(container.querySelector(".ui-select-wrap__icon svg")).toBeTruthy();
    expect(screen.getByLabelText("Role").tagName).toBe("SELECT");
  });

  it("uses kit checkboxes and icon sort indicators in DataTable", () => {
    const { container } = render(
      <DataTable
        selectable
        columns={[{ key: "name", label: "Name", sortable: true }]}
        rows={[
          { id: "b", name: "Beta" },
          { id: "a", name: "Alpha" },
        ]}
      />,
    );
    expect(container.querySelectorAll(".ui-check").length).toBe(3);
    const sort = screen.getByRole("button", { name: "Sort by Name" });
    expect(sort.querySelector("svg")).toBeTruthy();
    expect(sort.textContent).not.toMatch(/[↑↓↕]/);
    fireEvent.click(sort);
    expect(sort).toHaveClass("is-sorted");
    expect(container.querySelector("tbody tr td:last-child").textContent).toBe("Alpha");
  });

  it("marks the current breadcrumb and page for assistive tech", () => {
    render(
      <>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Settings" }]} />
        <Pagination page={2} pages={3} onChange={() => {}} />
      </>,
    );
    expect(screen.getByText("Settings")).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "2" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument();
  });

  it("ships caret and menu icons", () => {
    for (const name of ["ChevronLeft", "ChevronRight", "ChevronUp", "ChevronsUpDown", "Menu", "AlertTriangle"]) {
      expect(icons[name]).toBeTypeOf("function");
    }
  });
});

describe("controls", () => {
  it("sizes IconButton on the shared control scale", () => {
    render(
      <>
        <IconButton label="Small">x</IconButton>
        <IconButton label="Large" size="lg">
          x
        </IconButton>
      </>,
    );
    expect(screen.getByLabelText("Small").className).not.toMatch(/--md/);
    expect(screen.getByLabelText("Large")).toHaveClass("ui-icon-btn--lg");
  });

  it("exposes the slider fill for the track", () => {
    render(<Slider label="Level" value={25} min={0} max={50} onChange={() => {}} />);
    expect(screen.getByRole("slider").style.getPropertyValue("--slider-fill")).toBe("50%");
  });

  it("applies per-series colors to radial bars", () => {
    const { container } = render(
      <RadialBars series={[{ label: "Move", value: 80, color: "rgb(255, 0, 0)" }]} />,
    );
    expect(container.querySelector(".radial-fill").style.stroke).toBe("rgb(255, 0, 0)");
  });
});

describe("ThemeProvider options", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  function Probe() {
    const { themeId } = useTheme();
    return <span data-testid="theme">{themeId}</span>;
  }

  it("honours defaultTheme and skips storage when persist is off", () => {
    render(
      <ThemeProvider defaultTheme="dusk" persist={false}>
        <Probe />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("theme").textContent).toBe("dusk");
    expect(document.documentElement.dataset.theme).toBe("dusk");
    expect(localStorage.getItem("suk-theme")).toBeNull();
  });

  it("seeds the accent hue from the active theme", () => {
    localStorage.setItem("suk-theme", "aurora");
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );
    expect(document.documentElement.style.getPropertyValue("--t-accent-h")).toBe("280");
  });

  it("ignores theme hotkeys when hotkeys is off", () => {
    render(
      <ThemeProvider defaultTheme="soft-glass" persist={false} hotkeys={false}>
        <Probe />
      </ThemeProvider>,
    );
    fireEvent.keyDown(window, { code: "Digit4", key: "$", shiftKey: true });
    expect(screen.getByTestId("theme").textContent).toBe("soft-glass");
  });

  it("survives storage that throws", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );
    expect(screen.getByTestId("theme").textContent).toBe("soft-glass");
  });
});

describe("effects removal", () => {
  it("no longer ships GlassRing, border-beam effects, or ring dials", async () => {
    const kit = await import("../src/index.js");
    expect(kit.GlassRing).toBeUndefined();
    expect(kit.DEFAULT_EFFECTS).toBeUndefined();
    expect(Object.keys(kit.DEFAULT_TWEAKS).some((k) => k.startsWith("ring"))).toBe(false);
  });

  it("drops stale ring dials from saved tweaks", () => {
    localStorage.setItem("suk-tweaks", JSON.stringify({ ringShine: 1.2, glassBlur: 30 }));
    function Probe() {
      const { tweaks } = useTheme();
      return <span data-testid="tw">{JSON.stringify(tweaks)}</span>;
    }
    render(
      <ThemeProvider hotkeys={false}>
        <Probe />
      </ThemeProvider>,
    );
    const tweaks = JSON.parse(screen.getByTestId("tw").textContent);
    expect(tweaks.glassBlur).toBe(30);
    expect(tweaks.ringShine).toBeUndefined();
    localStorage.clear();
  });

  it("renders IconTile as a static tone tile", () => {
    const { container, rerender } = render(
      <IconTile tone="success" size="lg">
        <icons.Check />
      </IconTile>,
    );
    const tile = container.querySelector(".ui-icon-tile");
    expect(tile).toHaveClass("ui-icon-tile--success", "ui-icon-tile--lg");
    expect(tile).toHaveAttribute("aria-hidden", "true");

    rerender(
      <IconTile label="Cash">
        <icons.Wallet />
      </IconTile>,
    );
    expect(screen.getByRole("img", { name: "Cash" })).toHaveClass("ui-icon-tile--accent");
  });
});
