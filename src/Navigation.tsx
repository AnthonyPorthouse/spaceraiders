import useStatus from "./hooks/useStatus";
import Version from "./Navigation/Version";

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
      {statusLoaded && <Version status={status} />}
    </nav>
  );
}
