import { useEffect, useState } from "react";

export function useEscapeClose(open, onClose) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
}

export function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

export function useAnchorCoords(open, anchorRef) {
  const [coords, setCoords] = useState(null);
  useEffect(() => {
    if (!open || !anchorRef.current) {
      setCoords(null);
      return undefined;
    }
    function measure() {
      const r = anchorRef.current.getBoundingClientRect();
      const menuWidth = 200;
      const left = Math.min(r.left, window.innerWidth - menuWidth - 12);
      const top = Math.min(r.bottom + 8, window.innerHeight - 12);
      setCoords({ top, left, width: Math.max(r.width, 180) });
    }
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [open, anchorRef]);
  return coords;
}
