import { CurrentSongProvider } from './components/contextProvider/CurrentSongContext';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const RoutesComponent = () => {
  return (
    <CurrentSongProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CurrentSongProvider>
  )
}

export default RoutesComponent;