import './App.css';
import { Outlet } from 'react-router';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <ScrollToTop />
      {/* <Header logo={LogoLight} /> */}
      <Outlet />
      {/* <Footer logo={LogoDark} /> */}
    </div>
  );
}

export default App;