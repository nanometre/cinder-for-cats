import { data } from './data/Data';

import Navbar from './components/Navbar';
import Switch from './components/Switch';
import Card from './components/Card';

function App() {
  const cats = data

  return (
    <div className="App h-screen bg-white dark:bg-base-100">
      <Navbar />
      <div className="flex flex-col items-center m-16">
        <Switch />
        {cats.map(cat => 
          <Card cat={cat}/>
        )}
      </div>
    </div>
  );
}

export default App;
