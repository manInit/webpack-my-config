import { useState } from 'react';  

const charactersStat = {
	hp: 2,
	attack: 22,
	defense: 10,
	type: 'magic',
	weapon: 'stick of truth'
};

const reflectEnemy = {
	...charactersStat,
	drop: 'rune of Algiz'
};

const Characters = () => {
  const [character, setCharacter] = useState({});
  return (
    <div>
      <h3>Current character:</h3>
      <button onClick={() => setCharacter(charactersStat)}>Magic</button>
      <button onClick={() => setCharacter(reflectEnemy)}>Magic reflect enemy</button>
      <ul>
        {
          Object.keys(character).map(stat => (
            <li key={stat}>{stat}: {character[stat]}</li>  
          ))
        }
      </ul>
    </div>
  )
} 

export default Characters;