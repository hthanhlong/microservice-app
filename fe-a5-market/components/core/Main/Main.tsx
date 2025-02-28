import { Wrapper } from "@/components/ui";
import Cards from "../Cards/Cards";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";

export default function Main() {
  return (
    <main className="mt-4">
      <Wrapper>
        <Search />
        <Cards />
        <Pagination />
      </Wrapper>
    </main>
  );
}
