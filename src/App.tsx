import React from 'react';
import logo from './logo.svg';
import './App.css';

const basicSeed = { type : "Seed", lastWater : 0, waterEveryMin : 11, waterEveryMax : 14, overWater : 2 }

  type BasePlant = { lastWater : Number, waterEveryMin : Number, waterEveryMax : Number, overWater : Number }

  type Plant =
    | { type: "Seed" } & BasePlant
    | { type: "Seedling" } & BasePlant
    | { type: "SmallPlant" } & BasePlant

  type Plot = {
    plant: Plant | null  
  }

function App() {

  const plots: Array<Plant|null> = [...Array(9)]
    .map(_=>Math.ceil(Math.random() * 10))
    .map(num => {
      if (num % 2) {
        return basicSeed as Plant
      } 
        return null
    });

  return (
    <div className="container mx-auto">
      <h1>Garden</h1>
      <div className="garden grid gap-4 grid-cols-3 grid-rows-3 w-1/2">
        { plots.map(plant => <Plot plant={plant} />) }        
      </div>
    </div>
  );
}

function Plot(props: {plant: Plant | null}){
  if(props.plant == null) {
      return (
        <div className="bg-yellow-800 bg-yellow-900"></div>
      )
  }
  return (
    <div className="bg-green-400 border-green-600">{simpleLabel(props.plant)}</div>
  )
}

function simpleLabel(plant: Plant): string {
  return plant.type
}

export default App;
