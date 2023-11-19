import { Link } from 'react-router-dom';
import backArrow from '../../assets/icons/Arrow - Down 2.png';
export default function BackArrow() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginInline: '1rem',
        marginBlock: '2rem',
      }}>
      <Link
        to="#"
        onClick={() => window.history.back()}>
        <img src={backArrow} alt="back-arrow" />
      </Link>
    </div>
  );
}
