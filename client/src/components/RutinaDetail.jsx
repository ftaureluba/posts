import React from 'react'

function RutinaDetail(ejercicios) {
  console.log(ejercicios.props)
  const exercisesArray = ejercicios.props
  return ( <div>
    {exercisesArray.map((ejercicio, index) => (
    <div key={index}>
      <h2>{ejercicio}</h2>
      {/* Render other properties of the ejercicio object as needed */}
    </div>))}
  </div>
  )
}

export default RutinaDetail