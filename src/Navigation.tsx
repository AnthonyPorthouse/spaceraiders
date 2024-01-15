import { Temporal } from "temporal-polyfill";
import useStatus from "./hooks/useStatus";

export default function Navigation() {
  const {
    isLoading: statusLoading,
    isSuccess: statusLoaded,
    data: status,
  } = useStatus();

  return (
    <nav className="mx-6 my-4">
      <h1 className="text-xl font-bold">Space Raiders</h1>
      {statusLoading && <span>Loading Status</span>}
      {statusLoaded && (
        <span
          title={`Next Server Reset: ${status.serverResets.next.since(Temporal.Now.instant()).round({ largestUnit: "week", smallestUnit: "seconds", relativeTo: Temporal.Now.plainDateTimeISO() }).toLocaleString()}`}
        >
          {status.version}
        </span>
      )}
    </nav>
  );
}
