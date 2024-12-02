import React, { useState } from 'react'

function useMultiStepForm(steps) {

    const [currentStepIndice, setCurrentStepIndice] = useState(0)

    function siguiente(){
        setCurrentStepIndice(i => {
            if (i > steps.length - 1) {return i}
            return i + 1
        })
    }
    function anterior(){
        setCurrentStepIndice(i => {
            if (i <= 0) {return i}
            return i - 1
        })
    }
    function goTo(indice){
        setCurrentStepIndice(indice)
    }

    return {
        step : steps[currentStepIndice],
        currentStepIndice,
        siguiente,
        anterior,
        goTo,
        steps
    }
}

export default useMultiStepForm