import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CardMovie from "./index";
import { BrowserRouter } from "react-router-dom";
import setCurrentMovie from "../../helpers/setCurrentMovie";

import { ChakraProvider } from "@chakra-ui/react";

// Mock helper
vi.mock("../../helpers/setCurrentMovie", () => ({
  default: vi.fn(),
}));

// Mock TmdbImage
vi.mock("../ui/TmdbImage", () => ({
  default: ({ alt }: { alt: string }) => (
    <img alt={alt} data-testid="tmdb-image" />
  ),
}));

describe("CardMovie", () => {
  const mockData = {
    id: 123,
    poster_path: "/poster.jpg",
    title: "Test Movie",
    release_date: "2023-01-01",
  };

  it("renders movie information", () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <CardMovie data={mockData} />
        </BrowserRouter>
      </ChakraProvider>
    );

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
    expect(screen.getByTestId("tmdb-image")).toHaveAttribute(
      "alt",
      "Imagem do filme Test Movie"
    );
  });

  it("calls setCurrentMovie on click", () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <CardMovie data={mockData} />
        </BrowserRouter>
      </ChakraProvider>
    );

    // Link is usually an anchor tag
    const link = screen.getByRole("link");
    fireEvent.click(link);

    expect(setCurrentMovie).toHaveBeenCalledWith(123);
  });
});
