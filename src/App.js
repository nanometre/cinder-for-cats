import './App.css';
import Card from './components/Card';
import Navbar from './components/Navbar';
import Switch from './components/Switch';

function App() {
  return (
    <div className="App h-screen bg-white dark:bg-base-100">
      <Navbar />
      <div className="flex flex-col items-center m-16">
        <Switch />
        <Card />
      </div>
    </div>
  );
}

export default App;
