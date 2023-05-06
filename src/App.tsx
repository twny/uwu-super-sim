import type { Component } from 'solid-js';
import Home from './components/Home';
import Game from './components/Game';

import { Router, Route, Routes } from "@solidjs/router";

const App: Component = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/game" component={Game} />
      </Routes>
    </Router>
  );
};

export default App;
