import React from 'react'
import './InsuranceHeaderTitle.css'
interface InsuranceTitleProps {
  title: string
}
const InsuranceHeaderTitle: React.FC<InsuranceTitleProps> = ({ title }) => {
  return (
    <div className='propertyHeaderSection'>
      <h1 className='propertyHeaderText'>{title}</h1>
    </div>
  )
}

export default InsuranceHeaderTitle
