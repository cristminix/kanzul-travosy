import { useEffect, useState } from "react"

const ContactAddress = ({ company }) => {
  const cls21 = "cls-21 container lg:mt-24 mt-16"
  const cls22 = "cls-22 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6"
  const cls23 = "cls-23 text-center px-6"
  const cls24 = "cls-24 relative text-transparent"
  const cls25 =
    "cls-25 size-20 bg-red-500/5 text-red-500 rounded-xl text-2xl flex align-middle justify-center items-center mx-auto shadow-sm dark:shadow-gray-800"
  const cls26 = "cls-26 content mt-7"
  const cls27 = "cls-27 h5 text-lg font-semibold"
  const cls28 = "cls-28 text-slate-400 mt-3"
  const cls29 = "cls-29 mt-5"
  const cls30 = "cls-30 text-red-500 font-medium"
  const cls31 = "cls-31 video-play-icon read-more lightbox text-red-500 font-medium"
  return (
    <div className={cls21}>
      <div className={cls22}>
        <div className={cls23}>
          <div className={cls24}>
            <div className={cls25}>
              <i data-feather="phone"> </i>
            </div>
          </div>

          <div className={cls26}>
            <h5 className={cls27}> Telepon/WA </h5>
            <p className={cls28}> Anda dapat menghubungi kami melalui Nomor telepon dan Watsapp </p>

            <div className={cls29}>
              <a href={`tel:${company.phone}`} className={cls30}>
                {company.phone}
              </a>
            </div>
          </div>
        </div>

        <div className={cls23}>
          <div className={cls24}>
            <div className={cls25}>
              <i data-feather="mail"> </i>
            </div>
          </div>

          <div className={cls26}>
            <h5 className={cls27}> Email </h5>
            <p className={cls28}> Anda dapat menghubungi kami melalui surat elektronik atau email </p>

            <div className={cls29}>
              <a href={`mailto:${company.email}`} className={cls30}>
                {company.email}
              </a>
            </div>
          </div>
        </div>

        <div className={cls23}>
          <div className={cls24}>
            <div className={cls25}>
              <i data-feather="map-pin"> </i>
            </div>
          </div>

          <div className={cls26}>
            <h5 className={cls27}> Alamat </h5>
            <p className={cls28}>
              {company.address}
            </p>

            <div className={cls29}>
              <a href={company.googleMapEmbedUrl} data-type="iframe" className={cls31}>
                Lihat Peta
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactAddress
