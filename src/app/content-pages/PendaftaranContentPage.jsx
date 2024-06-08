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
import { ROUTER_BASE } from "@/config.json"

import bannerSchema from "@/web/data/forms/banner/schema.json"
import bannerUiSchema from "@/web/data/forms/banner/ui.json"

import syaratSchema from "@/web/data/forms/pendaftaran/syarat/schema.json"
import syaratUiSchema from "@/web/data/forms/pendaftaran/syarat/ui.json"

import biayaSchema from "@/web/data/forms/pendaftaran/biaya/schema.json"
import biayaUiSchema from "@/web/data/forms/pendaftaran/biaya/ui.json"

import MPendaftaranBanner from "@/global/git/models/m-banner/MPendaftaranBanner"
import { MSyaratUtama, MSyaratAdministrasi, MBiaya } from "@/global/git/models/MSyarat"

import BannerEditor from "./components/BannerEditor"
import SyaratList from "./components/SyaratList"
import { crc32id } from "@/global/fn/crc32id"
import BiayaList from "./components/BiayaList"
import JsonForm from "./JsonForm"

const git = createGit()

const mPendaftaranBanner = new MPendaftaranBanner(git, bannerSchema)
const mSyaratUtama = new MSyaratUtama(git, syaratSchema)
const mSyaratAdministrasi = new MSyaratAdministrasi(git, syaratSchema)
const mBiaya = new MBiaya(git, biayaSchema)

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

	const onSelectTab = (tabKey) => {
		navigate(`/contents/pendaftaran/${tabKey}`)
		console.log(tabKey)
	}

	const [syaratType, setSyaratType] = useState(null)
	const [syaratListData, setSyaratListData] = useState([])
	const [syaratFormData, setSyaratFormData] = useState(null)
	const [formSyaratShown, showFormSyarat] = useState(false)
	const loadSyaratListData = async () => {
		let data
		if (syaratType === "utama") data = await mSyaratUtama.getData()
		else data = await mSyaratAdministrasi.getData()
		setSyaratListData(data)
	}
	const showEditFormSyarat = (row, type) => {
		setSyaratFormData(row)
		showFormSyarat(true)
	}
	const onSaveFormSyarat = async (e,type)=>{
		const {formData} = e
		
		dispatch(setLoading(true))
    	dispatch(setLoadingMessage("Menyimpan Data"))
		if(type === 'administrasi'){
    		await mSyaratAdministrasi.updateRow(formData, true)
		}else{
    		await mSyaratUtama.updateRow(formData, true)
		}
		dispatch(setLoading(false))
		showFormSyarat(false)
	}
	const [biayaListData, setBiayaListData] = useState([])
	const [biayaFormData, setBiayaFormData] = useState(null)
	const [formBiayaShown, showFormBiaya] = useState(false)

	const loadBiayaListData = async () => {
		const data = await mBiaya.getData()
		setBiayaListData(data)
	}
	const showEditFormBiaya = async (row) => {
		// const formData =
		setBiayaFormData(row)
		showFormBiaya(true)
	}
	const onSaveFormBiaya = async (e)=>{
		const {formData} = e
		dispatch(setLoading(true))
    	dispatch(setLoadingMessage("Menyimpan Data"))
    	await mBiaya.updateRow(formData, true)
		dispatch(setLoading(false))
		showFormSyarat(false)
	}
	useEffect(() => {
		if (syaratType) {
			loadSyaratListData()
		}
	}, [syaratType, setSyaratListData])
	useEffect(() => {
		const pathnames = location.pathname.split("/")
		const tabName = pathnames.at(-1)
		setTabKey(tabName)
		setTrigger(crc32id())

		if (tabName === "syarat-utama") {
			setSyaratType("utama")
		} else if (tabName === "syarat-administrasi") {
			setSyaratType("administrasi")
		} else {
			setSyaratType(null)
			if (tabName === "biaya-pendaftaran") {
				loadBiayaListData()
			}
		}
	}, [location.key, setTabKey, setSyaratType, setBiayaListData])
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
								{tabKey === "banner" && (
									<BannerEditor
										page="pendaftaran"
										model={mPendaftaranBanner}
										trigger={trigger}
										schema={bannerSchema}
										uiSchema={bannerUiSchema}
									/>
								)}
							</Tab>
							<Tab eventKey="syarat-utama" title="Syarat Utama">
								{tabKey === "syarat-utama" && (
									<>
										{!formSyaratShown ? (
											<>
												<h4 className="twx-text-2xl twx-text-center twx-py-4 twx-mb-8">Syarat Utama</h4>
												<SyaratList
													git={git}
													className="twx-border twx-border-slate-200 twx-border-solid"
													data={syaratListData}
													onEditRow={(row) => showEditFormSyarat(row, "utama")}
												/>
											</>
										) : (
											<>
												<JsonForm
													title={`Edit Item Syarat Utama`}
													formData={syaratFormData}
													schema={syaratSchema}
													uiSchema={syaratUiSchema}
													onSubmit={(e) => onSaveFormSyarat(e, "utama")}
													onCancel={(e) => showFormSyarat(false)}
												/>
											</>
										)}
									</>
								)}
							</Tab>
							<Tab eventKey="syarat-administrasi" title="Syarat Administrasi">
								{tabKey === "syarat-administrasi" && (
									<>
										{!formSyaratShown ? (
											<>
												<h4 className="twx-text-2xl twx-text-center twx-py-4 twx-mb-8">Syarat Administrasi</h4>
												<SyaratList
													git={git}
													className="twx-border twx-border-slate-200 twx-border-solid"
													data={syaratListData}
													onEditRow={(row) => showEditFormSyarat(row, "utama")}
												/>
											</>
										) : (
											<>
												<JsonForm
													title={`Edit Item Syarat Administrasi`}
													formData={syaratFormData}
													schema={syaratSchema}
													uiSchema={syaratUiSchema}
													onSubmit={(e) => onSaveFormSyarat(e, "administrasi")}
													onCancel={(e) => showFormSyarat(false)}
												/>
											</>
										)}
									</>
								)}
							</Tab>
							<Tab eventKey="biaya-pendaftaran" title="Biaya Pendaftaran">
								{tabKey === "biaya-pendaftaran" && (
									<>
										{!formBiayaShown ? (
											<>
												<h4 className="twx-text-2xl twx-text-center twx-py-4 twx-mb-8">Biaya Pendaftaran</h4>
												<BiayaList
													git={git}
													className="twx-border twx-border-slate-200 twx-border-solid"
													data={biayaListData}
													onEditRow={(row) => showEditFormBiaya(row)}
												/>
											</>
										) : (
											<>
												<JsonForm
													title={`Edit Item Biaya`}
													formData={biayaFormData}
													schema={biayaSchema}
													uiSchema={biayaUiSchema}
													onSubmit={(e) => onSaveFormBiaya(e)}
													onCancel={(e) => showFormBiaya(false)}
												/>
											</>
										)}
									</>
								)}
							</Tab>
						</Tabs>
					</div>
				</div>
			</div>
		</MainContentLayout>
	)
}

export default PendaftaranContentPage