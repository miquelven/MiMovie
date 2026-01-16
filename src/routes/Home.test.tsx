import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Home from "./Home";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

// Mock child components
vi.mock("../components/Banner", () => ({
  default: () => <div data-testid="banner" />,
}));
vi.mock("../components/home/LatestMovies", () => ({
  default: () => <div data-testid="latest-movies" />,
}));
vi.mock("../components/home/FeaturesArea", () => ({
  default: () => <div data-testid="features-area" />,
}));
vi.mock("../components/home/PopularMovies", () => ({
  default: () => <div data-testid="popular-movies" />,
}));

// Mock Helmet
vi.mock("react-helmet", () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="helmet">{children}</div>
  ),
}));

describe("Home Route", () => {
  it("renders all sections", () => {
    render(
      <ChakraProvider>
        <Home />
      </ChakraProvider>
    );

    expect(screen.getByTestId("banner")).toBeInTheDocument();
    expect(screen.getByTestId("features-area")).toBeInTheDocument();
    expect(screen.getByTestId("latest-movies")).toBeInTheDocument();
    expect(screen.getByTestId("popular-movies")).toBeInTheDocument();
  });
});
