#!/usr/bin/env python3
"""Synthesises the promo soundtrack: a 120 BPM beat with hits and whooshes on every cut.

Everything is generated from code (no samples), so the track is royalty-free and
deterministic. Cue times mirror the `T` table in promo/src/timeline.js.

Usage: python3 promo/scripts/soundtrack.py   (needs numpy + scipy + ffmpeg)
Writes promo/assets/soundtrack.mp3 (48 kHz stereo, 256 kbps).
"""
from pathlib import Path
import subprocess
import tempfile
import wave

import numpy as np
from scipy.signal import butter, sosfilt

SR = 48_000
DUR = 31.0
BPM = 120
BEAT = 60 / BPM
N = int(SR * DUR)
rng = np.random.default_rng(7)

# Cue sheet — keep in sync with promo/src/timeline.js
WALL, THEMES, STEP, TASTE = 2.5, 6.0, 0.8, 10.0
CHARTS, SLIDE, MOSAIC, DASH = 13.5, 0.5, 18.5, 21.0
ICONS, OUTRO = 25.0, 27.4

L = np.zeros(N)
R = np.zeros(N)


def t_axis(sec):
    return np.arange(int(sec * SR)) / SR


def add(sig, at, gain=1.0, pan=0.0):
    i = int(at * SR)
    if i >= N:
        return
    sig = sig[: N - i]
    left = gain * np.cos((pan + 1) * np.pi / 4)
    right = gain * np.sin((pan + 1) * np.pi / 4)
    L[i : i + len(sig)] += sig * left * np.sqrt(2)
    R[i : i + len(sig)] += sig * right * np.sqrt(2)


def bandpass(x, lo, hi):
    return sosfilt(butter(2, [lo, hi], btype="band", fs=SR, output="sos"), x)


def lowpass(x, fc, order=2):
    return sosfilt(butter(order, fc, btype="low", fs=SR, output="sos"), x)


def highpass(x, fc, order=2):
    return sosfilt(butter(order, fc, btype="high", fs=SR, output="sos"), x)


def note(n):
    """MIDI note number → Hz."""
    return 440.0 * 2 ** ((n - 69) / 12)


def saw(freq, t, detune=0.0):
    f = freq * (1 + detune)
    return 2 * ((t * f) % 1.0) - 1


# ——— Instruments ———
def kick(gain=1.0):
    t = t_axis(0.45)
    freq = 45 + 110 * np.exp(-t * 28)
    phase = 2 * np.pi * np.cumsum(freq) / SR
    body = np.sin(phase) * np.exp(-t * 7.5)
    click = highpass(rng.standard_normal(len(t)), 2500) * np.exp(-t * 300) * 0.25
    return np.tanh((body + click) * 1.6) * gain


def clap():
    t = t_axis(0.3)
    noise = bandpass(rng.standard_normal(len(t)), 900, 5200)
    env = np.zeros_like(t)
    for off in (0.0, 0.011, 0.022):
        env += (t >= off) * np.exp(-np.clip(t - off, 0, None) * (60 if off < 0.02 else 16))
    return noise * env * 0.5


def hat(open_=False):
    t = t_axis(0.25 if open_ else 0.06)
    noise = highpass(rng.standard_normal(len(t)), 7500)
    return noise * np.exp(-t * (14 if open_ else 70)) * 0.25


def bass(freq, length=0.22):
    t = t_axis(length)
    sig = saw(freq, t) * 0.6 + np.sin(2 * np.pi * freq * t) * 0.8
    sig = lowpass(sig, 420)
    env = np.minimum(1, t * 200) * np.exp(-t * 6)
    return sig * env * 0.55


def pad(freqs, length):
    t = t_axis(length)
    sig = np.zeros_like(t)
    for f in freqs:
        for d in (-0.006, 0.0, 0.007):
            sig += saw(f, t, d)
    sig = lowpass(sig / (len(freqs) * 3), 1800)
    env = np.minimum(1, t / 0.08) * np.minimum(1, (length - t) / 0.2)
    return sig * env * 0.22


def pluck(freq, length=0.18):
    t = t_axis(length)
    sig = saw(freq, t) * 0.5 + np.sin(2 * np.pi * freq * 2 * t) * 0.3
    sig = lowpass(sig, 3200)
    return sig * np.exp(-t * 18) * 0.25


def whoosh(length=0.45, lo=300, hi=6000, rise=True, gain=0.5):
    t = t_axis(length)
    noise = rng.standard_normal(len(t))
    out = np.zeros_like(noise)
    blocks = 24
    edges = np.linspace(0, len(t), blocks + 1).astype(int)
    for b in range(blocks):
        frac = b / (blocks - 1)
        frac = frac if rise else 1 - frac
        fc = lo * (hi / lo) ** frac
        seg = noise[edges[b] : edges[b + 1]]
        out[edges[b] : edges[b + 1]] = bandpass(seg, fc * 0.6, min(fc * 1.6, SR / 2 - 100))
    env = np.sin(np.pi * np.clip(t / length, 0, 1)) ** 1.5
    return out * env * gain


def riser(length=1.0, gain=0.45):
    t = t_axis(length)
    sig = whoosh(length, 200, 9000, True, 1.0)
    tone = np.sin(2 * np.pi * np.cumsum(200 + 900 * (t / length) ** 2) / SR) * 0.2
    env = (t / length) ** 2
    return (sig + tone) * env * gain


def impact(gain=0.9):
    t = t_axis(1.4)
    freq = 38 + 70 * np.exp(-t * 9)
    boom = np.sin(2 * np.pi * np.cumsum(freq) / SR) * np.exp(-t * 2.6)
    air = lowpass(rng.standard_normal(len(t)), 2400) * np.exp(-t * 6) * 0.35
    return np.tanh((boom + air) * 1.4) * gain


def sparkle(base, count=6, spacing=0.06):
    out = np.zeros(int(SR * (count * spacing + 0.4)))
    t = t_axis(0.35)
    for k in range(count):
        f = base * [1, 1.25, 1.5, 2, 2.5, 3][k % 6]
        tone = np.sin(2 * np.pi * f * t) * np.exp(-t * 14) * 0.18
        i = int(k * spacing * SR)
        out[i : i + len(tone)] += tone
    return out


# ——— Harmony: Am – F – C – G, one chord per bar (2s) ———
CHORDS = [
    (57, [57, 60, 64, 69]),  # Am
    (53, [53, 57, 60, 65]),  # F
    (48, [52, 55, 60, 64]),  # C
    (55, [55, 59, 62, 67]),  # G
]

bars = int(np.ceil(DUR / (4 * BEAT)))
sidechain = np.ones(N)

for b in range(bars):
    start = b * 4 * BEAT
    root, chord = CHORDS[b % 4]
    pad_gain = 0.7 if start < WALL else 1.0
    add(pad([note(n) for n in chord], 4 * BEAT), start, pad_gain, pan=-0.15)
    add(pad([note(n + 12) for n in chord[:3]], 4 * BEAT), start, 0.35 * pad_gain, pan=0.25)

    for beat in range(4):
        t0 = start + beat * BEAT
        in_groove = WALL <= t0 < OUTRO + 2.5
        breakdown = TASTE <= t0 < CHARTS - 0.5
        if in_groove and not (CHARTS - 0.5 <= t0 < CHARTS):
            add(kick(0.95 if not breakdown else 0.6), t0)
            i = int(t0 * SR)
            duck = 1 - 0.6 * np.exp(-t_axis(BEAT) * 9)
            sidechain[i : i + len(duck)] = np.minimum(sidechain[i : i + len(duck)], duck[: N - i])
            if beat in (1, 3):
                add(clap(), t0, 0.8)
            add(bass(note(root - 12)), t0 + BEAT / 2, 0.9)
            add(hat(), t0 + BEAT / 2, 0.8, pan=0.3)
            if CHARTS <= t0 < DASH:
                add(hat(), t0 + BEAT / 4, 0.5, pan=-0.3)
                add(hat(), t0 + 3 * BEAT / 4, 0.5, pan=-0.3)
                add(pluck(note(chord[beat % 4] + 12)), t0, 0.9, pan=0.4)
                add(pluck(note(chord[(beat + 2) % 4] + 12)), t0 + BEAT / 2, 0.6, pan=-0.4)
            if beat == 3 and in_groove:
                add(hat(True), t0 + BEAT / 2, 0.6, pan=0.2)

# Duck the bed under the kick
L *= sidechain
R *= sidechain

# ——— Transition sound design ———
add(impact(0.9), 0.08)
add(sparkle(note(81), 6, 0.05), 0.5, 0.8, pan=0.2)
add(riser(1.3), WALL - 1.3)
add(impact(0.7), WALL)
add(whoosh(0.5, 250, 7000, True, 0.5), THEMES - 0.3, pan=-0.3)
add(impact(0.5), THEMES)
for i in range(1, 5):
    t = THEMES + STEP * i
    add(whoosh(0.4, 600, 9000, True, 0.35), t - 0.1, pan=(-1) ** i * 0.5)
    add(sparkle(note(76 + i * 2), 4, 0.04), t + 0.05, 0.6, pan=(-1) ** i * 0.3)
add(whoosh(0.5, 4000, 300, False, 0.5), TASTE - 0.05)
add(riser(1.0), CHARTS - 1.0)
add(impact(0.8), CHARTS)
for i in range(10):
    add(whoosh(0.22, 800, 8000, True, 0.3), CHARTS + i * SLIDE - 0.08, pan=0.6 if i % 2 else -0.6)
add(whoosh(0.5, 6000, 200, False, 0.45), MOSAIC)
add(sparkle(note(84), 6, 0.045), MOSAIC + 0.2, 0.7)
add(whoosh(0.5, 250, 7000, True, 0.5), DASH - 0.3)
add(impact(0.5), DASH)
for n in range(4):
    add(whoosh(0.45, 400, 3000, True, 0.3), DASH + 0.8 + n * 0.75, pan=0.5)
add(whoosh(0.45, 300, 8000, True, 0.45), ICONS - 0.2)
add(sparkle(note(79), 6, 0.06), ICONS + 0.15, 0.9)
add(riser(1.2, 0.5), OUTRO - 1.2)
add(impact(1.0), OUTRO)
add(sparkle(note(88), 6, 0.05), OUTRO + 0.05, 0.9)

# ——— Master ———
mix = np.stack([L, R], axis=1)
mix = highpass(mix.T, 28).T
fade = np.ones(N)
fade_len = int(1.2 * SR)
fade[-fade_len:] = np.linspace(1, 0, fade_len) ** 1.5
fade[: int(0.02 * SR)] = np.linspace(0, 1, int(0.02 * SR))
mix *= fade[:, None]
mix = np.tanh(mix * 1.2) / np.tanh(1.2)
mix *= 0.89 / np.max(np.abs(mix))

out = Path(__file__).resolve().parents[1] / "assets" / "soundtrack.mp3"
out.parent.mkdir(parents=True, exist_ok=True)
pcm = (mix * 32767).astype("<i2")
with tempfile.TemporaryDirectory() as tmp:
    wav = Path(tmp) / "soundtrack.wav"
    with wave.open(str(wav), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-i", str(wav), "-b:a", "256k", str(out)],
        check=True,
    )
print(f"wrote {out} ({DUR:.1f}s)")
