import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DiaryStateContext } from '../App'

const useDiary = (id, { redirectOnMissing = true } = {}) => {
    const nav = useNavigate()
    const data = useContext(DiaryStateContext)
    const [curDiary, setCurDiary] = useState(null)
    useEffect(() => {
        const curDiary = data.find((i) => String(i.id) === String(id))
        if (!curDiary) {
            if (redirectOnMissing) {
                window.alert("존재하지 않는 일기 입니다.")
                nav("/", { replace: true })
            }
            setCurDiary(null)
            return
        }
        setCurDiary(curDiary)
    }, [id, data, nav, redirectOnMissing])
    return curDiary
}

export default useDiary