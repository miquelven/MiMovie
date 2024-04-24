export default function setCurrentMovie(id: number) {
  localStorage.setItem("currentMovie", JSON.stringify(id));
}
