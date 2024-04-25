import { useWatchLaterStore } from "../stores/watchLaterStore";

export default function WatchLater() {
  const watchLaterMovie = useWatchLaterStore((state) => state.watchLaterMovie);

  return (
    <div>
      {watchLaterMovie.map((item) => (
        <div>{item.title}</div>
      ))}
    </div>
  );
}
