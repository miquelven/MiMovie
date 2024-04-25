import { ReactNode } from "react";

interface currentPagintionButtonType {
  children: ReactNode;
}

export default function CurrentPaginationButton({
  children,
}: currentPagintionButtonType) {
  return <button className="text-[#fff9] px-3">{children}</button>;
}
