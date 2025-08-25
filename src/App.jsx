import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Diary from './pages/Diary'
import Edit from './pages/Edit'
import Home from './pages/Home'
import New from './pages/New'
import Notfound from './pages/Notfound'
import { createContext, useEffect, useReducer, useRef, useState } from 'react'

function reducer(state, action) {
  let nextState;
  switch (action.type) {
    case 'INTI':
      return action.data
    case 'CREATE':
      return [action.data, ...state]
    case 'UPDATE':
      nextState = state.map((item) => String(item.id) === String(action.data.id) ? action.data : item)
      break;
    case 'DELETE':
      nextState = state.filter((item) => String(item.id) !== String(action.id))
      break;
    default:
      return state
  }
  localStorage.setItem('diary', JSON.stringify(nextState))
  return nextState
}
export const DiaryStateContext = createContext()
export const DiaryDispatchContext = createContext()
export const ThemeContext = createContext()

function App() {
  const [data, dispatch] = useReducer(reducer, [])
  const idRef = useRef(0)
  const [loading, setLoading] = useState(true)
  const [dark, setDark] = useState(true)
  useEffect(() => {
    const rootElement = document.getElementById('root');
    if (dark) {
      document.body.classList.add('dark')
      rootElement?.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
      rootElement?.classList.remove('dark')
    }
  }, [dark])
  const darkbtn = () => {
    setDark(!dark)
  }

  useEffect(() => {
    const storedData = localStorage.getItem('diary')
    if (!storedData) {
      localStorage.setItem('diary', JSON.stringify([]))
      setLoading(false)
      return
    }
    let parsed = []
    try {
      parsed = JSON.parse(storedData)
    } catch {
      localStorage.setItem('diary', JSON.stringify([]))
      return
    }
    if (!Array.isArray(parsed)) {
      setLoading(false)
      return
    }
    let maxId = 0;
    parsed.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = item.id
      }
    })
    idRef.current = maxId + 1
    dispatch({
      type: "INIT",
      data: parsed
    })
    setLoading(false)
  }, [])

  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: 'CREATE',
      data: { id: idRef.current++, createdDate, emotionId, content }
    })
  }
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: 'UPDATE',
      data: { id, createdDate, emotionId, content }
    })
  }
  const onDelete = (id) => {
    dispatch({
      type: 'DELETE',
      id
    })
  }

  return (
    <div>
      <ThemeContext.Provider value={{ dark }}>
        <DiaryStateContext.Provider value={data}>
          <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
            <button className='darkmode' onClick={darkbtn}>{dark ? '☀️' : '🌙'}</button>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<New />} />
              <Route path='/edit/:id' element={<Edit />} />
              <Route path='/diary/:id' element={<Diary />} />
              <Route path='*' element={<Notfound />} />
            </Routes>
          </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
      </ThemeContext.Provider>
    </div >
  )
}

export default App
