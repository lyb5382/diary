import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Diary from './pages/Diary'
import Edit from './pages/Edit'
import Home from './pages/Home'
import New from './pages/New'
import Notfound from './pages/Notfound'
import { createContext, useEffect, useReducer, useRef, useState } from 'react'


const mockData = [{
  id: 1,
  createdDate: new Date('2025-08-17').getTime(),
  emotionId: 1,
  content: "1번 내용"
}, {
  id: 2,
  createdDate: new Date('2025-08-05').getTime(),
  emotionId: 2,
  content: "2번 내용"
}, {
  id: 3,
  createdDate: new Date('2025-08-01').getTime(),
  emotionId: 3,
  content: "3번 내용"
}]

function reducer(state, action) {
  switch (action.type) {
    case 'INTI':
      return action.data
    case 'CREATE':
      return [action.data, ...state]
    case 'UPDATE':
      return state.map((item) => String(item.id) === String(action.data.id) ? action.data : item)
    case 'DELETE':
      return state.filter((item) => String(item.id) !== String(action.id))
    default:
      return state
  }
}
export const DiaryStateContext = createContext()
export const DiaryDispatchContext = createContext()
export const ThemeContext = createContext()

function App() {
  const [data, dispatch] = useReducer(reducer, mockData)
  const idRef = useRef(4)
  const [dark, setDark] = useState(false)
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
    dispatch({
      type: 'INIT',
      data: mockData
    })
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
