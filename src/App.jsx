import s from './App.module.css'
import { api } from './constants/api'
import { useState, useEffect } from 'react'
import logo from '/logo.png'
import { Card } from './components/card'

function App() {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [inputPage, setInputPage] = useState("1")
  const [visiblePage, setVisiblePage] = useState(1)
  const cardsPerPage = 5

  useEffect(() => {
    const carrega = async () => {
      try {
        const response = await api.get(`?page=${page}`)
        setData(response.data.items || [])
        setVisiblePage(1)
      } catch (error) {
        console.error("deu ruim!!!", error)
        setData([])
      }
    }
    carrega()
  }, [page])
  
  const totalPages = Math.ceil(data.length / cardsPerPage)
  const visibleItems = data.slice((visiblePage - 1) * cardsPerPage, visiblePage * cardsPerPage)

  return (
    <>
      <img className={s.logo} src={logo} alt="Logo Dragon Ball"  />
      <div>
        <label>Choose Page</label>
        <input
          min={1}
          max={13}
          type="number"
          placeholder="1/13"
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
        />
        <button
          onClick={() => {
            const pageNumber = Number(inputPage)
            if (!Number.isNaN(pageNumber) && pageNumber >= 1) {
              setPage(pageNumber)
            }
          }}
        >
          BUSCAR
        </button>
      </div>
      <main className={s.grid}>
        {visibleItems.map((item) => {
          return(
            <div key={item.id}>
              <Card
                nome={item.name}
                imagem={item.image}
                especie={item.race}
                genero={item.gender}
                ki={item.ki}
                maxKi={item.maxKi}
                afiliacao={item.affiliation}
              />
            </div>
          )
        })}
      </main>
      <div className={s.pagination}>
        <button
          onClick={() => setVisiblePage((prev) => Math.max(1, prev - 1))}
          disabled={visiblePage === 1}
        >
          Previous
        </button>
        <span>Page {visiblePage} of {totalPages || 1}</span>
        <button
          onClick={() => setVisiblePage((prev) => Math.min(totalPages, prev + 1))}
          disabled={visiblePage >= totalPages}
        >
          Next
        </button>
      </div>
    </>
  )
}

export default App
