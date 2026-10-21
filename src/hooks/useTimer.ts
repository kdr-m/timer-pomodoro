import { useCallback, useEffect, useReducer, useRef } from "react";
import { initialState } from "../types/timer";
import { timerReducer } from "../utils/timerReducer";
import { playChime } from "../utils/playChime";

// запускает таймер
export function useTimer() {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  const endTimeRef = useRef<number | null>(null);

  const start = useCallback(() => {
    if (state.status !== "idle") {
      return;
    }

    endTimeRef.current = Date.now() + state.remainingSeconds * 1000;

    void playChime();

    dispatch({ type: "START" });
  }, [state.status, state.remainingSeconds]);

  const pause = useCallback(() => {
    const endTime = endTimeRef.current;

    if (state.status !== "running" || endTime === null) {
      return;
    }

    const millisecondsRemaining = endTime - Date.now();

    if (millisecondsRemaining <= 0) {
      return;
    }

    const remainingSeconds = Math.ceil(millisecondsRemaining / 1000);

    endTimeRef.current = null;

    void playChime();

    dispatch({
      type: "TICK",
      remainingSeconds,
    });

    dispatch({ type: "PAUSE" });
  }, [state.status]);

  const resume = useCallback(() => {
    if (state.status !== "paused") {
      return;
    }

    endTimeRef.current = Date.now() + state.remainingSeconds * 1000;

    void playChime();

    dispatch({ type: "RESUME" });
  }, [state.status, state.remainingSeconds]);

  const restart = useCallback(() => {
    endTimeRef.current = null;

    dispatch({ type: "RESTART" });
  }, []);

  useEffect(() => {
    if (
      state.status !== "running" ||
      state.mode === null ||
      endTimeRef.current !== null
    ) {
      return;
    }

    endTimeRef.current = Date.now() + state.remainingSeconds * 1000;
  }, [state.status, state.mode, state.remainingSeconds]);

  useEffect(() => {
    if (state.status !== "running") {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (endTimeRef.current === null) {
        return;
      }

      const remainingSeconds = Math.max(
        0,
        Math.ceil((endTimeRef.current - Date.now()) / 1000),
      );

      if (remainingSeconds === 0) {
        endTimeRef.current = null;

        void playChime();

        if (state.mode === "work") {
          dispatch({ type: "COMPLETE_WORK" });
        } else {
          dispatch({ type: "COMPLETE_BREAK" });
        }

        return;
      }

      dispatch({
        type: "TICK",
        remainingSeconds,
      });
    }, 250);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [state.status, state.mode]);

  return {
    state,
    start,
    pause,
    resume,
    restart,
  };
}
