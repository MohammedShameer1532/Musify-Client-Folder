import { useContext, useEffect, useState } from 'react';
import { CurrentSongContext } from './contextProvider/CurrentSongContext';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { styled } from '@mui/material/styles';
import { Button, Modal } from 'antd';
import axios from 'axios';

const AudioPlayers = () => {
  const {
    currentSong,
    setCurrentSong,
    currentIndex,
    setCurrentIndex,
    songsList
  } = useContext(CurrentSongContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lyrics, setLyrics] = useState(null);



  // Function to fetch lyrics
  const fetchLyrics = async (songId) => {
    try {
      const response = await axios.get(
        `https://jiosavan-api-with-playlist.vercel.app/api/songs/${songId}/lyrics`
      );
      // Clean lyrics by removing HTML tags if lyrics are available
      const cleanLyrics = response.data.data?.lyrics?.replace(/<\/?[^>]+(>|$)/g, "");

      if (cleanLyrics) {
        setLyrics({ lyrics: cleanLyrics });
      } else {
        setLyrics({ lyrics: "No lyrics found" });
      }
    } catch (error) {
      console.error("Error fetching lyrics:", error);
      setLyrics({ lyrics: "No lyrics found" });
    }
  };

  const handleClickNext = () => {
    if (songsList.length > 0 && currentIndex < songsList.length) {
      const nextSong = songsList[currentIndex + 1];
      const artists = nextSong?.artists?.primary[0]?.name;


      setCurrentSong({
        name: nextSong.name,
        artist: artists,
        url: nextSong?.downloadUrl[4]?.url,
        image: nextSong?.image[2]?.url,
        id: nextSong?.id,
      });

      setCurrentIndex(currentIndex + 1);
      fetchLyrics(nextSong?.id);
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
        id: prevSong?.id,
      });
      setCurrentIndex(currentIndex - 1);
      fetchLyrics(prevSong?.id);
    }
  };
  const handleSongEnd = () => {
    handleClickNext();
    handleClickPrevious();
  };

  useEffect(() => {
    if (currentSong?.id) {
      fetchLyrics(currentSong?.id);  // Fetch lyrics when the current song changes
    }
  }, [currentSong?.id]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
            <div className='text-center md:text-start'>
              <Button onClick={showModal} type='primary' className="text-white font-bold text-xs md:text-sm lg:text-base text-center md:text-start ">song lyrics</Button>
              </div>
              <span className='flex justify-center items-center fixed'>
                <Modal
                  className="bg-white p-2 rounded-lg font-bold text-2xl shadow-lg  top-[15%] md:top-[10%] "
                  open={isModalOpen} footer={null} onCancel={handleCancel}
                >
                  <h1 className='p-2 text-base md:text-lg lg:text-xl text-gray-800' >{currentSong?.name}</h1>
                  <hr />
                  <div
                    className="max-h-[300px] overflow-y-auto text-sm md:text-base p-2 mt-2 text-gray-700"
                  >
                    {lyrics?.lyrics || "No lyrics found"}
                  </div>
                </Modal>
              </span>
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
