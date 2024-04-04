import CurrentPagintaionButton from "../CurrentPaginationButton";
import PaginationButton from "./PaginationButton";

interface infosType {
  infos: {
    setPage: (value: number) => void;
    pageSelected: number;
    isPending: boolean;
  };
}

export default function Pagination({ infos }: infosType) {
  return (
    <div>
      {infos.pageSelected > 1 && (
        <>
          <PaginationButton infos={{ ...infos, type: "prev" }}>
            Anterior
          </PaginationButton>
          <PaginationButton infos={{ ...infos, type: "prev" }}>
            {infos.pageSelected - 1}
          </PaginationButton>
        </>
      )}
      <CurrentPagintaionButton>{infos.pageSelected}</CurrentPagintaionButton>
      {infos.pageSelected < 500 && (
        <>
          <PaginationButton infos={infos}>
            {infos.pageSelected + 1}
          </PaginationButton>
          <PaginationButton infos={infos}>Próximo</PaginationButton>
        </>
      )}
    </div>
  );
}
