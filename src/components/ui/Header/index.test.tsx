import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Header from "./index";
import { BrowserRouter } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";

vi.mock("./InputSearchArea", () => ({
  default: () => <div data-testid="input-search-area" />,
}));

describe("Header", () => {
  it("renders logo and search area", () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </ChakraProvider>
    );
    expect(screen.getByText("MiMovies")).toBeInTheDocument();
    expect(screen.getByTestId("input-search-area")).toBeInTheDocument();
  });

  it("opens menu when hamburger icon is clicked", () => {
    render(
      <ChakraProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </ChakraProvider>
    );

    // The button has aria-label="Menu"
    const menuButtons = screen.getAllByLabelText("Menu");
    // There are two buttons in the code (Fade in/out logic), one is for opening, one for closing.
    // The one for opening has HamburgerIcon.

    // Actually, both have aria-label="Menu". One is in Fade in=!isOpen, other in Fade in=isOpen.
    // We should click the one that is visible.
    // Since we can't easily distinguish visibility in JSDOM without checking styles or opacity (which Chakra handles),
    // we can try clicking the first one.

    fireEvent.click(menuButtons[0]);

    // Check if links appear.
    // They are inside Slide. Slide usually renders into a Portal or just in place.
    // Let's check for "Populares".
    expect(screen.getByText("Populares")).toBeInTheDocument();
  });
});
