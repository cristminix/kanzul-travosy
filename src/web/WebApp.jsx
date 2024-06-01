// import Template from "./components/Template"
import HomepageTemplate from "./templates/HomepageTemplate"
import ProfileTemplate from "./templates/ProfileTemplate"
import LembagaTemplate from "./templates/LembagaTemplate"


export default function WebApp ({template}){
    if( template === 'homepage') return <HomepageTemplate/>
    else if( template === 'profile') return <ProfileTemplate/>
    else if( template === 'lembaga') return <LembagaTemplate/>
}