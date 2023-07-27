import { useEffect, useContext } from "react";
import "./dist/style.css";
import { words } from "popular-english-words";

import Wordle from "./components/Wordle";
import { AppContext } from "./contexts/AppContext";

function App() {
  const { solution, setSolution } = useContext(AppContext);
  const { setPopularWords } = useContext(AppContext);

  // All words with length 5
  const dictionary = words.getMostPopularLength(100000, 5);
  const count = 1000;
  const randomNumber = Math.floor(Math.random() * count);

  useEffect(() => {
    const fetchData = async () => {
      // The 1000(count) most popular words with length 5
      const popularWordsFetched = await words.getMostPopularLength(count, 5);
      setPopularWords(popularWordsFetched);
      setSolution(popularWordsFetched[randomNumber]);
    };

    fetchData().catch((err) => console.log(err));
  }, []);

  return <div className="App">{solution && dictionary && <Wordle solution={solution} dictionary={dictionary} />}</div>;
}

export default App;
