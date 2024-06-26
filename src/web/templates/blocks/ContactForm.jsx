import { useEffect, useState, useRef } from "react"
import { validateEmail } from "@/global/fn/validateEmail"
import settingSlice from "@/global/store/features/settingSlice"
import { useDispatch, useSelector } from "react-redux"
import { CheckCircle as IconCheck, Send as IconSend } from "react-feather"
const apiUrl = `https://api.ponpeskanzululumcirebon.com`
import ReCAPTCHA from "react-google-recaptcha"

const ContactForm = ({}) => {
  const cls5 = "cls-5 container"
  const cls6 = "cls-6 grid md:grid-cols-12 grid-cols-1 items-center gap-6"
  const cls7 = "cls-7 lg:col-span-7 md:col-span-6"
  const cls8 = "cls-8 w-full max-w-[500px] mx-auto"
  const cls9 = "cls-9 lg:col-span-5 md:col-span-6"
  const cls10 = "cls-10 lg:ms-5"
  const cls11 = "cls-11 bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-800 p-6"
  const cls12 = "cls-12 mb-6 text-2xl leading-normal font-semibold"
  const cls13 = "cls-13 mb-0"
  const cls14 = "cls-14 grid lg:grid-cols-12 grid-cols-1 gap-3"
  const cls15 = "cls-15 lg:col-span-6"
  const cls16 = "cls-16 font-semibold"
  const cls17 =
    "cls-17 mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
  const cls18 = "cls-18 lg:col-span-12"
  const cls19 =
    "cls-19 mt-2 w-full py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
  const cls20 =
    "cls-20 py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md mt-2"
  /*********************/
  /*     Contact Form  */
  /*********************/
  const dispatch = useDispatch()
  const settingState = useSelector((state) => state.setting)
  const { updateClientId } = settingSlice.actions

  const [formData, setFormData] = useState({})
  const recaptchaRef = useRef(null)
  const fieldNames = ["name", "email", "subject", "comments", "captchaToken"]
  const fieldCaps = ["Nama", "Email", "Subyek", "Pesan", "Captcha"]
  const [ticket, setTicket] = useState("")
  const [sendStatus, setSendStatus] = useState(0) // -1 error, 0 init, 1 success

  const identityUrl = `${apiUrl}/contact/identity`
  const sendUrl = `${apiUrl}/contact/send`
  let [clientId, setClientId] = useState(settingState.clientId)

  useEffect(() => {
    // console.log(settingState)
    const { clientId } = settingState
    if (clientId) {
      setClientId(clientId)
      retrieveIdentity()
    }
  }, [settingState, setClientId, setTicket, setSendStatus])

  useEffect(() => {
    dispatch(updateClientId())
  }, [dispatch])

  const retrieveIdentity = async () => {
    setSendStatus(0)
    const frmData = new FormData()
    frmData.append("appId", "kanzululum-web")
    frmData.append("clientId", clientId)
    try {
      const response = await fetch(identityUrl, { method: "POST", body: frmData }).then((r) => r.json())
      const { ticket } = response
      setTicket(ticket)
      // console.log({ ticket })
    } catch (e) {}
  }
  const onCaptchaChange = (captchaToken) => {
    if (captchaToken) {
      setFormData((oData) => ({ ...oData, captchaToken }))
    }
  }
  const displayError = (message) => {
    document.getElementById("error-msg").innerHTML = `<div class='alert alert-warning error_message'>${message}</div>`
    fadeIn()
  }
  const fadeIn = () => {
    var fade = document.getElementById("error-msg")
    var opacity = 0
    var intervalID = setInterval(function () {
      if (opacity < 1) {
        opacity = opacity + 0.5
        fade.style.opacity = opacity
      } else {
        clearInterval(intervalID)
      }
    }, 200)
  }
  const hideError = () => {
    const errCnt = document.getElementById("error-msg")
    errCnt.style.opacity = 0
    errCnt.innerHTML = ""
  }
  const validateForm = () => {
    hideError()
    let idx = 0
    let valid = true
    let errorMessage = ""
    for (const field of fieldNames) {
      const value = formData[field]
      const fieldRef = document.getElementById(field)

      if (!value || value == "" || value == null) {
        errorMessage =
          field === "captchaToken" ? "Silahkan ceklist keamanan" : `* Silahkan masukkan ${fieldCaps[idx]} *`
        valid = false
      } else if (field === "email" && !validateEmail(value)) {
        errorMessage = `*Silahkan masukkan email valid misal : anda@gmail.com *`
        valid = false
      }
      if (!valid) {
        displayError(errorMessage)
        if (fieldRef) fieldRef.focus()
        return false
      }
      idx += 1
    }

    return true
  }

  const onSubmitForm = (e) => {
    try {
      const validForm = validateForm()
      if (validForm) {
        // console.log(formData)
        sendContact()
      }
    } catch (e) {
      displayError("Terjadi kesalahan")
      console.error(e)
    }

    return e.preventDefault()
  }
  const sendContact = async () => {
    setSendStatus(2)
    const frmData = new FormData()
    frmData.append("appId", "kanzululum-web")
    frmData.append("clientId", clientId)
    frmData.append("ticket", ticket)
    for (const field of fieldNames) {
      const value = formData[field]
      if (value) {
        frmData.append(field, value)
      }
    }
    try {
      const response = await fetch(sendUrl, { method: "POST", body: frmData }).then((r) => r.json())
      const { success, ticket, message } = response
      // setTicket(ticket)
      if (!success) {
        setSendStatus(-1)
        displayError(message)
      } else {
        setSendStatus(1)
      }
      console.log({ success, ticket, message })
    } catch (e) {
      displayError("Terjadi kesalahan")
      console.error(e)
    }
  } 
  return (
    <div className={cls5}>
      <div className={cls6}>
        <div className={cls7}>
          <img src="/assets/images/travel-train-station.svg" alt="" className={cls8} />
        </div>

        <div className={cls9}>
          <div className={cls10}>
            <div className={cls11}>
              <h3 className={cls12}> {sendStatus === 1 ? "Terima Kasih" : "Hubungi Kami"} </h3>
              {ticket ? (
                <>
                  {sendStatus === 1 ? (
                    <>
                      <p id="success-msg" className={`${cls13} twx-flex `}>
                        <IconCheck className="feather-icon twx-text-green-500 twx-mr-2 twx-w-[100px]" /> Pesan Anda
                        sudah berhasil terkirim, kami akan membalas pesan melalui email. Silahkan periksa kotak masuk
                        email Anda beberapa waktu lagi.
                      </p>
                    </>
                  ) : (
                    ""
                  )}
                  {sendStatus === 2 ? (
                    <p id="success-msg" className={`${cls13} twx-flex `}>
                      <IconSend className="feather-icon twx-text-green-500 twx-mr-2 twx-w-[80px]" /> Sedang mengirim
                      pesan ...
                    </p>
                  ) : null}
                  {sendStatus === 0 ? (
                    <form
                      onSubmit={(e) => {
                        return onSubmitForm(e)
                      }}>
                      <p id="error-msg" className={cls13}></p>
                      <div id="simple-msg"> </div>
                      <div className={cls14}>
                        <div className={cls15}>
                          <label htmlFor="name" className={cls16}>
                            Nama Anda:
                          </label>
                          <input
                            name="name"
                            id="name"
                            type="text"
                            placeholder="Nama :"
                            className={cls17}
                            onChange={(e) => setFormData((oData) => ({ ...oData, name: e.target.value }))}
                          />
                        </div>

                        <div className={cls15}>
                          <label htmlFor="email" className={cls16}>
                            Email:
                          </label>
                          <input
                            name="email"
                            id="email"
                            type="text"
                            placeholder="Email :"
                            className={cls17}
                            onChange={(e) => setFormData((oData) => ({ ...oData, email: e.target.value }))}
                          />
                        </div>

                        <div className={cls18}>
                          <label htmlFor="subject" className={cls16}>
                            Pertanyaan Anda:
                          </label>
                          <input
                            name="subject"
                            id="subject"
                            placeholder="Subyek :"
                            className={cls17}
                            onChange={(e) => setFormData((oData) => ({ ...oData, subject: e.target.value }))}
                          />
                        </div>

                        <div className={cls18}>
                          <label htmlFor="comments" className={cls16}>
                            Komentar:
                          </label>
                          <textarea
                            name="comments"
                            id="comments"
                            placeholder="Pesan :"
                            className={cls19}
                            onChange={(e) => setFormData((oData) => ({ ...oData, comments: e.target.value }))}
                          />
                        </div>
                        <div className={cls8}>
                          <ReCAPTCHA
                            size="normal"
                            sitekey="6LdLtP4pAAAAAAlK7NdFD-w3rOW213fRh4WYNiCU"
                            onChange={onCaptchaChange}
                            ref={recaptchaRef}
                          />
                        </div>
                      </div>
                      <button type="submit" id="submit" name="send" className={cls20}>
                        Kirim Pesan
                      </button>
                    </form>
                  ) : null}
                </>
              ) : (
                <p id="error-msg" className={cls13}>
                  Unable to retrieve ticket
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactForm