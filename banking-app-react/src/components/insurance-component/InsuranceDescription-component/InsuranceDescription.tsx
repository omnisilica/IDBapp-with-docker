import React from 'react'
import './InsuranceDescription.css'
interface InsuranceDescriptionProps {
  InsuranceDescription: string
}
const InsuranceDescription: React.FC<InsuranceDescriptionProps> = ({
  InsuranceDescription,
}) => {
  return <p className='insuranceDescription'>{InsuranceDescription}</p>
}

export default InsuranceDescription
