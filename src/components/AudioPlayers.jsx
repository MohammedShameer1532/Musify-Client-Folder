import { useContext } from 'react';
import { CurrentSongContext } from './contextProvider/CurrentSongContext';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { styled } from '@mui/material/styles';

const AudioPlayers = () => {
  const { 
    currentSong, 
    setCurrentSong, 
    currentIndex, 
    setCurrentIndex, 
    songsList 
  } = useContext(CurrentSongContext);
  

  const handleClickNext = () => {
    if (songsList.length > 0 && currentIndex < songsList.length) {
      const nextSong = songsList[currentIndex + 1];
      const artists = nextSong?.artists?.primary[0]?.name;
  
      setCurrentSong({
        name: nextSong.name,
        artist: artists,
        url: nextSong?.downloadUrl[4]?.url,
        image: nextSong?.image[2]?.url,
      });
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  const handleClickPrevious = () => {
    if (songsList.length > 0 && currentIndex > 0) {
      const prevSong = songsList[currentIndex - 1];
      const artists = prevSong?.artists?.primary[0]?.name;
  
      setCurrentSong({
        name: prevSong.name,
        artist: artists,
        url: prevSong?.downloadUrl[4]?.url,
        image: prevSong?.image[2]?.url,
      });
      setCurrentIndex(currentIndex - 1);
    }
  };
  const handleSongEnd = () => {
    handleClickNext(); 
    handleClickPrevious();// Automatically play next song when current song ends
  };

  const CoverImage = styled('div')({
    width: 100,
    height: 100,
    objectFit: 'cover',
    overflow: 'hidden',
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.08)',
    '& > img': {
      width: '100%',
    },
  });

  return (
    <div className="flex fixed bottom-0 w-[100%] left-0 bg-gray-800 p-4 z-50 cursor-pointer">
      {currentSong ? (
        <div className="flex flex-col md:flex-row gap-4 items-center w-[100%]">
           <CoverImage className='ml-[-12rem] md:ml-0'>
              <img
                alt={currentSong.name}
                src={currentSong.image}
              />
            </CoverImage>
          <div className='mt-[-5rem]  ml-[6rem] mb-[2rem] md:mt-10 md:ml-0'>
            <div className="text-white font-bold text-xs md:text-sm lg:text-base text-center md:text-start ">{currentSong.name}</div>
            <div className="text-gray-400 text-xs md:text-sm lg:text-base text-center md:text-start">{currentSong.artist}</div>
          </div>
          <div className="w-[100%] md:w-[80%]">
            <AudioPlayer
              style={{ borderRadius: '5px', width: '100%' }}
              src={currentSong.url}
              autoPlay
              showSkipControls={true}
              showJumpControls={false}
              onClickNext={handleClickNext}
              onClickPrevious={handleClickPrevious}
              onEnded={handleSongEnd}
            />
          </div>
        </div>
      ) : (
        <div className="text-white text-xs md:text-base">No song currently playing</div>
      )}
    </div>
  );
};

export default AudioPlayers;
