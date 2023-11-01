import { CircularProgress } from '@mui/joy'

export default function Loader() {
  return (
    <div style={{height:'100vh', display:'flex', justifyContent:'center', marginTop:'30vh'}}><CircularProgress size="lg" variant="plain" /></div>
  )
}
