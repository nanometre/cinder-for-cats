import React, { useMemo, useRef, useState } from 'react'
import { data } from './data/Data';

import TinderCard from 'react-tinder-card'
import Navbar from './components/Navbar';
import Switch from './components/Switch';

function App() {
  const cats = data
  // index used is in reverse order, index of first item is the length of array - 1
  const [currentIndex, setCurrentIndex] = useState(cats.length - 1)
  const [lastDirection, setLastDirection] = useState()
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () => Array(cats.length).fill(0).map((i) => React.createRef()), []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < cats.length - 1
  const canSwipe = currentIndex >= 0

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }
  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
  }
  const swipe = async (dir) => {
    if (canSwipe && currentIndex < cats.length) {
      await childRefs[currentIndex].current.swipe(dir)
    }
  }

  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <div className="App min-h-screen bg-white dark:bg-base-100">
      <Navbar />
      <div className="flex flex-col items-center m-16">
        <Switch />
        <div className='max-w-xs w-screen h-80'>
          {cats.map((cat, index) =>
            <TinderCard
              ref={childRefs[index]}
              className='absolute'
              key={cat.name}
              onSwipe={(dir) => swiped(dir, cat.name, index)}
              onCardLeftScreen={() => outOfFrame(cat.name, index)}>
              <div
                style={{ backgroundImage: 'url(' + cat.image + ')' }}
                className='relative max-w-xs w-screen h-80 bg-cover bg-center shadow-xl shadow-gray-400 dark:shadow-white rounded-2xl'>
                <h3 className="absolute bottom-1 m-3 text-white font-bold">{cat.name}</h3>
              </div>
            </TinderCard>
          )}
        </div>
        <div className='mt-14'>
          <button 
            className='p-2 border-solid border-2 border-gray-800 dark:border-white rounded text-sm text-gray-800 dark:text-white mx-2 font-bold'
            onClick={() => swipe('left')}>Swipe left!</button>
          <button 
            className='p-2 border-solid border-2 border-gray-800 dark:border-white  rounded text-sm text-gray-800 dark:text-white mx-2 font-bold'
            onClick={() => goBack()}>Undo swipe!</button>
          <button 
            className='p-2 border-solid border-2 border-gray-800 dark:border-white  rounded text-sm text-gray-800 dark:text-white mx-2 font-bold'
            onClick={() => swipe('right')}>Swipe right!</button>
        </div>
        <div>
          {lastDirection ? (
            <h2 key={lastDirection} className="m-5 flex text-center justify-center text-gray-800 dark:text-white font-bold">
              You swiped {lastDirection}
            </h2>
          ) : (
            <h2 className="m-5 flex text-center justify-center text-gray-800 dark:text-white font-bold">
              Swipe a card or press a button!
            </h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
