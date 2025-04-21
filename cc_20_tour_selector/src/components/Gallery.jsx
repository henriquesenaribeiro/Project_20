import React from 'react'
import TourCard from './TourCard'

const Gallery = ({ tours, onRemove }) => {
  return (
    <section className="gallery">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} onRemove={onRemove} />
      ))}
    </section>
  )
}

export default Gallery
