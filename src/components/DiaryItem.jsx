import React, { useContext } from 'react'
import './DiaryItem.css'
import { getEmotionImage } from '../util/getEmotionImage'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from '../App'

const DiaryItem = ({ id, createdDate, emotionId, content }) => {
    const nav = useNavigate()
    const { dark } = useContext(ThemeContext)
    return (
        <div className='DiaryItem'>
            <div className={`img-section bg-${emotionId}`} onClick={() => nav(`/diary/${id}`)}>
                <img src={getEmotionImage(emotionId)} alt="emotion icon" />
            </div>
            <div className={`info-section ${dark ? 'dark' : ''}`}>
                <div className="created-date">{new Date(createdDate).toLocaleDateString()}</div>
                <div className="content">{content}</div>
            </div>
            <div className="button-section">
                <Button text={'수정'} onClick={() => nav(`/edit/${id}`)} />
            </div>
        </div>
    )
}

export default DiaryItem