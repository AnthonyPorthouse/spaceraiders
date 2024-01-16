import { Temporal } from "temporal-polyfill";
import { Status } from "../api/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Tooltip } from "react-tooltip";
import { createPortal } from "react-dom";

export default function Version({ status }: { status: Status }) {
  const [now, setNow] = useState<Temporal.Instant>(Temporal.Now.instant());

  const animationReference = useRef<number>();

  const updateTime = useCallback(() => {
    setNow(Temporal.Now.instant());
    animationReference.current = requestAnimationFrame(updateTime);
  }, [setNow]);

  useEffect(() => {
    animationReference.current = requestAnimationFrame(updateTime);

    return () => cancelAnimationFrame(animationReference.current!);
  }, [updateTime]);

  const timeUntilReset = useMemo(() => {
    return status.serverResets.next.since(now).round({
      largestUnit: "week",
      smallestUnit: "seconds",
      relativeTo: Temporal.Now.plainDateTimeISO(),
    });
  }, [status, now]);

  const progress = useMemo(() => {
    const fortnightly = Temporal.Duration.from("P2W");
    return (
      (timeUntilReset.round({
        relativeTo: Temporal.Now.plainDateTimeISO(),
        largestUnit: "second",
      }).seconds /
        fortnightly.round({
          relativeTo: Temporal.Now.plainDateTimeISO(),
          largestUnit: "second",
        }).seconds) *
      100
    ).toFixed(1);
  }, [timeUntilReset]);

  return (
    <div className="flex flex-col">
      <span>{status.version}</span>

      <a data-tooltip-id="tooltip" className="block">
        <progress
          aria-label="Time remaining until next server reset"
          value={progress}
          max={100}
        >
          {timeUntilReset.toLocaleString()}
        </progress>
      </a>
      {createPortal(
        <Tooltip id="tooltip">
          Next Server Reset: {timeUntilReset.toLocaleString()}
        </Tooltip>,
        document.body,
      )}
    </div>
  );
}
