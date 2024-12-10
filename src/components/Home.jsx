import Navbar from '../components/Navbar';
import Artistinfo from './Artistinfo';
import Footer from './Footer';
import RecAlbum from './RecAlbum';
import Recommendations from './Recommendations';

const Home = () => {
  return (
    <div className="flex flex-grow h-screen"
      style={{
        background: "linear-gradient(to right, #232526, #414345)"
      }}
    >
      <Navbar />
      <div className="flex overflow-hidden w-[100%] h-[100%]">
        <div className="w-full p-4  overflow-y-auto  ml-0" >
          <RecAlbum />
          <Recommendations />
          <Artistinfo />
          <Footer />
          <div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
