import './styles/index.css';

const charactersStat = {
	hp: 2,
	attack: 10,
	defense: 10,
	type: 'magic',
	weapon: 'stick of truth'
};

const reflectEnemy = {
	...charactersStat,
	drop: 'rune of Ansuz'
};


console.log(reflectEnemy);
console.log(charactersStat);