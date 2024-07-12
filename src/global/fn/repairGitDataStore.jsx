import contentSlice from "@/global/store/features/contentSlice"
import settingSlice from "@/global/store/features/settingSlice"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import LoadingDot from "@/global/components/LoadingDot"
import { formatBytes } from "@/global/fn/formatBytes"
import { useNavigate, useLocation } from "react-router-dom"
import { getCurrentSetting } from "../../global/firebase/setting"

import {
  Check as IconCheck,
  Cloud as IconCloud,
  CloudSnow as IconCloudSnow,
  CloudDrizzle as IconCloudDrizzle,
  CloudRain as IconCloudRain,
} from "react-feather"
import { createGit } from "@/global/git"
import { ROUTER_BASE } from "@/config.json"

export const GitDoctor = ({ logs, task }) => {
  const [taskIsRunning, setTaskStatus] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [bytesDownloaded, setByteDownloaded] = useState(0)
  const contentState = useSelector((state) => state.content)
  const settingState = useSelector((state) => state.setting)
  const { setLoading, setLoadingMessage } = contentSlice.actions
  const { setHideGitNotReadyMessage } = settingSlice.actions
  const location = useLocation()
  const git = createGit()
  git.setOnDownloadProgress((progress) => {
    const { loaded, total } = progress
    if (loaded) setByteDownloaded(formatBytes(loaded ?? 0))
  })
  const runTask = async (taskName) => {
    if (taskName === "checkup") {
      // console.log(taskName)
      const currentSetting = await getCurrentSetting()
      if (!currentSetting) return
      const { repoUrl, token, corsProxyUrl } = currentSetting
      localStorage.repoUrl = repoUrl
      localStorage.token = token
      localStorage.corsProxyUrl = corsProxyUrl

      setTaskStatus(true)
      await setTimeout(() => {
        setTaskStatus(false)
      }, 1000)
    } else if (taskName === "repair") {
      setTaskStatus(true)
      dispatch(setLoading(true, "Sedang Memperbarui database"))
      try {
        git.setOnCloneProgressHandler(dispatch, setLoading, setLoadingMessage)
        await git.fastForward(git.onCloneCallback, (pullSuccess) => {
          dispatch(setLoading(false))
          setTaskStatus(false)
          // navigate(0);

          let currentPath = location.pathname.replace(ROUTER_BASE, "")
          //   console.log(currentPath)
          navigate("/")
          setTimeout(() => {
            navigate(currentPath)
          }, 0)
        })
      } catch (e) {
        console.log(`error`, e)
      }
    }
  }
  useEffect(() => {
    try {
      const taskName = logs[task.lastId]
      if (taskName) {
        runTask(taskName)
      }
    } catch (e) {
      console.log(e)
    }
    // console.log(task, logs)
  }, [task, logs, setTaskStatus])

  const loadingIcons = [<IconCloud />, <IconCloudSnow />, <IconCloudDrizzle />, <IconCloudRain />]
  let loadingMessage = ""
  try {
    loadingMessage = logs[task.lastId]
  } catch (e) {}
  if (!taskIsRunning) return null
  return (
    <div className="twx-p-2 twx-py-5 twx-opacity-[.8] twx-w-full twx-flex twx-items-center twx-top-0 twx-text-white twx-absolute">
      <div className="twx-w-[250px] twx-flex twx-mx-auto twx-text-green-700 twx-px-2 twx-rounded-md">
        {taskIsRunning ? (
          <div className="twx-flex twx-items-center">
            <LoadingDot icons={loadingIcons} message={`${bytesDownloaded} ${loadingMessage}`} />
          </div>
        ) : (
          <IconCheck />
        )}
      </div>
    </div>
  )
}

export const repairGitDataStore = async () => {
  const dispatch = useDispatch()
  const contentState = useSelector((state) => state.content)
  const settingState = useSelector((state) => state.setting)
  const { setLoading, setLoadingMessage } = contentSlice.actions
  const { setHideGitNotReadyMessage } = settingSlice.actions

  const continuePocess = await confirm("Apakah anda yakin ?, Proses ini mungkin memakan waktu beberapa menit")
  if (continuePocess) {
  }
}
