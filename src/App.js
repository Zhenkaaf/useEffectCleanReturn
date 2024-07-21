import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function setDefaultValueToLocalStor() {
  console.log("setDefaultValueToLocalStor");
  const userCount = localStorage.getItem("count");
  return userCount ? +userCount : 0;
}

function App() {
  console.log("renderStart");
  const [count, setCount] = useState(setDefaultValueToLocalStor());
  const [isCounting, setIsCounting] = useState(false);
  console.log("isCounting--", isCounting);
  const intervalRef = useRef(null);

  const handleReset = () => {
    setCount(0);
    setIsCounting(false);
  };

  const handleStart = () => {
    setIsCounting(true);
  };

  const handleStop = () => {
    setIsCounting(false);
  };

  useEffect(() => {
    console.log("useEffect count изменился");
    localStorage.setItem("count", count);
  }, [count]);

  useEffect(() => {
    if (isCounting) {
      console.log("useEffect включение таймера");
      intervalRef.current = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 5000);
    }

    return () => {
      console.log("useEffect размонтирование");
      intervalRef.current && clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isCounting]);

  return (
    <div className="App">
      <h1>React Timer</h1>
      <h3>{count}</h3>
      {!isCounting ? (
        <button onClick={handleStart}>Start</button>
      ) : (
        <button onClick={handleStop}>Stop</button>
      )}
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default App;

/* import React, { useState, useEffect } from 'react';

function SearchMovies({ searchQuery }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      setMovies([]);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=78584b3c&s=${searchQuery}`, { signal });
        const data = await response.json();
        if (data.Response === 'True') {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error('Fetch error:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [searchQuery]);

  return (
    <div>
      {loading && <h3>Loading...</h3>}
      {!loading && movies.length === 0 && <h3>No movies found</h3>}
      <ul>
        {movies.map(movie => (
          <li key={movie.imdbID}>{movie.Title}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="App">
      <input
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search for movies"
      />
      <SearchMovies searchQuery={searchQuery} />
    </div>
  );
}

export default App; */
