import { ReactNode } from "react";

interface paginationButtonType {
  infos: {
    pageSelected: number;
    isPending: boolean;
    setPage: (value: number) => void;
    type?: "prev" | "next";
  };
  children: ReactNode;
}

export default function PaginationButton({
  infos,
  children,
}: paginationButtonType) {
  return (
    <button
      disabled={infos.isPending}
      style={{ fontSize: "48px", fontWeight: "bold" }}
      onClick={() =>
        infos.setPage(
          infos.type == "prev" ? infos.pageSelected - 1 : infos.pageSelected + 1
        )
      }
    >
      {children}
    </button>
  );
}
