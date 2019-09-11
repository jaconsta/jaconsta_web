const { useState } = React;

const headers = Array.from(document.querySelector('table thead').children)
const wordRows = Array.from(document.querySelector('table tbody').children)

const selector = (x, i) => x.children[i].firstChild.data
const game = wordRows.map(row => {
  const original = selector(row, 0)
  const translated = selector(row, 1)
  return { original, translated }
})

const titles = { original: selector(headers[0], 0), translated: selector(headers[0], 1) }

const randomIndex = (myArr) => Math.floor(Math.random() * myArr.length)

const But = () => {
  const [showWords, setShowWords] = useState([])
  const [selectedSource, setSelectedSource] = useState('original')

  const loadWords = () => setShowWords([...game])
  const setWordSource = ({ target }) => setSelectedSource(target.value)

  document.querySelector('table').style.display = showWords.length > 1 ? 'none' : 'block';

  return (
    <div>
      <button onClick={loadWords}>Test</button>
      <select onChange={setWordSource} value={selectedSource}>
        <option value='original'>{titles.original}</option>
        <option value='translated'>{titles.translated}</option>
      </select>
      {
        showWords.map(({ original, translated }) => <div key={original}> {selectedSource === 'original' ? original : translated}</div>)
      }
    </div>
  )
}


const App = <But />
