import Home from './components/Home';
import { Route, Routes, useLocation } from 'react-router-dom';
import Searchbar from './components/Searchbar';
import AudioPlayers from './components/AudioPlayers';
import Navbar from './components/Navbar'
import OnboardRecommend from './components/OnboardRecommend';
import OnboardArtist from './components/OnboardArtist';
import OnboardAlbum from './components/OnboardAlbum';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoutes from './components/contextProvider/ProtectedRoutes';
import Artist from './components/Artist';
import Song from './components/Song';
import Album from './components/Album';
const App = () => {

  const location = useLocation();

  // Determine if the current route requires authentication
  const isAuthRequired = location.pathname !== '/' && location.pathname !== '/signup';

  return (
    <div>
      {isAuthRequired && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/search/:searchQuery" element={<Searchbar />} />
          <Route path="/onboardRecommend" element={<OnboardRecommend />} />
          <Route path="/onboardArtist" element={<OnboardArtist />} />
          <Route path="/onboardAlbum" element={<OnboardAlbum />} />
          <Route path="/artist" element={<Artist/>}/>
          <Route path="/song" element={<Song/>}/>
          <Route path="/album" element={<Album/>}/>
        </Route>
      </Routes>
      {isAuthRequired && <AudioPlayers />}
    </div>
  )
}

export default App;
