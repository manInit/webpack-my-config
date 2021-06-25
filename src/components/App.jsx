import '../styles/index.scss';
import Character from './Characters';
import anime3 from '../images/anime3.jpg';
import icon from '../images/icon.svg';

const App = () => {
  return (
    <>
      <section className="character"></section>
      <main>
        <section>
          <h1>Hai react</h1>
        </section>
        <img src={anime3} alt="anime3" width="200"/>
        <img src={icon} alt="icon" width="64" height="64"/>
        <Character />
      </main>
    </>
  )
}

export default App; 