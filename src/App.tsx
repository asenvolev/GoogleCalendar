import { useState } from 'react';
import './App.css';
import Month from './components/Month';

function App() {
  const today = new Date();
  const [month, setMonth] = useState<number>(today.getMonth()+1);
  const [year, setYear] = useState<number>(today.getFullYear());

  return (
    <Month month={month} year={year}/>
  );
}

export default App;
