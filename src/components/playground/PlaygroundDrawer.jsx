import { useEffect } from "react";
import { X } from "lucide-react";
import { IconButton } from "../ui";
import { TasteControls } from "./TasteControls";

/** Non-modal taste panel — no blur, page stays interactive behind it. */
export function PlaygroundDrawer({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="playground-panel-root" role="presentation">
      <aside
        className="playground-panel glass sheen"
        role="complementary"
        aria-label="Taste playground"
      >
        <header className="playground-panel__head">
          <div>
            <h2>Taste</h2>
            <p>Core UI first, then scroll for rings &amp; motion effects.</p>
          </div>
          <IconButton label="Close taste panel" variant="ghost" onClick={onClose}>
            <X size={18} />
          </IconButton>
        </header>
        <div className="playground-panel__body">
          <TasteControls compact />
        </div>
      </aside>
    </div>
  );
}
