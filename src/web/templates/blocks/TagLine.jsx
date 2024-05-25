import HeaderSocialLinkList from "../blocks/HeaderSocialLinkList"

export default function TagLine ({companyData,socialNetworkLinks}){
    return <>
    {/* <!-- TAGLINE START--> */}
    <div className="tagline bg-slate-900">
        <div className="container relative">
            <div className="grid grid-cols-1">
                <div className="flex items-center justify-between">
                    <ul className="list-none">
                        <li className="inline-flex items-center">
                            <i data-feather="award" className="text-red-500 size-4"></i>
                            <span className="ms-2 text-slate-300">Pondok Pesantren Kanzululum</span>
                        </li>
                        <li className="inline-flex items-center ms-2">
                            <i data-feather="map-pin" className="text-red-500 size-4"></i>
                            <span className="ms-2 text-slate-300">Kesambi, Cirebon</span>
                        </li>
                    </ul>

                    <ul className="list-none">
                        <li className="inline-flex items-center">
                            <i data-feather="mail" className="text-red-500 size-4"></i>
                            <a href={`mailto:${companyData.email}`}
                                className="ms-2 text-slate-300 hover:text-slate-200">{companyData.email}</a>
                        </li>
                        <li className="inline-flex items-center ms-2">
                            <HeaderSocialLinkList socialNetworkLinks={socialNetworkLinks}/>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        {/* <!--end container--> */}
    </div>
    {/* <!--end tagline--> */}
    {/* <!-- TAGLINE END--> */}
    </>
}