// import Template from "./components/Template"
import HomepageTemplate from "./templates/HomepageTemplate"
export default function WebApp ({template}){
    if( template === 'homepage') return <HomepageTemplate/>
}