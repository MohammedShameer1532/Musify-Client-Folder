import "../App.css";
import { GoHome } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { BiLogIn } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import profile from '../assets/profile-image.jpg';
import axios from "axios";
import { Modal } from 'antd';


const Navbar = () => {
  const navigate = useNavigate();
  const [searchInfo, setSearchInfo] = useState("");
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const data = userData?.token
  console.log("userdata", data);
  const urlParams = new URLSearchParams(window.location.search);
  const tokens = urlParams?.get('token');
  console.log("tokennnnnnn", tokens);


  const userInfo = async () => {
    try {
      const token = tokens || data;
      const resData = await axios.get(`https://musify-server-phi.vercel.app/login/success`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      });
      setCurrentUserInfo(resData?.data?.user)
    } catch (error) {
      console.error('unable to get the currentUser details', error);
    }
  }

  const logout = async () => {
    const log = await axios.get(`https://musify-server-phi.vercel.app/logout`, {
      withCredentials: true
    });
    console.log(log);
    localStorage.removeItem('userData');
    if (log.status === 200) {
      navigate('/')
    } else {
      console.error("Failed to log out:", await log.json());
    }
  }
  useEffect(() => {
    userInfo();
  }, [])


  const handleSearch = (event) => {
    if (
      (event?.key === "Enter" || event === "searchButton") &&
      searchInfo?.length > 0
    ) {
      navigate(`/search/${searchInfo}`);
      setSearchInfo("");
    }
  };


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="fixed flex top-0 left-0 z-50  w-[100%] ">
      <div className="flex items-center justify-between p-2 mt-0 bg-black  w-[100%]">
        <div className="flex items-center gap-3 ml-2 mt-[-3rem] md:mt-0">
          <button className="flex items-center gap-2">
            <img src={profile} alt="" className='w-8 h-8 md:w-12 md:h-12 border-2 border-gray-500  bg-black rounded-full' />
            <span className="text-gray-500 font-bold text-base md:text-2xl">Musify</span>
          </button>
        </div>
        <div className="flex items-center  w-[100%] md:w-[40%] gap-4 ml-[-9.5rem] md:ml-[1rem] lg:ml-[2rem] mt-[2.5rem] md:mt-0">
          <span className="flex items-center justify-center w-10 h-8 md:w-12 md:h-12 rounded-full bg-gray-800 text-gray-400 font-medium">
            <Link to='/home'>
              <GoHome className='w-6 h-5 md:w-8 md:h-8' />
            </Link>
          </span>
          <div className="flex w-[20rem] md:w-[100%]  rounded-full items-center gap-2 bg-gray-800 ">
            <div className="flex w-[100%] items-center">
              <div className="flex items-center w-[100%] h-[2.5rem] md:h-full px-4 py-2 border border-gray-400 rounded-full ">
                <button className="flex items-center text-gray-300" onClick={() => handleSearch("searchButton")}>
                  <IoIosSearch className="text-base md:text-2xl lg:text-3xl" />
                </button>
                <input
                  type="text"
                  onChange={(e) => setSearchInfo(e.target.value)}
                  onKeyUp={handleSearch}
                  value={searchInfo}
                  placeholder="What you want to play?"
                  className=" outline-none flex w-[100%] text-xs md:text-sm lg:text-lg placeholder-gray-400 placeholder:font-medium ml-1 bg-gray-800 text-white px-2 py-1 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center  bg-gray-800 p-2 pr-4 md:p-2 rounded-lg cursor-pointer mt-[-3rem] md:mt-0 ml-[-15rem] md:ml-0 " onClick={logout}>
          <BiLogIn className='w-6 h-5 md:w-8 md:h-6 text-gray-400 ' />
          <button className=" text-white font-medium text-sm md:text-base lg:text-lg" >logout</button>
        </div>
        {currentUserInfo ? (
          <div className="mt-[-3rem] md:mt-0">
            <button onClick={showModal} className="flex items-center gap-2">
              {currentUserInfo?.image ? (
                <img
                  src={currentUserInfo.image}
                  alt="User Profile"
                  className="w-8 h-8 md:w-12 md:h-12 border-2 border-gray-500 bg-black rounded-full"
                />
              ) : (
                <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center border-2 border-gray-500 bg-black text-white rounded-full font-bold">
                  {currentUserInfo?.name?.charAt(0).toUpperCase() || "?"}
                </div>
              )}
            </button>
            <Modal className="mr-0 top-16 font-bold text-2xl" open={isModalOpen} footer={null} onCancel={handleCancel}>
              <h1 className="text-base md:text-2xl">Profile Info</h1>
              <p className="text-base md:text-2xl">Name: {currentUserInfo?.displayName || currentUserInfo?.name}</p>
              <p className="text-base md:text-2xl">Email: {currentUserInfo?.email || "N/A"}</p>
            </Modal>
          </div>
        ) : (
          <div className="text-gray-500">No user info available</div>
        )
        }
      </div>
    </div>
  )
}

export default Navbar;
