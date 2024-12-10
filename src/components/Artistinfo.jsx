import { useState, useEffect, useContext } from "react";
import axios from "axios";
import '../App.css';
import { abbreviateNumber } from "js-abbreviation-number";
import { Link } from "react-router-dom";
import { CurrentSongContext } from "./contextProvider/CurrentSongContext";
import HashLoader from "react-spinners/HashLoader";

const Artistinfo = () => {
  const [artist, setArtist] = useState([]);
  const { loading, setLoading } = useContext(CurrentSongContext);

  const ids = [
    "456269",
    "455170",
    "670935",
    "505320",
    "457257",
    "465173",
    "455240",
    "455466",
    "457494",
    "456468",
    "455275",
    "455127",
    "457536",
    "455130",
    "457548",
    "701002",
    "689580",
    "455181",
    "672010",
    "773021",
    "455663",
    "5018862",
    "455457",
    "456091",
    "457146",
    "455454",
    "455221",
    "459320",
    "557323",
    "456164",
  ]


  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const artistData = await Promise.all(
          ids?.map(id => axios.get(`https://saavn.dev/api/artists?id=${id}`)
            .then(response => response.data))
        ) || [];
        setArtist(artistData);
      } catch (error) {
        console.error("Error fetching artist data:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };
    fetchArtists();
  }, []);

  return (
    <div className="p-4 mt-[-0.5rem] mb-[4rem] ml-0">
      <h2 className="text-base md:text-2xl font-bold text-gray-300 mb-4 ml-4">Recommended Artist</h2>
      {loading ? (
        <div className="flex justify-center items-center h-[100%]">
          <HashLoader color="#36d7b7" size={60} />
        </div>
      ) : (
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 flex-nowrap pl-4 mb-4">
            {
              artist.map((detail, id) => {
                return (
                  <div key={id} className="min-w-[12rem] md:min-w-[15rem] border  border-gray-400 p-4 rounded-lg mb-1">
                    <div>
                      <Link to="/onboardArtist"
                        state={{ detail }}>
                        <img
                          src={detail?.data?.image[2].url}
                          alt={detail?.data?.name}
                          className="w-[50%] h-30 md:w-full  md:h-48 min-w-[25vh]  overflow-hidden rounded-md" />
                      </Link>
                    </div>
                    <div className="font-medium text-gray-300 mt-4 whitespace-nowrap text-xs md:text-base">Name : {detail?.data?.name}</div>
                    <div className="font-medium text-gray-300 mt-2 text-xs md:text-base">Followers : {`${abbreviateNumber(detail?.data?.followerCount, 1)}`}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default Artistinfo;
