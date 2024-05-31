const BlankContentLayout = ({children})=>{
	return <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
          	{children}
          </div>
        </div>
      </div>
}

export default BlankContentLayout