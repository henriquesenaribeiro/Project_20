
import React from 'react'

const DestinationSelector = ({ selected, onChange, options }) => {
  return (
    <div className="selector">
      <label htmlFor="destination">Choose a destination: </label>
      <select
        id="destination"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((dest, i) => (
          <option key={i} value={dest}>
            {dest}
          </option>
        ))}
      </select>
    </div>
  )
}

export default DestinationSelector
