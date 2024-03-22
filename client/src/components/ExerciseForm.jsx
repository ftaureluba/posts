import React from 'react';

function ExerciseForm({ sets, handleChange, addSet }) {
  return (
    <div>
      {sets.map((set, setIndex) => (
        <div key={setIndex}>
          <input
            type="number"
            name="reps"
            placeholder="Reps"
            value={set.reps}
            onChange={(e) => handleChange(setIndex, e)}
          />
          <input
            type="number"
            name="weight"
            placeholder="Weight"
            value={set.weight}
            onChange={(e) => handleChange(setIndex, e)}
          />
        </div>
      ))}
      <button type="button" onClick={addSet}>Add Set</button>
    </div>
  );
}

export default ExerciseForm;