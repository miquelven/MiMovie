import { ReactNode } from "react";

interface currentPagintionButtonType {
  children: ReactNode;
}

export default function CurrentPagintaionButton({
  children,
}: currentPagintionButtonType) {
  return (
    <button style={{ fontSize: "48px", fontWeight: "bold" }}>{children}</button>
  );
}
