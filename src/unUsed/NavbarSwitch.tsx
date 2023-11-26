import { useEffect, useState } from 'react';
import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile';

export default function NavbarSwitch() {
    // const [isMobile, setIsMobile] = useState(false);
  
    // useEffect(() => {
  
    //   const handleResize = () => {
    //     setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    //   };
  

    //   window.addEventListener('resize', handleResize);
    //     handleResize(); // Set initial mobile state
  
    //   return () => {
    //     window.removeEventListener('resize', handleResize);
    //   };
    // }, []);

  return (<>
    {isMobile 
    ? 
    <NavbarMobile /> 
    :     
    <NavbarDesktop />}
    </>
  )
}
