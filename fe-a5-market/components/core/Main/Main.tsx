import { Wrapper } from "@/components/ui";
import Cards from "../Cards/Cards";
import PaginationComponent from "../Pagination/Pagination";
import Search from "../Search/Search";

export default function Main() {
  return (
    <main className="mt-4">
      <Wrapper>
        <Search />
        <Cards />
        <PaginationComponent />
      </Wrapper>
    </main>
  );
}
