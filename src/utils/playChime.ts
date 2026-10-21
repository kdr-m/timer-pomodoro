let audioContext: AudioContext | null = null;

function createTone(
  context: AudioContext,
  frequency: number,
  volume: number,
  startTime: number,
  duration: number,
) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, startTime);

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.05);

  oscillator.addEventListener("ended", () => {
    oscillator.disconnect();
    gain.disconnect();
  });
}

export async function playChime() {
  try {
    if (audioContext === null) {
      audioContext = new AudioContext();
    }

    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }

    const startTime = audioContext.currentTime;

    createTone(audioContext, 880, 0.055, startTime, 0.55);
    createTone(audioContext, 1320, 0.02, startTime + 0.03, 0.4);
  } catch {
    return;
  }
}
