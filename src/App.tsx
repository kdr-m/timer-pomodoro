import { useRef } from "react";
import "./App.css";
import { useTimer } from "./hooks/useTimer";
import { TomatoCharacter, type TomatoMood } from "./components/TomatoCharacter";

const MODE_LABELS = {
  work: "Фокус",
  shortBreak: "Короткий перерыв",
  longBreak: "Длинный перерыв",
} as const;

const STATUS_LABELS = {
  idle: "Таймер ещё не запущен",
  running: "Таймер запущен",
  paused: "Таймер на паузе",
} as const;

const PRIMARY_ACTION_LABELS = {
  idle: "Старт",
  running: "Пауза",
  paused: "Продолжить",
} as const;

function App() {
  const { state, start, pause, resume, restart } = useTimer();

  const primaryButtonRef = useRef<HTMLButtonElement>(null);

  const minutes = Math.floor(state.remainingSeconds / 60);
  const seconds = state.remainingSeconds % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds,
  ).padStart(2, "0")}`;

  const modeLabel =
    state.mode === null ? "Готовы начать?" : MODE_LABELS[state.mode];

  const primaryAction = {
    idle: start,
    running: pause,
    paused: resume,
  }[state.status];

  let tomatoMood: TomatoMood = "neutral";

  if (state.status === "running" && state.mode === "work") {
    tomatoMood = "focused";
  }

  if (
    state.status === "paused" ||
    state.mode === "shortBreak" ||
    state.mode === "longBreak"
  ) {
    tomatoMood = "relaxed";
  }

  const handleRestart = () => {
    restart();
    primaryButtonRef.current?.focus();
  };

  return (
    <main className={`app app--${state.mode ?? "idle"}`}>
      <section className="timer" aria-labelledby="timer-title">
        <header className="timer__header">
          <h1 id="timer-title">Pomodoro Timer</h1>

          <p className="timer__mode" aria-live="polite" aria-atomic="true">
            {modeLabel}
          </p>
        </header>

        <TomatoCharacter mood={tomatoMood} />

        <div
          className="timer__display"
          role="timer"
          aria-label={`Оставшееся время: ${formattedTime}`}
        >
          {formattedTime}
        </div>

        <p className="timer__status">{STATUS_LABELS[state.status]}</p>

        <p className="timer__progress">
          Завершено Pomodoro: <strong>{state.completedPomodoros}</strong>
        </p>

        <div className="timer__controls">
          <button ref={primaryButtonRef} type="button" onClick={primaryAction}>
            {PRIMARY_ACTION_LABELS[state.status]}
          </button>

          {state.status !== "idle" && (
            <button type="button" onClick={handleRestart}>
              Начать заново
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
