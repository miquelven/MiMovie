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
} from "@chakra-ui/react";
import useGetMovies from "../../hooks/useGetMovies";
import CardMovie from "../CardMovie";
import { useEffect, useMemo, useState } from "react";
import PaginationArea from "../PaginationArea";
import TitleDescription from "../TitleDescription";
import EmptyState from "../EmptyState";
import http from "../../helpers/http";

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

export default function ListMovies({ title, desc, url }: propType) {
  const [currentPage, setCurrentPage] = useState(1);
  const [releaseYear, setReleaseYear] = useState<string>("");
  const [minRating, setMinRating] = useState<number>(0);
  const [language, setLanguage] = useState<string>("all");
  const [maxRuntime, setMaxRuntime] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [runtimes, setRuntimes] = useState<Record<number, number>>({});
  const [isFetchingRuntime, setIsFetchingRuntime] = useState(false);

  const setPage = (newValue: number) => {
    setCurrentPage(newValue);
  };

  const { data, isPending } = useGetMovies(url, currentPage);

  useEffect(() => setCurrentPage(1), [url]);

  useEffect(() => {
    if (!data || !data.results || maxRuntime === "all") return;

    const idsToFetch = data.results
      .map((item: any) => item.id)
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
          const movieId = response.data.id;
          const runtime = response.data.runtime;

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
  }, [data, maxRuntime, runtimes]);

  const languageOptions = useMemo(() => {
    if (!data || !data.results) return [];

    const set = new Set<string>();

    data.results.forEach((item: any) => {
      if (item.original_language) {
        set.add(item.original_language);
      }
    });

    return Array.from(set.values()).sort();
  }, [data]);

  const filteredResults = useMemo(() => {
    if (!data || !data.results) return;

    let results = data.results as any[];

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
  }, [data, language, maxRuntime, minRating, releaseYear, runtimes, sortBy]);

  const isLoadingList =
    isPending || (isFetchingRuntime && maxRuntime !== "all");

  const hasBaseResults = !isLoadingList && data && data.results.length > 0;
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
            >
              <option value="popularity">Mais populares</option>
              <option value="rating">Melhor avaliados</option>
              <option value="date">Mais recentes</option>
              <option value="az">A-Z</option>
            </Select>
          </Box>
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
                index < 12 && <CardMovie key={index} data={item} />
            )}
          </Grid>
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

      {hasFilteredResults && (
        <PaginationArea
          infos={{
            setPage,
            pageSelected: currentPage,
            isPending,
            totalPages: data.total_pages,
          }}
        />
      )}
    </section>
  );
}
