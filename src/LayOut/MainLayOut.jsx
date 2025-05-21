
import Header from './Header';
import { Outlet } from 'react-router';
import Footer from './Footer';

const MainLayOut = () => {

    return (
        <div className=''>
            <Header></Header>
  
  <div className='max-w-screen text-black dark:text-white dark:bg-gray-900 px-24 min-h-screen mx-auto'>
        {/* <div className="bg-white min-h-screen"></div> */}
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayOut;