import { useState } from 'react'
import axios from 'axios'

const SearchForCard = () => {
  const [cardToSearch, setCardToSearch] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()

    axios.get(`https://api.pokemontcg.io/v2/cards?q=name:${cardToSearch}`)
      .then((response) => {
        let card = response.data.data

        console.log(card)
      })
      .catch((err) => {
        console.log("Uh oh, something went wrong:", err)
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={ (e) => setCardToSearch(e.target.value) }/>
        <input type="submit" value="Search" />
      </form>

    </div>

  )
}

export default SearchForCard