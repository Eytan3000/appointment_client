import BottomAppBar from '../BottomAppBar';
import commingSoon from '../../../assets/Images/comingSoon.jpg';
import { useAuth } from '../../../context/AuthContext';
import SideAppColumn from '../SideAppColumn';

export default function Inbox() {
  const { isMobile } = useAuth();

  return (
    <>
      {!isMobile && <SideAppColumn />}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '90vh',
          alignItems: 'center',
        }}>
        <img src={commingSoon} alt="coming soon" style={{ height: '50vh' }} />
      </div>
      {isMobile && <BottomAppBar />}
    </>
  );
}
