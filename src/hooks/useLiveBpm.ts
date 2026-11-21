import { useEffect, useState } from "react";

function zoneFor(bpm: number): string {
  if (bpm < 110) return "Zone 1";
  if (bpm < 130) return "Zone 2";
  if (bpm < 145) return "Zone 3";
  if (bpm < 160) return "Zone 4";
  return "Zone 5";
}

function intensityFor(bpm: number): string {
  const pct = Math.min(99, Math.round((bpm / 190) * 100));
  return `${pct}٪`;
}

export function useLiveBpm(initial = 142) {
  const [bpm, setBpm] = useState(initial);

  useEffect(() => {
    let value = initial;
    let direction = 1;

    const id = window.setInterval(() => {
      const delta = Math.random() > 0.45 ? 1 : 0;
      value += direction * delta;
      if (value >= 168) direction = -1;
      if (value <= 128) direction = 1;
      value = Math.max(118, Math.min(178, value));
      setBpm(value);
    }, 900);

    return () => window.clearInterval(id);
  }, [initial]);

  return {
    bpm,
    zone: zoneFor(bpm),
    intensity: intensityFor(bpm),
  };
}
