import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchForCard from './components/SearchForCard';

function App() {
  // we'll store the cards in state
  const [deck, setDeck] = useState([])
  const [cardsLoaded, setCardsLoaded] = useState(false)

  // We want to make a network request the FIRST time 
  // the component loads (in this case, App.js, which is the application itself)
  // using async-await
  // useEffect(() => {

  //   const getPokemonCards = async () => {
  //     let response = await axios.get('https://api.pokemontcg.io/v2/cards')
  //     // this line will not be reached until the response comes back
  //     let allCards = response.data.data

  //     let deckToStoreInState = []

  //     // let's take 5 random cards, and add them to our deck
  //     for (let i = 0; i < 5; i++) {
  //       let randomIndex = Math.floor(Math.random() * 250)
  //       deckToStoreInState.push(allCards[randomIndex])
  //     }

  //     setDeck(deckToStoreInState)
  //     console.log(deckToStoreInState)
  //   }

  //   getPokemonCards()

  // }, [])


  // using promises
  useEffect(() => {
    axios.get('https://api.pokemontcg.io/v2/cards')
      // anything you plan on doing with the response's data must be done within
      // the callback passed into .then()
      .then((response) => {
        console.log("response received")
        let allCards = response.data.data

        let deckToStoreInState = []
        
        for (let i = 0; i < 5; i++) {
          let randomIndex = Math.floor(Math.random() * 250)
          deckToStoreInState.push(allCards[randomIndex])
        }


        setDeck(deckToStoreInState)
        setCardsLoaded(true)

        return "Hello"
      })// inside of the .then() function call, we pass in a callback function
      // you have the ability to chain these promises and what comes back from them
      .then((something) => {
        console.log(something)
      })
      // But what if something goes wrong?
      .catch((err) => {
        if(err.name === "AxiosError") {
          alert("Something went wrong with the network request. Please try again later.")
        } else {
          alert("The developer who built this is kind of a dunce, and wrote bad code")
        }
      })
  }, [])


  return (
    <div className="App">
      <SearchForCard />
      {
        cardsLoaded ?
        deck.map((card) => (
          <div className="card" key={card.id}>
              <h3>{card.name}</h3>

              <div className="attacks">
                {
                  card.attacks.map((attack, i) => (
                    <div key={i} className="attack-info">
                      <p>
                        <strong>{attack.name}</strong> {attack.text}
                      </p>
                      <span>{attack.damage}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          ))
        :
        <p>Please wait, loading cards from API</p>
      }
    </div>
  );
}

export default App;
