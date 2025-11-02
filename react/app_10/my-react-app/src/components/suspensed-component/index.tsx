import { fetchResource } from "./util";

const someResource = fetchResource();

export default function SuspenseLib() {
  const r = someResource.read();
  console.log(r);
  return (
    <div>
      <h1> Test Component lazy loading {r}</h1>
    </div>
  );
}
