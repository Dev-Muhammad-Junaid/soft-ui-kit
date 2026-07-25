import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Accordion,
  Alert,
  Avatar,
  Checkbox,
  Collapsible,
  EmptyState,
  IconButton,
  Progress,
  Radio,
  Separator,
  Skeleton,
  Switch,
  Tabs,
  Toggle,
  ToastProvider,
  useToast,
  Button,
} from "../src/index.js";

describe("form & feedback primitives", () => {
  it("renders checkbox, radio, and switch", () => {
    render(
      <>
        <Checkbox label="Subscribe" defaultChecked />
        <Radio label="Option A" name="g" defaultChecked />
        <Switch checked label="Alerts" onCheckedChange={() => {}} />
      </>,
    );
    expect(screen.getByText("Subscribe")).toBeInTheDocument();
    expect(screen.getByText("Option A")).toBeInTheDocument();
    expect(screen.getByText("Alerts")).toBeInTheDocument();
  });

  it("renders tabs and accordion", () => {
    render(
      <>
        <Tabs
          value="one"
          onChange={() => {}}
          tabs={[
            { id: "one", label: "One", content: "Panel one" },
            { id: "two", label: "Two", content: "Panel two" },
          ]}
        />
        <Accordion items={[{ id: "a", title: "FAQ", content: "Answer" }]} />
        <Collapsible title="More">Hidden</Collapsible>
      </>,
    );
    expect(screen.getByText("Panel one")).toBeInTheDocument();
    expect(screen.getByText("FAQ")).toBeInTheDocument();
    expect(screen.getByText("More")).toBeInTheDocument();
  });

  it("renders feedback surfaces", () => {
    render(
      <>
        <Alert title="Saved">All good</Alert>
        <Progress value={40} label="Upload" />
        <Skeleton data-testid="sk" />
        <Separator label="Or" />
        <EmptyState title="No items" description="Create one" />
        <Avatar name="Ada Lovelace" />
        <IconButton label="Notify">
          <span>*</span>
        </IconButton>
        <Toggle pressed onPressedChange={() => {}}>
          Bold
        </Toggle>
      </>,
    );
    expect(screen.getByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("Upload")).toBeInTheDocument();
    expect(screen.getByText("No items")).toBeInTheDocument();
    expect(screen.getByLabelText("Notify")).toBeInTheDocument();
  });
});

describe("toast API", () => {
  it("exposes useToast inside ToastProvider", () => {
    function Probe() {
      const { push } = useToast();
      return (
        <Button type="button" onClick={() => push("Hello kit")}>
          Toast
        </Button>
      );
    }

    render(
      <ToastProvider>
        <Probe />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByText("Toast"));
    expect(screen.getByText("Hello kit")).toBeInTheDocument();
  });
});
