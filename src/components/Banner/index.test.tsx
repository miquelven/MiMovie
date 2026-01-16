import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import Banner from "./index";
import { BrowserRouter } from "react-router-dom";
import useGetMovies from "../../hooks/useGetMovies";
import React from "react";

import { ChakraProvider } from "@chakra-ui/react";

// Mock the hook
vi.mock("../../hooks/useGetMovies");

// Mock child components
vi.mock("./BannerTrailers", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="banner-trailers">{children}</div>
  ),
}));

vi.mock("./BannerTrailers/CarouselTrailers", () => ({
  default: () => <div data-testid="carousel-trailers" />,
}));

vi.mock("../ui/TmdbImage", () => ({
  default: ({ alt }: { alt: string }) => (
    <img alt={alt} data-testid="tmdb-image" />
  ),
}));

// Mock react-slick
vi.mock("react-slick", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="slider">{children}</div>
  ),
}));

// Mock matchMedia
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

describe("Banner", () => {
  it("renders movies when data is loaded", () => {
    const mockData = {
      results: [
        {
          id: 1,
          title: "Movie 1",
          overview: "Overview 1",
          backdrop_path: "/path1.jpg",
        },
        {
          id: 2,
          title: "Movie 2",
          overview: "Overview 2",
          backdrop_path: "/path2.jpg",
        },
        {
          id: 3,
          title: "Movie 3",
          overview: "Overview 3",
          backdrop_path: "/path3.jpg",
        },
      ],
    };

    (useGetMovies as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockData,
      isPending: false,
    });

    render(
      <ChakraProvider>
        <BrowserRouter>
          <Banner />
        </BrowserRouter>
      </ChakraProvider>
    );

    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Overview 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
  });
});
