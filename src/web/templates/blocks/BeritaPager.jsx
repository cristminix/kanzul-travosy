import { Link } from "react-router-dom"
import { useEffect } from "react"
import { ChevronRight as IconChevronRight, ChevronLeft as IconChevronLeft } from "react-feather"

const skeleton = "twx-shadow twx-bg-slate-300 twx-opacity-80 twx-shadow twx-rounded-md"

const BeritaPager = ({ pager, base = "", routeName = "page", loading }) => {
  return (
    <div className="grid md:grid-cols-12 grid-cols-1 mt-6">
      <div className="md:col-span-12 text-center">
        {loading ? (
          <>
            <div className={`twx-h-8 twx-w-[200px] ${skeleton}  twx-animate-pulse twx-mx-auto twx-mt-6`}></div>
          </>
        ) : (
          <nav aria-label="Page navigation example">
            <ul className="inline-flex items-center -space-x-px">
              {pager.page > 1 && (
                <li>
                  <Link
                    to={`${base}/${routeName}/${pager.page - 1}`}
                    className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-s-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-red-500 dark:hover:border-red-500 hover:bg-red-500 dark:hover:bg-red-500">
                    <IconChevronLeft className="size-5 rtl:rotate-180 rtl:-mt-1" />
                  </Link>
                </li>
              )}

              {[...Array(pager.totalPages).fill(1)].map((item, index) => {
                const pageNumber = index + 1
                return (
                  <li>
                    {pager.page == pageNumber ? (
                      <Link
                        to={`${base}/${routeName}/${pageNumber}`}
                        aria-current="page"
                        className="z-10 size-[40px] inline-flex justify-center items-center text-white bg-red-500 border border-red-500">
                        {pageNumber}
                      </Link>
                    ) : (
                      <Link
                        to={`${base}/${routeName}/${pageNumber}`}
                        className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-red-500 dark:hover:border-red-500 hover:bg-red-500 dark:hover:bg-red-500">
                        {pageNumber}
                      </Link>
                    )}
                  </li>
                )
              })}
              {pager.page < pager.totalPages && (
                <li>
                  <Link
                    to={`${base}/${routeName}/${pager.page + 1}`}
                    className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-e-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-red-500 dark:hover:border-red-500 hover:bg-red-500 dark:hover:bg-red-500">
                    <IconChevronRight className="size-5 rtl:rotate-180 rtl:-mt-1" />
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </div>
  )
}

export default BeritaPager
