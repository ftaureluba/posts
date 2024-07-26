import React from 'react';

import styles from '../styles/exerciseForm.module.css';
function ExerciseForm({ sets, handleChange, addSet }) {
  return (
    <div>
      {sets.map((set, setIndex) => (
        <div key={setIndex} style = {{ display: 'flex', marginBottom : '2px'}}>
          
          <input
            type="number"
            name="reps"
            placeholder="Reps"
            value={set.reps}
            onChange={(e) => handleChange(setIndex, e)}
            className={styles.inputField}
          />
          <input
            type="number"
            name="weight"
            placeholder="Weight"
            value={set.weight}
            onChange={(e) => handleChange(setIndex, e)}
            className={styles.inputField}
          />
        </div>
      ))}
      <button type="button" onClick={addSet} className={styles.addButton}>Add Set</button>
    </div>
  );
}

export default ExerciseForm;