import logo from './logo.svg';
import './App.css';
import { Feed } from './components/Feed';

function App() {
  return (
    <div className="App">
      <div className="container">
        <button>Logout</button>
        <Feed></Feed>
        <div>Profile</div>
      </div>
    </div>
  );
}

export default App;
