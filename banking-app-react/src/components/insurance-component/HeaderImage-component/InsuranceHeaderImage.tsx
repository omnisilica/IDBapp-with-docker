import React from 'react'
import './InsuranceHeaderImage.css'
interface InsuranceHeaderImageProps {
  headerImage: string
  imageAlt: string
}
const InsuranceHeaderImage: React.FC<InsuranceHeaderImageProps> = ({
  headerImage,
  imageAlt,
}) => {
  return (
    <div className='container p-5 pt-4 mt-4  border shadow pb-4 mb-4 bg-white'>
      <img src={headerImage} className='responsive-image' alt={imageAlt} />
    </div>
  )
}

export default InsuranceHeaderImage
