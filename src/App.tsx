import React from 'react';
import './App.css';

// =========== Types ==================

type BasePlant = { lastWater : number, waterEveryMin : number, waterEveryMax : number, overWater : number }

type Plant =
  | { form: "Seed" } & BasePlant
  | { form: "Seedling" } & BasePlant
  | { form: "SmallPlant" } & BasePlant

type Plot = {
  plant: Plant | null  
}

function App() {

  // =========== Set up ticks ==================
  const [tick, setTick] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTick(currentTick => currentTick + 1)
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [plots, setPlots] = React.useState<(Plant|null)[]>([])

  // =========== Set up initial plots ==================
  React.useEffect(() => {
    const initialPlots: Array<Plant|null> = [...Array(9)]
      .map(_=>Math.ceil(Math.random() * 10))
      .map(num => {
        if (num % 2) {
          return getBasicSeed()
        } 
          return null
    });
    setPlots(initialPlots)
  }, []) // empty array here means this only runs once on app initialization


  // =========== Handle watering ==================
  const waterClick = (plotId: number) => {

    const updatePlot = (plot: (Plant|null), index: number): (Plant|null) => {
      // If we find a plot with an index matching, and that plot isn't null, update it
      if(index == plotId && plot !== null) {
        return {...plot, lastWater: tick}
      } 

      // Otherwise return each plot as is
      return plot
    }

    // we use a map here to avoid mutation
    const updatedPlots = plots.map(updatePlot)

    setPlots(updatedPlots)
  }


  // =========== VIEW ==================
  return (
    <div className="container mx-auto">
      <h1>Garden</h1>
      <p><strong>Current Tick - {tick}</strong></p>
      <p>Plants need water every 14 ticks or they'll suffer. Click a plant to water it</p>
      <div className="garden grid gap-4 grid-cols-3 grid-rows-3 w-1/2">
        { plots.map((plant, index) => <Plot key={index} waterPlant={waterClick} plant={plant} plotId={index} tick={tick}/>) }        
      </div>
    </div>
  );
}

// =========== Plot view ==================
function Plot(props: {tick: number, plant: Plant | null, plotId: number, waterPlant: (plotId: number) => void}){
  if(props.plant == null) {
      return (
        <div className="bg-yellow-800 bg-yellow-900"></div>
      )
  }

  // 
  const contextClass = ((props.tick - props.plant.lastWater) > 14) ? "bg-red-400" : "bg-green-400"

  return (
    <div onClick={() => {props.waterPlant(props.plotId)}} className={`${contextClass}`}>
      <strong>{simpleLabel(props.plant)}</strong>
      <p>Last Watered: {props.plant.lastWater}</p>
    </div>
  )
}


// =========== Helper functions ==================
function simpleLabel(plant: Plant): string {
  return plant.form
}

function getBasicSeed(): Plant {
  return { form : "Seed", lastWater : 0, waterEveryMin : 11, waterEveryMax : 14, overWater : 2 }

}

export default App;
