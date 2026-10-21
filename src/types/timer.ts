import { TIMER_DURATION } from "../constants/timerDurations";

// Типы состояния
export type TimerMode = "work" | "shortBreak" | "longBreak";

export type TimerStatus = "idle" | "running" | "paused";

export interface TimerState {
  mode: TimerMode | null;
  status: TimerStatus;
  remainingSeconds: number;
  completedPomodoros: number;
}

export const initialState: TimerState = {
  mode: null,
  status: "idle",
  remainingSeconds: TIMER_DURATION.work,
  completedPomodoros: 0,
};

export type TimerAction =
  | { type: "START" }
  | { type: "PAUSE" }
  | { type: "RESUME" }
  | { type: "TICK"; remainingSeconds: number }
  | { type: "COMPLETE_WORK" }
  | { type: "COMPLETE_BREAK" }
  | { type: "RESTART" };
