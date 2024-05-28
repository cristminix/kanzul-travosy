import React, { Component } from 'react'
import CompanyForm from "@/admin/components/forms/CompanyForm"
import Company from "@/admin/pages/contents/Company"
export class ContentPage extends Component {
  render() {
    return (
      <div className="twx-bg-white -twx-mt-[44px]- -twx-ml-[36px]- twx-p-4">
        <Company/>
      </div>
    )
  }
}

export default ContentPage
