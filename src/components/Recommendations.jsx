import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../App.css"
import { Link } from "react-router-dom";
import { CurrentSongContext } from "./contextProvider/CurrentSongContext";
import HashLoader from "react-spinners/HashLoader";



const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const { loading, setLoading } = useContext(CurrentSongContext);
  const ids = [
    "lEkM7bWX",
    "bwOEFL9e",
    "n-FFiSnx",
    "3Yar3BnQ",
    "d3rfMKEc",
    "GUURlhr1",
    "IxIEpU8N",
    "O94kBTtw",
    "rOJEfJMl",
    "F_fgk0mb",
    "azNT3vl1",
    "rtIe2EtQ",
    "6rxq9ayq",
    "-FuBerTQ",
    "BJdYur1d",
    "7g0pQPzx",
    "qveLzys-",
    "OsegBIuQ",
    "2WDzMpHM",
    "otoljY-7",
    "C9Y8Tw9H",
    "0NRwfaT4",
    "BX1K6XZU",
    "o3kcAFZh",
    "mPTrDSun",
    "OdwpBkc8",
    "5ST9zlcy",
    "HAOc17bN",
    "aRZbUYD7",
    "rjkrTnma",
    "asyeukc4",
    "g51Odreb",
    "eIqKpBKC",
    "m6DcVXHw",
    "OEUBeDen",
    "uEJrSiGh",
    "t3tw9H6X"
  ]
  const idsParam = ids.join(",");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`https://saavn.dev/api/songs?ids=${idsParam}`);
        const res = response.data.data;
        setRecommendations(res);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };
    fetchRecommendations();
  }, []);

  return (
    <div className="p-4 mt-[-4rem] ml-0  rounded-md">
      <h2 className="text-base md:text-2xl font-bold text-gray-300 mb-4 ml-4 ">Recommended Songs</h2>
      {loading ? (
        <div className="flex justify-center items-center h-[100%]">
          <HashLoader color="#36d7b7" size={60} />
        </div>
      ) : (
        <div className="overflow-x-auto scrollbar-hide ">
          <div className="flex gap-4 flex-nowrap pl-4 mb-4">
            {
              recommendations.length > 0 ? (
                recommendations.map((song, id) => {
                  return (
                    <div key={id} className="min-w-[12rem] md:min-w-[15rem]  border  border-gray-400 p-4 rounded-lg mb-1">
                      <Link to="/onboardRecommend"
                        state={{ song }}>
                        <img
                          src={song?.image[2]?.url}
                          alt={song?.album?.name}
                          className="w-[50%] h-30 md:w-full  md:h-48 min-w-[25vh]  rounded-md overflow-hidden"
                        />
                      </Link>
                    </div>
                  )
                })
              ) : (
                <div className='text-gray-500'>No songs found</div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
