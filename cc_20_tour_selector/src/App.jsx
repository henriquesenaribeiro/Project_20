
import React, { useEffect, useState } from 'react'
import Gallery from './components/Gallery'
import DestinationSelector from './components/DestinationSelector'

function App() {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState('All')
  const [removedIds, setRemovedIds] = useState([])

  const staticTours = [
    {
      id: "rec6d6T3q5EBIdCfD",
      name: "Best of Paris in 7 Days Tour",
      info:
        "Paris is synonymous with the finest things that culture can offer — in art, fashion, food, literature, and ideas. On this tour, your Paris-savvy Rick Steves guide will immerse you in the very best of the City of Light: the masterpiece-packed Louvre and Orsay museums, resilient Notre-Dame Cathedral, exquisite Sainte-Chapelle, and extravagant Palace of Versailles. You'll also enjoy guided neighborhood walks through the city's historic heart as well as quieter moments to slow down and savor the city's intimate cafés, colorful markets, and joie de vivre. Join us for the Best of Paris in 7 Days!",
      image: "https://www.course-api.com/images/tours/tour-1.jpeg",
      price: "1,995",
    },
    {
      id: "recIwxrvU9HfJR3B4",
      name: "Best of Ireland in 14 Days Tour",
      info:
        "Rick Steves' Best of Ireland tour kicks off with the best of Dublin, followed by Ireland's must-see historical sites, charming towns, music-filled pubs, and seaside getaways — including Kinsale, the Dingle Peninsula, the Cliffs of Moher, the Aran Islands, Galway, Connemara, Giant's Causeway, and the compelling city of Belfast. All along the way, Rick's guides will share their stories to draw you in to the Emerald Isle, and the friendliness of the people will surely steal your heart. Join us for the Best of Ireland in 14 Days!",
      image: "https://www.course-api.com/images/tours/tour-2.jpeg",
      price: "3,895",
    },
    {
      id: "recJLWcHScdUtI3ny",
      name: "Best of Salzburg & Vienna in 8 Days Tour",
      info:
        "Let's go where classical music, towering castles, and the-hills-are-alive scenery welcome you to the gemütlichkeit of Bavaria and opulence of Austria's Golden Age. Your Rick Steves guide will bring this region's rich history and culture to life in festive Munich, Baroque Salzburg, sparkling Lake Hallstatt, monastic Melk, the blue Danube, and royal Vienna — with cozy villages and alpine vistas all along the way. Join us for the Best of Munich, Salzburg & Vienna in 8 Days!",
      image: "https://www.course-api.com/images/tours/tour-3.jpeg",
      price: "2,695",
    },
    {
      id: "recK2AOoVhIHPLUwn",
      name: "Best of Rome in 7 Days Tour",
      info:
        "Our Rome tour serves up Europe's most intoxicating brew of dazzling art, earth-shaking history, and city life with style. On this Rome vacation, your tour guide will resurrect the grandeur of ancient Rome's Colosseum, Forum, Pantheon, and nearby Ostia Antica. From the Renaissance and Baroque eras, you'll marvel at St. Peter's Basilica, the Vatican Museums, Sistine Chapel, and Borghese Gallery. You'll also enjoy today's Rome, with neighborhood walking tours, memorable restaurants, and time to explore on your own. Join us for the Best of Rome in 7 Days!",
      image: "https://www.course-api.com/images/tours/tour-4.jpeg",
      price: "2,095",
    },
    {
      id: "receAEzz86KzW2gvH",
      name: "Best of Poland in 10 Days Tour",
      info:
        "Starting in the colorful port city of Gdańsk, you'll escape the crowds and embrace the understated elegance of ready-for-prime-time Poland for 10 days. With an expert Rick Steves guide at your side, you'll experience mighty Malbork castle, the cobbly-cute village of Toruń, Poland's contemporary capital of Warsaw, the spiritual Jasna Góra Monastery, and charming Kraków — Poland's finest city. In this land of surprises — so trendy and hip, yet steeped in history — there's so much to discover. Join us for the Best of Poland in 10 Days!",
      image: "https://www.course-api.com/images/tours/tour-5.jpeg",
      price: "2,595",
    },
  ]

  const fetchTours = async () => {
    setLoading(true)
    setError(null)

    try {
      // Using static data instead of fetch
      setTours(staticTours)
    } catch (err) {
      setError('Failed to fetch tours.')
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchTours()
  }, [])

  const handleRemove = (id) => {
    setRemovedIds([...removedIds, id])
  }

  const handleRefresh = () => {
    fetchTours()
    setRemovedIds([])
    setSelected('All')
  }

  const filteredTours = tours.filter((tour) => {
    const notRemoved = !removedIds.includes(tour.id)
    const match = selected === 'All' || tour.name === selected
    return notRemoved && match
  })

  const uniqueDestinations = ['All', ...new Set(tours.map((tour) => tour.name))]

  return (
    <main>
      <h1>🌍 Tour Destination Selector</h1>
      <DestinationSelector
        selected={selected}
        onChange={setSelected}
        options={uniqueDestinations}
      />
      {loading ? (
        <p>Loading tours...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredTours.length === 0 ? (
        <>
          <p>No tours left. Refresh to reload.</p>
          <button onClick={handleRefresh}>Refresh</button>
        </>
      ) : (
        <Gallery tours={filteredTours} onRemove={handleRemove} />
      )}
    </main>
  )
}

export default App
