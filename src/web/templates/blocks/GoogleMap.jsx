import { useEffect, useState } from "react"

const GoogleMap = ({ embedUrl }) => {
  const styles = { stl0: { border: "0" } }

  const cls0 = "container-fluid relative lg:twx-pt-[120px] twx-bg-slate-950"
  const cls1 = " grid grid-cols-1"
  const cls2 = " w-full leading-[0] border-0"
  const cls3 = " w-full h-[500px]"

  return (
    <div className={cls0}>
      <div className={cls1}>
        <div className={cls2}>
          <iframe src={embedUrl} allowfullscreen="" className={cls3} style={styles.stl0}></iframe>
        </div>
      </div>
    </div>
  )
}

export default GoogleMap
