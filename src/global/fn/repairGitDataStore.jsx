import contentSlice from "@/global/store/features/contentSlice"
import settingSlice from "@/global/store/features/settingSlice"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import LoadingDot from "@/global/components/LoadingDot"
import { useNavigate ,useLocation} from "react-router-dom"
import {
	Check as IconCheck,
	Cloud as IconCloud,
	CloudSnow as IconCloudSnow,
	CloudDrizzle as IconCloudDrizzle,
	CloudRain as IconCloudRain,
} from "react-feather"
import { createGit } from "@/global/git"
import {ROUTER_BASE} from "@/config.json"

export const GitDoctor = ({ logs, task }) => {
	const [taskIsRunning, setTaskStatus] = useState(false)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const contentState = useSelector((state) => state.content)
	const settingState = useSelector((state) => state.setting)
	const { setLoading, setLoadingMessage } = contentSlice.actions
	const { setHideGitNotReadyMessage } = settingSlice.actions
	const location = useLocation()
	const git = createGit()
	const runTask = async (taskName) => {
		if (taskName === "checkup") {
			// console.log(taskName)

			setTaskStatus(true)
			await setTimeout(() => {
				setTaskStatus(false)
			}, 1000)
		} else if (taskName === "repair") {
			setTaskStatus(true)
			dispatch(setLoading(true))
			try {
				await git.fastForward(
					(progressEvent) => {},
					(pullSuccess) => {
						dispatch(setLoading(false))
						setTaskStatus(false)
						// navigate(0);

						let currentPath = location.pathname.replace(ROUTER_BASE,'')
						console.log(currentPath)
						navigate("/")
						setTimeout(() => {
							navigate(currentPath)
						}, 0)
					},
				)
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
	return (
		<div className="twx-p-2 twx-opacity-[.5] twx-w-full twx-flex twx-items-center twx-top-0 twx-text-white twx-absolute">
			<div className="twx-w-[250px] twx-mx-auto twx-bg-green-700 twx-px-2 twx-rounded-md">
				{taskIsRunning ? <LoadingDot icons={loadingIcons} message={loadingMessage} /> : <IconCheck />}
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