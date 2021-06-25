import '../styles/index.scss';
import Character from './Characters';
import anime3 from '../images/anime3.jpg';

const App = () => {
  return (
    <>
      <section className="character"></section>
      <main>
        <section>
          <h1 className="title">Hai react bye</h1>
        </section>
        <img src={anime3} alt="anime3" width="200"/>
        <Character />
      </main>
    </>
  )
}

export default App; 