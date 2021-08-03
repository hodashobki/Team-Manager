import logo from './logo.svg';
import './App.css';
import { Router } from '@reach/router';
import MainPage from './components/MainPage';
import PlayerForm from './components/PlayerForm';
import StatusPage from './components/StatusPage';
import GameStatus from './components/GameStatus';

function App() {
  return (
    <div className="App">
     <Router>
       <MainPage path="/"/>
       <PlayerForm path="/create"/>
       <StatusPage path="/manage"/>
       <GameStatus path="/status"/>
     </Router>
    </div>
  );
}

export default App;
