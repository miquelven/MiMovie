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
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClick = () => {
    scrollTop();

    setTimeout(() => {
      infos.setPage(
        infos.type == "prev" ? infos.pageSelected - 1 : infos.pageSelected + 1
      );
    }, 500);
  };

  return (
    <button
      className="transition-all duration-300 hover:text-[#fff9] px-3"
      disabled={infos.isPending}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
