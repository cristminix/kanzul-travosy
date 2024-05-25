import { siTiktok } from "simple-icons"
     
const FooterSocialLinkList = ({ socialNetworkLinks }) => {
    const { fb, twitter, tiktok, ig, youtube } = socialNetworkLinks
    const cls9 = "cls-9 list-none mt-6"
    const cls10 = "cls-10 inline"
    const cls11 = "cls-11 size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-800 dark:border-slate-800 rounded-md hover:bg-red-500 hover:text-white text-slate-300"
    const cls12 = "cls-12 size-4 align-middle"
    return <ul className={cls9}>
        {fb && (<li className={cls10}> <a href={`${fb}`} target="_blank" className={cls11}> <i data-feather="facebook" title="facebook" className={cls12}> </i> </a> </li>)}
      
        {twitter && (<li className={cls10}> <a href={`https://twitter.com/${twitter}`} target="_blank" className={cls11}> <i data-feather="twitter" title="twitter" className={cls12}> </i> </a>

        </li>)}
        {tiktok && (
            <li className={cls10}> <a href={`https://www.tiktok.com/${tiktok}`} target="_blank" className={cls11}> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=" cls-12 size-4 align-middle" title="TikTok"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path></svg></a> </li>
        )}
        {ig && (
            <li className={cls10}> <a href={`https://www.instagram.com/${ig}`} target="_blank" className={cls11}> <i data-feather="instagram" title="instagram" className={cls12}> </i> </a> </li>
        )}
        {youtube && (
            <li className={cls10}> <a href={`https://www.youtube.com/${youtube}`} target="_blank" className={cls11}> <i data-feather="youtube" title="youtube" className={cls12}> </i> </a> </li>
        )}
    </ul>
}

export default FooterSocialLinkList