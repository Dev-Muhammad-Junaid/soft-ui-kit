// @vitest-environment node
import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { Button, Card, ThemeProvider, ToastProvider } from "../src/index.js";

describe("server rendering", () => {
  it("renders ThemeProvider and ToastProvider without window or localStorage", () => {
    expect(typeof window).toBe("undefined");
    const html = renderToString(
      <ThemeProvider>
        <ToastProvider>
          <Card title="SSR">
            <Button>Ship</Button>
          </Card>
        </ToastProvider>
      </ThemeProvider>,
    );
    expect(html).toContain("SSR");
    expect(html).toContain("ui-btn--primary");
  });
});
