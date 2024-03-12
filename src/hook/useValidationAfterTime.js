import { useEffect } from "react";

export function useValidationTimer(isValid, dispatch, action, currentValue) {
  useEffect(() => {
    let timer;
    if (!isValid) {
      timer = setTimeout(() => {
        dispatch(action());
      }, 1500);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [dispatch, isValid, currentValue]);
}
