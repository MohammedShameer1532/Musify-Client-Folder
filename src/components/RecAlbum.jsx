import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../App.css"
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { CurrentSongContext } from "./contextProvider/CurrentSongContext";


const RecAlbum = () => {
  const [album, setAlbum] = useState([]);
  const { loading, setLoading } = useContext(CurrentSongContext);
  const ids = [
    "59686460",
    "57520134",
    "58811310",
    "1658348",
    "3194931",
    "14717593",
    "1225051",
    "1132302",
    "14807386",
    "1264402",
    "12353722",
    "1146055",
    "10455395",
    "13502753",
    "1106479",
    "14597019",
    "13460649",
    "1017243",
    "2704068",
    "1152107",
    "48840159",
    "58166459",
    "57687828",
    "16926067",
    "1232739",
    "47094777",
    "12445732",
    "18963801",
    "11592233",
    "39719827",
    "1463183",

  ]


  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const albumData = await Promise.all(
          ids.map(id => axios.get(`https://saavn.dev/api/albums?id=${id}`)
            .then(response => response.data))
        );
        setAlbum(albumData);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };
    fetchAlbum();
  }, []);


  return (
    <div className="p-4 mt-[5rem] mb-[4rem] ml-0">
      <h2 className="text-base md:text-2xl font-bold text-gray-300 mb-4 ml-4">Recommended Album</h2>
      {loading ? (
        <div className="flex justify-center items-center h-[100%]">
          <HashLoader color="#36d7b7" size={60} />
        </div>
      ) : (
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 flex-nowrap pl-4 mb-4">
            {
              album.map((detail, id) => {
                return (
                  <div key={id} className="min-w-[12rem] md:min-w-[15rem] border  border-gray-400 p-4 rounded-lg mb-1">
                    <div>
                      <Link to="/onboardAlbum"
                        state={{ detail }}>
                        <img
                          src={detail?.data?.image[2].url}
                          alt={detail?.data?.name}
                          className="w-[50%] h-30 md:w-full  md:h-48 min-w-[25vh]  overflow-hidden rounded-md" />
                      </Link>
                    </div>
                    <div className="font-medium text-gray-300 mt-4 text-xs md:text-base">Name : {detail?.data?.name}</div>
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

export default RecAlbum;
