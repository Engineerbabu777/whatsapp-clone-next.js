
import { Circle} from 'better-react-spinkit';

export default function Loading ({}) {
  return (
    <>
      <center>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh'}}>
          {/* <img
            src={
              'https://www.freepnglogos.com/uploads/whatsapp-logo-light-green-png-0.png'
            }
            alt="nothing"
            height={200}
            style={{ marginBottom: 10 }}
          /> */}
          <Circle color={"#3CBC28"} size={120}/>
        </div>
      </center>
    </>
  )
}
