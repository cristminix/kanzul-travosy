const BeritaItemSkeleton = ({})=>{
	return <div className="twx-border twx-border-blue-300 twx-shadow twx-rounded-md twx-p-4 twx-max-w-sm twx-w-full twx-mx-auto">
  <div className="twx-animate-pulse twx-flex twx-space-x-4">
    <div className="twx-rounded-full twx-bg-slate-700 twx-h-10 twx-w-10"></div>
    <div className="twx-flex-1 twx-space-y-6 twx-py-1">
      <div className="twx-h-2 twx-bg-slate-700 twx-rounded"></div>
      <div className="twx-space-y-3">
        <div className="twx-grid twx-grid-cols-3 twx-gap-4">
          <div className="twx-h-2 twx-bg-slate-700 twx-rounded twx-col-span-2"></div>
          <div className="twx-h-2 twx-bg-slate-700 twx-rounded twx-col-span-1"></div>
        </div>
        <div className="twx-h-2 twx-bg-slate-700 twx-rounded"></div>
      </div>
    </div>
  </div>
</div>
}

export  default BeritaItemSkeleton