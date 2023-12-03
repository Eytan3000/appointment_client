import { Outlet } from 'react-router-dom'
import BottomAppBar from '../BottomAppBar'

export default function SettingsLayout() {
  return (
    <>
    <Outlet />
    <BottomAppBar />
    </>
  )
}
