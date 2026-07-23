import { useEffect } from "react";
import { RefreshCw } from "../icons";
import { IconButton } from "../ui";
import { useTheme } from "../../theme/ThemeProvider";
import { SAAS_PRESETS } from "../../theme/presets";

/** Applies kit taste on enter; only exposes reset-to-suggested. */
export function SuggestedTasteBanner({ presetId }) {
  const preset = SAAS_PRESETS[presetId];
  const { applyTaste, themes } = useTheme();
  const themeName = themes.find((t) => t.id === preset.suggestedTheme)?.name;

  useEffect(() => {
    if (!preset) return;
    applyTaste({ theme: preset.suggestedTheme, tweaks: preset.tweaks });
  }, [presetId]); // eslint-disable-line react-hooks/exhaustive-deps

  function reset() {
    applyTaste({ theme: preset.suggestedTheme, tweaks: preset.tweaks });
  }

  return (
    <div className="taste-banner glass sheen">
      <div>
        <strong>{preset.name}</strong>
        <p>
          Default taste: {themeName}. {preset.why}
        </p>
      </div>
      <IconButton
        label="Reset to suggested taste"
        variant="glass"
        onClick={reset}
      >
        <RefreshCw size={16} />
      </IconButton>
    </div>
  );
}
