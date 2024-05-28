import { useRef } from "react"
import { useState } from "react"
import { useEffect } from "react"

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
const LoadingDot = ({}) => {
  let iv = useRef(null)
  const [dotCount, setDotCount] = useState(1)
  const maxDot = 6
  const limitDot = maxDot - 1
  useEffect(() => {
    // console.log(iv.current)
    if (!iv.current) {
      iv.current = setInterval(() => {
        // console.log(dotCount)
        setDotCount((current) => (current > limitDot ? 1 : current + 1))
      }, 250)
    }

    return () => {
      if (iv.current) {
        clearInterval(iv.current)
        iv.current = null
      }
    }
  }, [setDotCount])

  // useEffect(()=>{
  //     console.log(length)
  // },[length])

  return (
    <>
      Loading <DotCount length={dotCount} />
    </>
  )
}

export default LoadingDot
