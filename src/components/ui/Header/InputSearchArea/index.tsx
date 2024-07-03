import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Collapse,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import useGetSearchMovie from "../../../../hooks/useGetSearchMovie";
import { useOutsideClick } from "@chakra-ui/react";

import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import setCurrentMovie from "../../../../helpers/setCurrentMovie";

export default function InputSearchArea() {
  const inputArea = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const [inputSearch, setInputSearch] = useState("");

  const [searchParams] = useDebounce([inputSearch], 1000);

  const { data, isPending } = useGetSearchMovie(searchParams);

  const [showSearchResults, setShowSearchResults] = useState(false);

  useOutsideClick({
    ref: inputArea,
    handler: () => setShowSearchResults(false),
  });

  const handleClick = (id: number) => {
    setCurrentMovie(id);
    setShowSearchResults(false);
    setInputSearch("");
  };

  const redirectToSearchMovieResults = () => {
    navigate(`/search/${inputSearch}`);
    setInputSearch("");
    setShowSearchResults(false);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter" && inputSearch.trim().length > 0) {
      redirectToSearchMovieResults();
    }
  };

  useEffect(() => {
    if (data) {
      const resultsLength = data.results.length;

      if (resultsLength == 0) {
        setShowSearchResults(false);
      } else if (resultsLength > 0 && showSearchResults == false) {
        setShowSearchResults(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Box
      ref={inputArea}
      width={[1 / 3, null, null, 5 / 12]}
      position={"relative"}
    >
      <InputGroup width={"100%"} size={["sm", null, null, "md"]}>
        <label htmlFor="Search" className="w-full h-full">
          <Input
            name="Search"
            rounded="xl"
            variant="outline"
            borderColor="#c7c7c7"
            focusBorderColor="#777"
            value={inputSearch ? inputSearch : ""}
            onFocus={() => setShowSearchResults(true)}
            onChange={(e) => setInputSearch(e.target.value)}
            onKeyUp={handleKeyUp}
          />
        </label>
        <InputRightElement>
          <IconButton
            size="md"
            colorScheme="transparent"
            aria-label="Search"
            color="#c7c7c7"
            icon={<SearchIcon />}
            onClick={redirectToSearchMovieResults}
          />
        </InputRightElement>
      </InputGroup>

      <Box pos={"relative"} width="100%">
        <Collapse
          in={showSearchResults && inputSearch.length > 0}
          animateOpacity
        >
          <ul
            id="searchVideosResults"
            className="absolute top-0 left-[-100vw] translate-x-[61vw] mt-2 right-0 bg-[#0a0d14] w-screen max-h-60 sm:w-full sm:left-0 sm:translate-x-0 sm:mt-0 md:max-h-80 overflow-y-auto rounded-md"
          >
            {!isPending ? (
              data?.results.map((item) => (
                <Link
                  key={item.id}
                  to={`/${item.title}`}
                  onClick={() => handleClick(item.id)}
                >
                  <li className="px-3 py-3 hover:bg-white/10 cursor-pointer">
                    <p className="text-sm md:text-base">{item.title}</p>
                  </li>
                </Link>
              ))
            ) : (
              <p className="py-3 px-3 text-center">Carregando...</p>
            )}
          </ul>
        </Collapse>
      </Box>
    </Box>
  );
}
