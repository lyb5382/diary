import { useContext, useState } from 'react'
import Header from '../components/Header'
import Button from '../components/Button'
import DiaryList from '../components/DiaryList'
import { DiaryStateContext } from '../App'
import useTitle from '../hook/useTitle'

const Home = () => {
  const data = useContext(DiaryStateContext)
  useTitle("일기장 홈")
  const [pivoDate, setPivoDate] = useState(new Date())
  const getMonthlyData = (pivoDate, data) => {
    const beginTime = new Date(
      pivoDate.getFullYear(),
      pivoDate.getMonth(),
      1, 0, 0, 0
    ).getTime()
    const endTime = new Date(
      pivoDate.getFullYear(),
      pivoDate.getMonth() + 1,
      0, 23, 59, 59
    ).getTime()
    return data.filter((item) => beginTime <= item.createdDate && item.createdDate <= endTime)
  }
  const monthlyData = getMonthlyData(pivoDate, data)
  const onIncreamentMonth = () => {
    setPivoDate(new Date(pivoDate.getFullYear(), pivoDate.getMonth() + 1))
  }
  const onDecreamentMonth = () => {
    setPivoDate(new Date(pivoDate.getFullYear(), pivoDate.getMonth() - 1))
  }
  return (
    <div>
      <Header leftChild={<Button text={'<'} onClick={onDecreamentMonth} />}
        title={`${pivoDate.getFullYear()}년 ${pivoDate.getMonth() + 1}월`}
        rightChild={<Button text={'>'} onClick={onIncreamentMonth} />} />
      <DiaryList data={monthlyData} />
    </div>
  )
}

export default Home