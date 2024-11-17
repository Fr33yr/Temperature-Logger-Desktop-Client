import { useAppSelector } from "../hooks/reduxhook";

export default function Servers() {
  const selectedServer = useAppSelector(
    (state) => state.serversReducer.value
  );

  return (
    <>
      <div>Servers</div>
    </>
  );
}
