import React, { Component } from "react"
import CompanyForm from "@/admin/components/forms/CompanyForm"
import Company from "@/admin/pages/contents/Company"
// import Toast from "@/global/components/bootstrap/Toast"
import { Button, Toast } from "react-bootstrap"

export class ContentPage extends Component {
  render() {
    return (
      <>
        {/* <Toast /> */}
        <Toast>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
            <strong className="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
        <Button>Edit Company</Button>
        <div className="twx-bg-white -twx-mt-[44px]- -twx-ml-[36px]- twx-p-4">
          <Company />
        </div>
      </>
    )
  }
}

export default ContentPage
