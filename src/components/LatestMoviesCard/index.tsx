import { AspectRatio, Flex, Heading, Image, Slide } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import setCurrentMovie from "../../helpers/setCurrentMovie";

interface typeProp {
  data: {
    id: number;
    backdrop_path: string;
    title: string;
  };
}

export default function LatestMoviesCard({
  data: { backdrop_path, title, id },
}: typeProp) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <AspectRatio className="h-[300px] relative z-10" ratio={4 / 3}>
      <>
        <Image
          src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
          alt="naruto"
          objectFit="cover"
        />
        <div
          onMouseEnter={() => setShowDetails(true)}
          onMouseLeave={() => setShowDetails(false)}
          className="transition-all duration-300 absolute inset-0 bg-black/30 hover:bg-black/60 "
        >
          <Slide
            direction="bottom"
            in={showDetails}
            style={{ zIndex: 10, position: "absolute", padding: "8px" }}
          >
            <Flex
              flexDir="column"
              justifyContent={"center"}
              alignItems="center"
              gap="8px"
            >
              <Heading as="h4" fontSize={"22px"}>
                {title}
              </Heading>
              <Link
                onClick={() => setCurrentMovie(id)}
                to={`/${title}`}
                className="text-sm font-medium text-[#23a7d7]  hover:underline"
              >
                Ver Mais Informações
              </Link>
            </Flex>
          </Slide>
        </div>
      </>
    </AspectRatio>
  );
}
