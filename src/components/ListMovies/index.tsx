import {
  Box,
  Flex,
  Grid,
  Skeleton,
  Text,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  Switch,
  FormControl,
  FormLabel,
  Center,
  Spinner,
  Tooltip,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import useGetMovies from "../../hooks/useGetMovies";
import useGetMoviesInfinite from "../../hooks/useGetMoviesInfinite";
import CardMovie from "../CardMovie";
import { useEffect, useMemo, useRef, useState } from "react";
import PaginationArea from "../PaginationArea";
import TitleDescription from "../TitleDescription";
import EmptyState from "../EmptyState";
import http from "../../helpers/http";
import movieType from "../../types/movieType";

const value = import.meta.env.VITE_API_KEY;

const detailsOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${value}`,
  },
};

interface propType {
  title: string;
  desc: string;
  url: string;
}

interface MovieDetails {
  id: number;
  runtime: number;
}

export default function ListMovies({ title, desc, url }: propType) {
  const [currentPage, setCurrentPage] = useState(1);
  const [releaseYear, setReleaseYear] = useState<string>("");
  const [minRating, setMinRating] = useState<number>(0);
  const [language, setLanguage] = useState<string>("all");
  const [maxRuntime, setMaxRuntime] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [runtimes, setRuntimes] = useState<Record<number, number>>({});
  const [isFetchingRuntime, setIsFetchingRuntime] = useState(false);

  // Infinite Scroll State
  const [useInfiniteScroll, setUseInfiniteScroll] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const setPage = (newValue: number) => {
    setCurrentPage(newValue);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Queries
  const { data: traditionalData, isPending: isPendingTraditional } =
    useGetMovies(url, currentPage, { enabled: !useInfiniteScroll });

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status: infiniteStatus,
  } = useGetMoviesInfinite(url, useInfiniteScroll);

  // Derived Data
  const rawResults = useMemo(() => {
    if (useInfiniteScroll) {
      return infiniteData?.pages.flatMap((page) => page.results) || [];
    }
    return traditionalData?.results || [];
  }, [useInfiniteScroll, infiniteData, traditionalData]);

  const isPending = useInfiniteScroll
    ? infiniteStatus === "pending"
    : isPendingTraditional;

  const totalPages = traditionalData?.total_pages || 0;

  useEffect(() => setCurrentPage(1), [url]);

  // Infinite Scroll Observer
  useEffect(() => {
    if (!useInfiniteScroll || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [useInfiniteScroll, hasNextPage, fetchNextPage]);

  // Fetch Runtimes
  useEffect(() => {
    if (!rawResults || maxRuntime === "all") return;

    const idsToFetch = rawResults
      .map((item: movieType) => item.id)
      .filter(
        (id: number) => typeof id === "number" && runtimes[id] === undefined
      );

    if (!idsToFetch.length) return;

    let cancelled = false;

    const fetchRuntimes = async () => {
      try {
        setIsFetchingRuntime(true);
        const responses = await Promise.all(
          idsToFetch.map((id) =>
            http(`movie/${id}?language=pt-BR`, detailsOptions)
          )
        );

        if (cancelled) return;

        const newMap: Record<number, number> = { ...runtimes };

        responses.forEach((response) => {
          const data = response.data as MovieDetails;
          const movieId = data.id;
          const runtime = data.runtime;

          if (
            typeof movieId === "number" &&
            typeof runtime === "number" &&
            runtime > 0
          ) {
            newMap[movieId] = runtime;
          }
        });

        setRuntimes(newMap);
      } finally {
        if (!cancelled) {
          setIsFetchingRuntime(false);
        }
      }
    };

    fetchRuntimes();

    return () => {
      cancelled = true;
    };
  }, [rawResults, maxRuntime, runtimes]);

  const languageOptions = useMemo(() => {
    if (!rawResults) return [];

    const set = new Set<string>();

    rawResults.forEach((item: movieType) => {
      if (item.original_language) {
        set.add(item.original_language);
      }
    });

    return Array.from(set.values()).sort();
  }, [rawResults]);

  const filteredResults = useMemo(() => {
    if (!rawResults) return;

    let results = [...rawResults];

    if (releaseYear) {
      results = results.filter(
        (item) =>
          item.release_date &&
          item.release_date.startsWith(releaseYear.toString())
      );
    }

    if (minRating > 0) {
      results = results.filter(
        (item) =>
          typeof item.vote_average === "number" &&
          item.vote_average >= minRating
      );
    }

    if (language !== "all") {
      results = results.filter((item) => item.original_language === language);
    }

    if (maxRuntime !== "all") {
      const runtimeLimit = Number(maxRuntime);

      if (!Number.isNaN(runtimeLimit)) {
        results = results.filter((item) => {
          const runtime = runtimes[item.id];
          if (typeof runtime !== "number") return false;
          return runtime <= runtimeLimit;
        });
      }
    }

    // Sorting
    results.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.vote_average - a.vote_average;
        case "date":
          return (
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime()
          );
        case "az":
          return a.title.localeCompare(b.title);
        case "popularity":
        default:
          return b.popularity - a.popularity;
      }
    });

    return results;
  }, [
    rawResults,
    language,
    maxRuntime,
    minRating,
    releaseYear,
    runtimes,
    sortBy,
  ]);

  const isLoadingList =
    isPending || (isFetchingRuntime && maxRuntime !== "all");

  const hasBaseResults = !isLoadingList && rawResults && rawResults.length > 0;
  const hasFilteredResults =
    hasBaseResults && filteredResults && filteredResults.length > 0;

  return (
    <section className="min-h-screen relative">
      <TitleDescription title={title} description={desc} />
      <Box
        mt="40px"
        bg="#0a0d14"
        borderRadius="16px"
        p={{ base: "16px", md: "24px" }}
      >
        <Flex align="center" gap="8px" mb="20px">
          <Text fontSize="lg" fontWeight="bold" color="white">
            Filtros
          </Text>
          <Tooltip
            label="Este filtro é aplicado apenas aos filmes listados abaixo e não realiza uma nova busca na API."
            hasArrow
            placement="top"
          >
            <InfoOutlineIcon color="gray.400" cursor="help" />
          </Tooltip>
        </Flex>
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: "16px", md: "20px" }}
          align={{ base: "stretch", md: "flex-end" }}
          justify="space-between"
          flexWrap="wrap"
        >
          <Box flex="1" minW={{ base: "100%", md: "160px" }}>
            <Text mb="6px" fontSize="sm" color="#fff9">
              Ano de lançamento
            </Text>
            <Input
              type="number"
              placeholder="Ex: 2020"
              value={releaseYear}
              onChange={(event) => setReleaseYear(event.target.value)}
              min={1900}
              max={3000}
              bg="#131722"
              borderColor="#2d323f"
              _hover={{ borderColor: "#4a5163" }}
              _focus={{
                borderColor: "#23a7d7",
                boxShadow: "0 0 0 1px #23a7d7",
              }}
            />
          </Box>

          <Box flex="1" minW={{ base: "100%", md: "160px" }}>
            <Text mb="6px" fontSize="sm" color="#fff9">
              Nota mínima
            </Text>
            <NumberInput
              min={0}
              max={10}
              step={0.5}
              value={minRating}
              onChange={(_, valueAsNumber) =>
                setMinRating(Number.isNaN(valueAsNumber) ? 0 : valueAsNumber)
              }
            >
              <NumberInputField
                bg="#131722"
                borderColor="#2d323f"
                _hover={{ borderColor: "#4a5163" }}
                _focus={{
                  borderColor: "#23a7d7",
                  boxShadow: "0 0 0 1px #23a7d7",
                }}
              />
            </NumberInput>
          </Box>

          <Box flex="1" minW={{ base: "100%", md: "160px" }}>
            <Text mb="6px" fontSize="sm" color="#fff9">
              Idioma
            </Text>
            <Select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              bg="#131722"
              borderColor="#2d323f"
              _hover={{ borderColor: "#4a5163" }}
              _focus={{
                borderColor: "#23a7d7",
                boxShadow: "0 0 0 1px #23a7d7",
              }}
              sx={{ option: { color: "black" } }}
            >
              <option value="all">Todos os idiomas</option>
              {languageOptions.map((lang) => (
                <option key={lang} value={lang}>
                  {lang.toUpperCase()}
                </option>
              ))}
            </Select>
          </Box>

          <Box flex="1" minW={{ base: "100%", md: "160px" }}>
            <Text mb="6px" fontSize="sm" color="#fff9">
              Duração máxima
            </Text>
            <Select
              value={maxRuntime}
              onChange={(event) => setMaxRuntime(event.target.value)}
              bg="#131722"
              borderColor="#2d323f"
              _hover={{ borderColor: "#4a5163" }}
              _focus={{
                borderColor: "#23a7d7",
                boxShadow: "0 0 0 1px #23a7d7",
              }}
              sx={{ option: { color: "black" } }}
            >
              <option value="all">Qualquer duração</option>
              <option value="60">Até 1h</option>
              <option value="90">Até 1h30</option>
              <option value="120">Até 2h</option>
              <option value="150">Até 2h30</option>
              <option value="180">Até 3h</option>
            </Select>
          </Box>

          <Box flex="1" minW={{ base: "100%", md: "160px" }}>
            <Text mb="6px" fontSize="sm" color="#fff9">
              Ordenar por
            </Text>
            <Select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              bg="#131722"
              borderColor="#2d323f"
              _hover={{ borderColor: "#4a5163" }}
              _focus={{
                borderColor: "#23a7d7",
                boxShadow: "0 0 0 1px #23a7d7",
              }}
              sx={{ option: { color: "black" } }}
            >
              <option value="popularity">Mais populares</option>
              <option value="rating">Melhor avaliados</option>
              <option value="date">Mais recentes</option>
              <option value="az">A-Z</option>
            </Select>
          </Box>

          <FormControl
            display="flex"
            alignItems="center"
            width="auto"
            minW={{ base: "100%", md: "auto" }}
            mt={{ base: "10px", md: "0" }}
          >
            <FormLabel
              htmlFor="infinite-scroll"
              mb="0"
              color="#fff9"
              fontSize="sm"
              mr={3}
            >
              Rolagem Infinita
            </FormLabel>
            <Switch
              id="infinite-scroll"
              isChecked={useInfiniteScroll}
              onChange={(e) => setUseInfiniteScroll(e.target.checked)}
              colorScheme="cyan"
            />
          </FormControl>
        </Flex>
      </Box>
      <Skeleton
        isLoaded={!isLoadingList}
        startColor="#2d323f"
        endColor="#131722"
        mt="32px"
        borderRadius="md"
        minH="300px"
      >
        {hasFilteredResults ? (
          <Box>
            <Grid
              templateColumns={{
                base: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(4, 1fr)",
                lg: "repeat(5, 1fr)",
              }}
              gap={{ sm: "20px", lg: "40px" }}
              rowGap={"80px"}
            >
              {filteredResults.map(
                (item, index: number) =>
                  (useInfiniteScroll || index < 12) && (
                    <CardMovie key={`${item.id}-${index}`} data={item} />
                  )
              )}
            </Grid>

            {useInfiniteScroll && (
              <Center mt="40px" ref={observerTarget} minH="50px">
                {isFetchingNextPage && <Spinner color="cyan.400" />}
                {!hasNextPage &&
                  !isFetchingNextPage &&
                  rawResults.length > 0 && (
                    <Text color="gray.500">Você chegou ao fim da lista.</Text>
                  )}
              </Center>
            )}
          </Box>
        ) : (
          <EmptyState
            title="Nenhum filme encontrado!"
            description={
              hasBaseResults
                ? "Nenhum filme corresponde aos filtros selecionados. Tente ajustar os filtros de ano, nota, idioma ou duração."
                : "Tente ajustar seus termos de pesquisa ou explore outras categorias."
            }
            actionText="Voltar para o Início"
            actionLink="/"
          />
        )}
      </Skeleton>

      {hasFilteredResults && !useInfiniteScroll && (
        <PaginationArea
          infos={{
            setPage,
            pageSelected: currentPage,
            isPending,
            totalPages: totalPages,
          }}
        />
      )}
    </section>
  );
}
