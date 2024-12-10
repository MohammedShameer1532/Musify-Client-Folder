// CurrentSongContext.js
import { createContext, useState } from 'react';

export const CurrentSongContext = createContext();

export const CurrentSongProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [songsList, setSongsList] = useState([]);
  const [loading, setLoading] = useState(true);


  return (
    <CurrentSongContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        currentIndex,
        setCurrentIndex,
        songsList,
        setSongsList,
        loading,
        setLoading
      }}
    >
      {children}
    </CurrentSongContext.Provider>
  );
};
