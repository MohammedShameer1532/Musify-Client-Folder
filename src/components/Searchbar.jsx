import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { CurrentSongContext } from './contextProvider/CurrentSongContext';
import HashLoader from "react-spinners/HashLoader";
import Notification from './Notification';
import CustomNoResultsOverlay from './CustomNoResultsOverlay';
import { Modal } from 'antd';


const Searchbar = () => {
  const { loading, setLoading } = useContext(CurrentSongContext);
  const { searchQuery } = useParams();
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();
 
 

  useEffect(() => {
    if (searchQuery) searchContent();
  }, [searchQuery])



  const searchContent = async () => {
    setLoading(true);
    setNoResults(false);
    try {
      const response = await axios.get(`https://saavn.dev/api/search?query=${encodeURIComponent(searchQuery)}`);
      const res = response.data.data;
      const searchResult = res?.topQuery?.results;

      if (searchResult?.length > 0) {
        const id = searchResult[0]?.id;
        const resultType = searchResult[0]?.type;
        setType(resultType)
        matchIds(id, resultType);
      }
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }


  const matchIds = async (id, type) => {
    try {
      let responseData;
      if (type === 'album') {
        const apiUrl1 = await axios.get(`https://saavn.dev/api/albums?id=${id}`);
        responseData = apiUrl1.data;
      } else if (type === 'song') {
        const apiUrl2 = await axios.get(`https://saavn.dev/api/songs?ids=${id}`);
        responseData = apiUrl2.data;
      } else if (type === 'artist') {
        const apiUrl3 = await axios.get(`https://saavn.dev/api/artists?id=${id}`);
        responseData = apiUrl3.data;
      } else {
        // If no results found
        setNotificationMessage("No results found for your search.");
        setNotificationOpen(true);
        setNoResults(true); // Set no results state
      }
      const res = responseData.data;
      console.log(res);

      setData(res);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  }

  useEffect(() => {
    if (type && data && Object.keys(data).length > 0) {
      if (type === "album") {
        navigate("/album", { state: { data } });
      } else if (type === "song") {
        navigate("/song", { state: { data } });
      } else if (type === "artist") {
        navigate("/artist", { state: { data } });
      }
    }
  }, [type, data, navigate]);


  return (
    <div className='w-[100%] h-screen overflow-hidden'>
      <div
        className="p-4  w-[100%] h-[100%] "
        style={{
          background: "linear-gradient(to right, #232526, #414345)",
        }}
      >
        <h2 className="text-2xl font-bold text-white ml-12">Search Result</h2>
        {loading ? (
          <div className="flex justify-center items-center h-[100%] mt-[-20%] md:mt-0 ">
            <HashLoader color="#36d7b7" size={60} />
          </div>
        ) : noResults ? (
          <span className='flex justify-center items-center h-[100%] '>
            <CustomNoResultsOverlay />
          </span>
        )
          : (
            <div className="p-4  w-[100%] h-[100%]  ">
            </div>
          )}
      </div>
      <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 z-50">
        <Modal
          className="bg-white p-6 rounded-lg font-bold text-2xl shadow-lg  top-[40%]"
          open={notificationOpen}
          footer={null}
          onCancel={() => setNotificationOpen(false)}
        >
          <p className="text-sm md:text-xl">{notificationMessage}</p>
        </Modal>
      </div>
    </div>
  )
}

export default Searchbar;