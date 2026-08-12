import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { COMPONENT_REGISTRY, ToastProvider } from "../src/index.js";
import { CatalogPreview } from "../src/pages/catalog/CatalogPreviews.jsx";

describe("catalog previews", () => {
  it("has a unique registry id for every component", () => {
    const ids = COMPONENT_REGISTRY.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("renders a live preview for every registry id", () => {
    for (const item of COMPONENT_REGISTRY) {
      const { unmount } = render(
        <MemoryRouter>
          <ToastProvider>
            <CatalogPreview id={item.id} />
          </ToastProvider>
        </MemoryRouter>,
      );
      expect(screen.queryByText(`No preview for ${item.id}`)).not.toBeInTheDocument();
      unmount();
    }
  });
});

describe("overlays", () => {
  it("opens and closes a dialog from the catalog preview", () => {
    render(
      <ToastProvider>
        <CatalogPreview id="dialog" />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Open dialog" }));
    expect(screen.getByRole("dialog", { name: "Save changes" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog", { name: "Save changes" })).not.toBeInTheDocument();
  });
});
