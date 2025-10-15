import './App.css';
import { Outlet } from 'react-router';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      {/* <Header logo={LogoLight} /> */}
      <Outlet />
      {/* <Footer logo={LogoDark} /> */}
    </div>
  );
}

export default App;