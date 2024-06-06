import contentSlice from "@/global/store/features/contentSlice"
import settingSlice from "@/global/store/features/settingSlice"

import Spinner from "@/app/shared/Spinner"
import SweetAlert from "react-bootstrap-sweetalert"

import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import MainContentLayout from "./MainContentLayout"
import { Button, Tabs, Tab } from "react-bootstrap"

import { createGit } from "@/global/git"
import { useLocation, Link, useNavigate } from "react-router-dom"
import {ROUTER_BASE} from "@/config.json"

import bannerSchema from "@/web/data/forms/banner/schema.json"
import bannerUiSchema from "@/web/data/forms/banner/ui.json"

import MPendaftaranBanner from "@/global/git/models/m-banner/MPendaftaranBanner"
import BannerEditor from "./components/BannerEditor"
import {crc32id} from "@/global/fn/crc32id"
const git = createGit()

const mPendaftaranBanner = new MPendaftaranBanner(git,bannerSchema)

const PendaftaranContentPage = ({ subModule }) => {
	const location = useLocation()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const contentState = useSelector((state) => state.content)
	const settingState = useSelector((state) => state.setting)
	const { setLoading, setLoadingMessage } = contentSlice.actions
	const { setHideGitNotReadyMessage } = settingSlice.actions

	const [formData, setFormData] = useState(null)
	const [formShown, showForm] = useState(false)
	const [trigger, setTrigger] = useState(false)

	const pageTitle = "Edit Pendaftaran"
	const breadcrumbs = [
		{ title: "Konten", path: "contents" },
		{ title: "Pendaftaran", path: "content/pendaftaran" },
	]
	const [alert, setAlert] = useState(null)
	const [tabKey, setTabKey] = useState("banner")

	const onSelectTab = (tabKey)=>{
		navigate(`/contents/pendaftaran/${tabKey}`)
		console.log(tabKey)
	}

	useEffect(()=>{
		const pathnames = location.pathname.split('/')
		setTabKey(pathnames.at(-1))
		setTrigger(crc32id())
	},[location.key,setTabKey])
	return (
		<MainContentLayout
			pageTitle={pageTitle}
			breadcrumbs={breadcrumbs}
			className={`${contentState.isLoading ? "content-is-loading" : ""}`}>
			<div className="col-12 grid-margin stretch-card">
				<div className="card">
					<div className="card-body">
						<Tabs id="controlled-tab-example" activeKey={tabKey} onSelect={(k) => onSelectTab(k)}>
							<Tab eventKey="banner" title="Banner">
								{tabKey==='banner'&&
								<BannerEditor page="pendaftaran" 
								model={mPendaftaranBanner} 
								trigger={trigger}
								schema={bannerSchema}
								uiSchema={bannerUiSchema}
								/>
								}
							</Tab>
							<Tab eventKey="syarat-utama" title="Syarat Utama">
								Syarat Utama
							</Tab>
							<Tab eventKey="syarat-administrasi" title="Syarat Administrasi">
								Syarat Administrasi
							</Tab>
							<Tab eventKey="biaya-pendaftaran" title="Biaya Pendaftaran">
								Biaya Pendaftaran
							</Tab>
						</Tabs>

					</div>
				</div>
			</div>
		</MainContentLayout>
	)
}

export default PendaftaranContentPage