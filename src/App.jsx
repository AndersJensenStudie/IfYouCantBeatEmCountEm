import { useState } from "react"
import "./App.css"

export default function App() {
  const [selectedOption, setSelectedOption] = useState('')

  const [calculatedValue, setCalculatedValue] = useState(0)

  const [currentLevel, setCurrentLevel] = useState(100);

  const [finalLevel, setFinalLevel] = useState(100);

  const expGroups = [
    'Erratic',
    'Fast',
    'Medium Fast',
    'Medium Slow',
    'Slow',
    'Fluctuating'
  ]

  function calculateExpLeft (option, currentLevel, finalLevel) {
    // Calculate the amount of experience left until the input level is reached based on the selected option
    let newCalculatedValue = 0;
    let finalExp = 0;
    let currentExp = 0;
    switch (option) {
      case 'Erratic':
        finalExp = calculateErratic(finalLevel);
        currentExp = calculateErratic(currentLevel);
        break;
      case 'Fast':
        finalExp = (4 * finalLevel**3) / 5;
        currentExp = (4 * currentLevel**3) / 5;
        break;
      case 'Medium Fast':
        finalExp = (finalLevel**3);
        currentExp = (currentLevel**3);
        break;
      case 'Medium Slow':
        finalExp = 1.2 * finalLevel**3 - 15 * finalLevel**2 + 100 * finalLevel - 140;
        currentExp = (currentLevel == 0) ? 0 : 1.2 * currentLevel**3 - 15 * currentLevel**2 + 100 * currentLevel - 140;
        break;
      case 'Slow':
        finalExp = (5 * finalLevel**3) / 4;
        currentExp = (5 * currentLevel**3) / 4;
        break;
      case 'Fluctuating':
        finalExp = calculateFluct(finalLevel);
        currentExp = calculateFluct(currentLevel);
        break;
      default:
        finalExp = 0;
        currentLevel = 0;
    }
    newCalculatedValue = Math.floor(finalExp - currentExp);
    if (newCalculatedValue < 0) {newCalculatedValue = 0}
    setCalculatedValue(newCalculatedValue);
  }

  const finalLevelChange = (event) => {
    const newFinalLevel = event.target.value !== '' ? parseInt(event.target.value, 10) : 100;
    setFinalLevel(newFinalLevel);
    calculateExpLeft(selectedOption, currentLevel, newFinalLevel);
  };

  const currentLevelChange = (event) => {
    const newCurrentLevel = event.target.value !== '' ? parseInt(event.target.value, 10) : 100;
    setCurrentLevel(newCurrentLevel);
    calculateExpLeft(selectedOption, newCurrentLevel, finalLevel);
  }

  const handleDropdownChange = (event) => {
    const newSelectedOption = event.target.value
    setSelectedOption(newSelectedOption)
    calculateExpLeft(newSelectedOption, currentLevel, finalLevel)
  };

  function calculateErratic(n) {
    let result = 0;
    if (n >= 98) {
      result = (n**3 * (160 - n)) / 100;
    }
    else if (n >= 68) {
      result = (n**3 * Math.floor((1911 - 10 * n)/3)) / 500;
    }
    else if (n >= 50) {
      result = (n**3*(150-n))/100;
    }
    else {
      result = (n**3 * (100 - n))/50;
    }
    return result;
  }

  function calculateFluct(n) {
    let result = 0;
    if (n >= 36) {
      result = (n**3 * (Math.floor(n/2)+32))/50;
    }
    else if (n >= 15) {
      result = (n**3*(n+14))/50;
    }
    else {
      result = (n**3 * (Math.floor((n + 1) / 3) + 24)) / 50;
    }
    return result;
  }

  return <>
    <form>
      <label htmlFor="currentLevel">Current level</label>
      <input type="number" id="currentLevel" onChange={currentLevelChange}/>
      <br/>
      <label htmlFor="finalLevel">Level you want to reach</label>
      <input type="number" id="finalLevel" onChange={finalLevelChange}/>
      <br/>
      <label htmlFor="avrgExp">Average Exp. points obtained</label>
      <input type="number" id="avrgExp"/>
      <br/>
      <label htmlFor="expGroup">Experience group of current Pokémon</label>
      <select
        id="expGroup"
        name="expGroup"
        value={selectedOption}
        onChange={handleDropdownChange}
      >
        <option value="" disabled>
          Choose an option
        </option>
        {expGroups.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

       {selectedOption && (
        <p>Exp. left: {calculatedValue}</p>
      )}
    </form>
  </>
}