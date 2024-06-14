// import Template from "./components/Template"
import HomepageTemplate from "./templates/HomepageTemplate"
import ProfileTemplate from "./templates/ProfileTemplate"
import LembagaTemplate from "./templates/LembagaTemplate"
import KegiatanTemplate from "./templates/KegiatanTemplate"
import GaleryTemplate from "./templates/GaleryTemplate"
import BeritaDetailTemplate from "./templates/BeritaDetailTemplate"
import KontakTemplate from "./templates/KontakTemplate"
import PendaftaranTemplate from "./templates/PendaftaranTemplate"

import BeritaTemplate from "./templates/BeritaTemplate"
export default function WebApp ({template}){
    if( template === 'homepage') return <HomepageTemplate/>
    else if( template === 'profile') return <ProfileTemplate/>
    else if( template === 'lembaga') return <LembagaTemplate/>
    else if( template === 'kegiatan') return <KegiatanTemplate/>
    else if( template === 'pendaftaran') return <PendaftaranTemplate/>
    else if( template === 'galery') return <GaleryTemplate/>
    else if( template === 'berita') return <BeritaTemplate/>
    else if( template === 'berita-detail') return <BeritaDetailTemplate/>
    else if( template === 'kontak') return <KontakTemplate/>
}