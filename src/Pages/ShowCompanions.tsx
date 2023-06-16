import {useParams} from 'react-router-dom';
import findCompanions from '../utils/findCompanions';
import CompanionCard from '../components/CompanionCard';
import "../styles/companionCardStyle.css"
import travelDetails_interface from '../types/travelDetailsInterface';
import {useState} from 'react';
import InfoCard from '../components/InfoCard';

const ShowCompanions = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<travelDetails_interface[] | boolean>([]);
    const {destination, date} = useParams();
        
    if(destination && date && loading){ findCompanions(destination, date).then(
        (val)=>{setData(val);   setLoading(false);});}

    return (
        <>
            {/* <h1>Companions</h1> */}
            {loading && <InfoCard content='Loading...'/>}

            {!loading && data===false && <InfoCard content='Unable to connect to the server :_('/>}

            {!loading && typeof(data)!=='boolean' && data.length === 0 && <InfoCard content='Sorry, no companions found as of now'/>}

            <div className="companion-list">
            {typeof(data)!=='boolean' && data.length > 0 && (
                <>
                <InfoCard content='You can go with anyone of them...'/>
                {data.map((item) => (
                    <div className="companion-card" key={item._id}>
                        <CompanionCard avatar={item.avatar} name={item.name} time={item.time} ph={item.ph_no} wa={item.wa_no} email={item.email}/>
                    </div>
                    // <CompanionCard avatar=item.avatar name=item.name time=item.time ph=item.ph wa=item.wa email=item.email/>
                ))}
                </>
            )}
            </div>
            

            
                {/* <CompanionCard avatar="https://lh3.googleusercontent.com/a/AAcHTtcEHfXcrWUtyCsZpbHOxZWeG5SOtvKcT8F5h3-TtSo=s96-c" name="John Doe" time="10:00" ph="1234567890" wa="1234567890" email="shlok845@gmail.com"/>
                <CompanionCard avatar="https://lh3.googleusercontent.com/a/AAcHTtcEHfXcrWUtyCsZpbHOxZWeG5SOtvKcT8F5h3-TtSo=s96-c" name="John Doe" time="10:00" ph="1234567890" wa="1234567890" email="shlok845@gmail.com"/>
            </div> */}
        </>
    );
}

export default ShowCompanions;