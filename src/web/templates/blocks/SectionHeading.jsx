const SectionHeading = ({ title, content, className }) => {
	return (
		<section class={`${className} relative overflow-hidden`}>
			<div className="cls-0 container relative md:mt-24 mt-16">
				<div class="cls-1 grid grid-cols-1 pb-6 text-center">
					<h3 class="cls-2 mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
						{title}
					</h3>
					<p class="cls-3 text-slate-400 max-w-xl mx-auto">
						{content}
					</p>
				</div>
			</div>
		</section>
	)
}

export default SectionHeading