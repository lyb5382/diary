import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DiaryStateContext } from '../App'

const useDiary = () => {
    const nav = useNavigate()
    const data = useContext(DiaryStateContext)
    const { id } = useParams()
    const [curDiary, setCurDiary] = useState(null)
    useEffect(() => {
        const currentDiaryItem = data.find((i) => String(i.id) === String(id))
        if (!currentDiaryItem) {
            window.alert('존재하지 않음')
        } else {
            setCurDiary(currentDiaryItem)
        }
    }, [id, data, nav])
    return curDiary
}

export default useDiary