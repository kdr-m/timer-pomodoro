import { TIMER_DURATION } from "../constants/timerDurations";
import {
  initialState,
  type TimerAction,
  type TimerState,
} from "../types/timer";

// управление состоянием
export function timerReducer(
  state: TimerState,
  action: TimerAction,
): TimerState {
  switch (action.type) {
    case "START":
      return {
        ...state,
        mode: "work",
        status: "running",
      };

    case "PAUSE":
      return {
        ...state,
        status: "paused",
      };

    case "RESUME":
      return {
        ...state,
        status: "running",
      };

    case "TICK":
      return {
        ...state,
        remainingSeconds: action.remainingSeconds,
      };

    case "COMPLETE_WORK": {
      const completedPomodoros = state.completedPomodoros + 1;
      const isLongBreak = completedPomodoros === 4;

      return {
        ...state,
        mode: isLongBreak ? "longBreak" : "shortBreak",
        status: "running",
        remainingSeconds: isLongBreak
          ? TIMER_DURATION.longBreak
          : TIMER_DURATION.shortBreak,
        completedPomodoros,
      };
    }

    case "COMPLETE_BREAK": {
      const isLongBreak = state.mode === "longBreak";

      return {
        ...state,
        mode: "work",
        status: "running",
        remainingSeconds: TIMER_DURATION.work,
        completedPomodoros: isLongBreak ? 0 : state.completedPomodoros,
      };
    }

    case "RESTART":
      return initialState;

    default:
      return state;
  }
}
