import { useState } from "react";
import "./App.css";
import Search from "./Components/Search";

function App() {
  const [query, setquery] = useState("");
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="src/assets/hero.png" alt="Hero banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
        </header>

        <Search query={query} setQuery={setquery} />
      </div>
    </main>
  );
}

export default App;
