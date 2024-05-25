const SideToSide = ({}) => {
  const styles = {}
  const cls0 = "cls-0 cls-1 container relative"
  const cls1 = "cls-1 cls-2 grid md:grid-cols-12 grid-cols-1 items-center gap-6 relative"
  const cls2 = "cls-2 cls-3 md:col-span-5"
  const cls3 = "cls-3 cls-4 relative"
  const cls4 = "cls-4 cls-5 mx-auto rounded-3xl shadow dark:shadow-gray-700 w-[90%]"
  const cls5 =
    "cls-5 cls-6 absolute flex items-center bottom-16 md:-start-10 -start-5 p-4 rounded-lg shadow-md dark:shadow-gray-800 bg-white dark:bg-slate-900 w-56 m-3"
  const cls6 =
    "cls-6 cls-7 flex items-center justify-center h-[65px] min-w-[65px] bg-red-500/5 text-red-500 text-center rounded-xl me-3"
  const cls7 = "cls-7 cls-8 size-6"
  const cls8 = "cls-8 cls-9 flex-1"
  const cls9 = "cls-9 cls-10 text-slate-400"
  const cls10 = "cls-10 cls-11 text-xl font-bold"
  const cls11 = "cls-11 cls-12 counter-value"
  const cls12 =
    "cls-12 cls-13 absolute flex items-center top-16 md:-end-10 -end-5 p-4 rounded-lg shadow-md dark:shadow-gray-800 bg-white dark:bg-slate-900 w-60 m-3"
  const cls13 = "cls-13 cls-14 md:col-span-7"
  const cls14 = "cls-14 cls-15 lg:ms-8"
  const cls15 = "cls-15 cls-16 mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold"
  const cls16 = "cls-16 cls-17 text-slate-400 max-w-xl mb-6"
  const cls17 =
    "cls-17 cls-18 py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md"
  const cls18 = "cls-18 cls-19 mdi mdi-chevron-right align-middle ms-0.5"
  const cls19 = "cls-19 cls-20 absolute bottom-0 start-1/3 -z-1"
  const cls20 = "cls-20 cls-21 lg:w-[600px] w-96"

  return (
    <>
      <div className={cls0}>
        <div className={cls1}>
          <div className={cls2}>
            <div className={cls3}>
              {" "}
              <img src="/assets/images/about.jpg" alt="" className={cls4} />
              {/* <div className={cls5}>
                <div className={cls6}>
                  <i data-feather="users" className={cls7}>
                    {" "}
                  </i>{" "}
                </div>
                <div className={cls8}>
                  {" "}
                  <span className={cls9}> Visitor </span>
                  <p className={cls10}>
                    {" "}
                    <span data-target="4589" className={cls11}>
                      {" "}
                      2100
                    </span>{" "}
                  </p>
                </div>
              </div> */}
              {/* <div className={cls12}>
                <div className={cls6}>
                  <i data-feather="globe" className={cls7}>
                    {" "}
                  </i>{" "}
                </div>
                <div className={cls8}>
                  {" "}
                  <span className={cls9}> Travel Packages </span>
                  <p className={cls10}>
                    {" "}
                    <span data-target="50" className={cls11}>
                      {" "}
                      1
                    </span>{" "}
                    +{" "}
                  </p>
                </div>
              </div> */}
            </div>
          </div>
          <div className={cls13}>
            <div className={cls14}>
              <h3 className={cls15}>
                {" "}
                World Best Travel <br /> Agency: Travosy{" "}
              </h3>
              <p className={cls16}>
                {" "}
                Get instant helpful resources about anything on the go, easily implement secure money transfer
                solutions, boost your daily efficiency, connect to other app users and create your own Travosy network,
                and much more with just a few taps. commodo consequat. Duis aute irure.{" "}
              </p>{" "}
              <a href="" className={cls17}>
                Selengkapnya <i className={cls18}> </i>{" "}
              </a>
            </div>
          </div>
          <div className={cls19}>
            {" "}
            <img src="/assets/images/map-plane-big.png" alt="" className={cls20} />{" "}
          </div>
        </div>
      </div>
    </>
  )
}

export default SideToSide
