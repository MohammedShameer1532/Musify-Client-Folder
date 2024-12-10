import { useContext, useState } from "react";
import { FaDownload } from "react-icons/fa6";
import { GoPlay } from "react-icons/go";
import { MdAccessTime } from "react-icons/md";
import { CurrentSongContext } from "./contextProvider/CurrentSongContext";
import { useLocation } from "react-router-dom";

const Artist = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const [gradientColor, setGradientColor] = useState('');
  const { setCurrentSong, setCurrentIndex, setSongsList, currentSong } = useContext(CurrentSongContext);


  const handlePlay = (song, index) => {
    const artists = song?.artists?.primary[0]?.name;

    setCurrentSong({
      name: song.name,
      artist: artists,
      url: song?.downloadUrl[4]?.url,
      image: song?.image[2]?.url,
    });
    setCurrentIndex(index);
    setSongsList(data.topSongs);
  };


  const handleDownload = async (url, fileName) => {
    try {
      const response = await fetch(url, { method: 'GET' });
      const blob = await response.blob();

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName || 'file.mp3'; // Default file name
      link.click();

      // Cleanup
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  // Function to get average color from image
  const getAverageColor = (imgElement) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = imgElement.width;
    canvas.height = imgElement.height;
    context.drawImage(imgElement, 0, 0);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let r = 0, g = 0, b = 0;

    for (let i = 0; i < imageData.length; i += 4) {
      r += imageData[i];
      g += imageData[i + 1];
      b += imageData[i + 2];
    }

    const pixels = imageData.length / 4;
    return {
      r: Math.floor(r / pixels),
      g: Math.floor(g / pixels),
      b: Math.floor(b / pixels)
    };
  };

  const handleImageLoad = (e) => {
    try {
      const color = getAverageColor(e.target);
      const gradient = `linear-gradient(to bottom, rgba(${color.r},${color.g},${color.b},0.8), rgba(0,0,0,1))`;
      setGradientColor(gradient);
    } catch {
      setGradientColor('linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,1))'); // Default fallback
    }
  };

  const imageUrl = data?.image && data.image[2]?.url ? data.image[2].url : null;

  return (
    <div className='p-4  overflow-hidden'
      style={{
        background: "linear-gradient(to right, #232526, #414345)"
      }}>
      {
        currentSong ? (<div className='rounded-lg w-[100%] h-[100%]  mt-[5rem] md:mt-[3rem] mb-[15rem] md:mb-[10rem] '
          style={{
            background: gradientColor,
            transition: 'background 0.5s ease'
          }} >
          <div className="flex  items-center ">
            <div className="flex flex-col md:flex-row items-center  text-white">
              <div className="w-[50%] p-4 rounded-lg ml-[-9rem] md:ml-0">
                <img
                  src={imageUrl}
                  alt={data?.name}
                  className="w-[10%] min-w-[40vh]   object-cover rounded-md"
                  onLoad={handleImageLoad}
                  crossOrigin="anonymous"
                />
              </div>
              <div className='flex flex-col ml-0 mt-0'>
                <div className="font-medium text-xl md:text-5xl  text-white p-2">{data?.name}</div>
              </div>
            </div>
          </div>
          <div>
            {data ? (
              <div className="text-white ml-0 p-4">
                <table className="min-w-full text-left  text-gray-400 mb-4">
                  <thead className="bg-gray-800 text-white text-xs md:text-sm  font-semibold uppercase">
                    <tr>
                      <th className="px-4 py-3 hidden sm:table-cell">#</th>
                      <th className="px-4 py-3">Title</th>
                      <th className="px-4 py-3 hidden md:table-cell">Album</th>
                      <th className="px-4 py-3 text-center text-xl  hidden sm:table-cell"><MdAccessTime /></th>
                      <th className="px-4 py-3 text-center ">Play</th>
                      <th className="px-4 py-3 text-center ">Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.topSongs.map((song, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-700 transition-colors cursor-pointer"
                      >
                        <td className="px-4 py-3 hidden sm:table-cell">{index + 1}</td>
                        <td className="px-4 py-3 flex items-center gap-2">
                          <img src={song?.image[2]?.url} alt=""
                            className="w-8 h-8 md:w-10 md:h-10  object-cover rounded-md hidden sm:table-cell" />
                          <span className='text-xs md:text-base'>{song.name}</span>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell ">{song?.album?.name || 'Unknown'}</td>
                        <td className="px-4 py-3 text-left hidden sm:table-cell">
                          {song.duration ? `${Math.floor(song.duration / 60)}:${song.duration % 60}` : '--:--'}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <GoPlay
                            onClick={() => handlePlay(song, index)}
                            className="text-xl text-white inline-block" />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <FaDownload
                            onClick={() => handleDownload(song?.downloadUrl[4]?.url, song?.name)}
                            className="text-lg text-white inline-block" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-white ml-[10rem]">No songs available</div>
            )}
          </div>
        </div>) : (
          <div className='rounded-lg w-[100%] h-[100%]  mt-[5rem] md:mt-[3rem] mb-[3rem] md:mb-[5rem] '
            style={{
              background: gradientColor,
              transition: 'background 0.5s ease'
            }} >
            <div className="flex  items-center ">
              <div className="flex flex-col md:flex-row items-center  text-white">
                <div className="w-[50%] p-4 rounded-lg ml-[-9rem] md:ml-0">
                  <img
                    src={imageUrl}
                    alt={data?.name}
                    className="w-[10%] min-w-[40vh]   object-cover rounded-md"
                    onLoad={handleImageLoad}
                    crossOrigin="anonymous"
                  />
                </div>
                <div className='flex flex-col ml-0 mt-0'>
                  <div className="font-medium text-xl md:text-5xl  text-white p-2">{data?.name}</div>
                </div>
              </div>
            </div>
            <div>
              {data ? (
                <div className="text-white ml-0 p-4">
                  <table className="min-w-full text-left  text-gray-400 mb-4">
                    <thead className="bg-gray-800 text-white text-xs md:text-sm  font-semibold uppercase">
                      <tr>
                        <th className="px-4 py-3 hidden sm:table-cell">#</th>
                        <th className="px-4 py-3">Title</th>
                        <th className="px-4 py-3 hidden md:table-cell">Album</th>
                        <th className="px-4 py-3 text-center text-xl  hidden sm:table-cell"><MdAccessTime /></th>
                        <th className="px-4 py-3 text-center ">Play</th>
                        <th className="px-4 py-3 text-center ">Download</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.topSongs.map((song, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-700 transition-colors cursor-pointer"
                        >
                          <td className="px-4 py-3 hidden sm:table-cell">{index + 1}</td>
                          <td className="px-4 py-3 flex items-center gap-2">
                            <img src={song?.image[2]?.url} alt=""
                              className="w-8 h-8 md:w-10 md:h-10  object-cover rounded-md hidden sm:table-cell" />
                            <span className='text-xs md:text-base'>{song.name}</span>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell ">{song?.album?.name || 'Unknown'}</td>
                          <td className="px-4 py-3 text-left hidden sm:table-cell">
                            {song.duration ? `${Math.floor(song.duration / 60)}:${song.duration % 60}` : '--:--'}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <GoPlay
                              onClick={() => handlePlay(song, index)}
                              className="text-xl text-white inline-block" />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <FaDownload
                              onClick={() => handleDownload(song?.downloadUrl[4]?.url, song?.name)}
                              className="text-lg text-white inline-block" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-white ml-[10rem]">No songs available</div>
              )}
            </div>
          </div>)}
    </div>
  )
}

export default Artist;