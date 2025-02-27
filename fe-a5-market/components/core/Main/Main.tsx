import { Wrapper } from "@/components/ui";
import Cards from "../Cards/Cards";
import Pagination from "../Pagination/Pagination";

export default function Main() {
  return (
    <main className="flex-1 px-2">
      <Wrapper>
        <div>1~6 of over result</div>
        <Cards />
        <Pagination />
      </Wrapper>
    </main>
  );
}
