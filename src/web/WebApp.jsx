// import Template from "./components/Template"
import HomepageTemplate from "./templates/HomepageTemplate"
import ProfileTemplate from "./templates/ProfileTemplate"
export default function WebApp ({template}){
    if( template === 'homepage') return <HomepageTemplate/>
    else if( template === 'profile') return <ProfileTemplate/>
}