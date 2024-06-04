import { useRef , useState ,useEffect } from "react"

const DotCount = ({ length }) => {
  let dots = Array(length).fill("")
  return (
    <span>
      {dots.map((item, index) => (
        <span key={index}>.</span>
      ))}
    </span>
  )
}
const LoadingDot = ({ icons = [], message = "Loading" }) => {
  let iv = useRef(null)
  const [dotCount, setDotCount] = useState(1)
  const maxDot = 6
  const [iconIndex, setIconIndex] = useState(0)
  const [iconState,setIconState] = useState(null)
  const limitDot = maxDot - 1
  useEffect(() => {
    // console.log(iv.current)
    if (!iv.current) {
      iv.current = setInterval(() => {
        // console.log(dotCount)
        setDotCount((oDotCount) => {
          const maxDotReached = oDotCount > limitDot
          return maxDotReached ? 1 : oDotCount + 1
        })
      }, 250)
    }

    return () => {
      if (iv.current) {
        clearInterval(iv.current)
        iv.current = null
      }
    }
  }, [setDotCount])

  useEffect(() => {
    // const maxDotReached = dotCount > limitDot

    if (dotCount % 2 === 0) {
      setIconIndex((oIndex) => {
        const maxIconIndexLengthReached = oIndex >= icons.length - 1

        return maxIconIndexLengthReached ? 0 : oIndex + 1
      })
    }
    // console.log(length)
  }, [dotCount, setIconIndex])

  useEffect(()=>{
    if(icons.length > 0){
      // console.log(icons[iconIndex])
      setIconState(icons[iconIndex])
    }
  },[iconIndex,setIconState])

  return (
    <>

      {iconState} <span className="twx-px-4">{message}</span> <DotCount length={dotCount} />
    </>
  )
}

export default LoadingDot
