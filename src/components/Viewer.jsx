import React from 'react'
import './Viewer.css'
import { getEmotionImage } from '../util/getEmotionImage'

const Viewer = () => {
  const emotionId = 1
  return (
    <div className='Viewer'>
      <section className="view-img-section">
        <h4>오늘의 감정</h4>
        <div className={`emotion-img-wrap img-${emotionId}`}>
          <img src={getEmotionImage(emotionId)} alt="" />
        </div>
      </section>
      <section className="content-section">
        <h4>오늘의 일기</h4>
        <div className="content-wrapper">
          <p>일기 내용</p>
        </div>
      </section>
    </div>
  )
}

export default Viewer