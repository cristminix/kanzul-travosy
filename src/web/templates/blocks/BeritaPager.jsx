const BeritaPager = ({}) => {
	return (
		<div className="grid md:grid-cols-12 grid-cols-1 mt-6">
			<div className="md:col-span-12 text-center">
				<nav aria-label="Page navigation example">
					<ul className="inline-flex items-center -space-x-px">
						<li>
							<a
								href="#"
								className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-s-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-red-500 dark:hover:border-red-500 hover:bg-red-500 dark:hover:bg-red-500">
								<i data-feather="chevron-left" className="size-5 rtl:rotate-180 rtl:-mt-1"></i>
							</a>
						</li>
						<li>
							<a
								href="#"
								className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-red-500 dark:hover:border-red-500 hover:bg-red-500 dark:hover:bg-red-500">
								1
							</a>
						</li>
						<li>
							<a
								href="#"
								className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-red-500 dark:hover:border-red-500 hover:bg-red-500 dark:hover:bg-red-500">
								2
							</a>
						</li>
						<li>
							<a
								href="#"
								aria-current="page"
								className="z-10 size-[40px] inline-flex justify-center items-center text-white bg-red-500 border border-red-500">
								3
							</a>
						</li>
						<li>
							<a
								href="#"
								className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-red-500 dark:hover:border-red-500 hover:bg-red-500 dark:hover:bg-red-500">
								4
							</a>
						</li>
						<li>
							<a
								href="#"
								className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-red-500 dark:hover:border-red-500 hover:bg-red-500 dark:hover:bg-red-500">
								5
							</a>
						</li>
						<li>
							<a
								href="#"
								className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-e-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-red-500 dark:hover:border-red-500 hover:bg-red-500 dark:hover:bg-red-500">
								<i data-feather="chevron-right" className="size-5 rtl:rotate-180 rtl:-mt-1"></i>
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	)
}

export default BeritaPager