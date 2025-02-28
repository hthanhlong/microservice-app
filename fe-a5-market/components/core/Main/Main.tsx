import { Wrapper } from "@/components/ui";
import Cards from "../Cards/Cards";
import PaginationComponent from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";

export default function Main() {
  return (
    <main className="mt-4">
      <Wrapper>
        <SearchBar />
        <Cards />
        <PaginationComponent />
      </Wrapper>
    </main>
  );
}
