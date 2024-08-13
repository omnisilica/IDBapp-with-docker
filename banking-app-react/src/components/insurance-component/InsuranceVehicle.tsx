import React from 'react'
import { useNavigate } from 'react-router-dom'
import vehicleHeaderImage from '../images/vehicle-header-img.png'
import RVImage from '../images/RV.png'
import carImage from '../images/car.png'
import motorcycleImage from '../images/motorcycle.png'
import StillHaveQues from './StillHaveQuestion-component/StillHaveQues'
import InsuranceOption from './InsuranceOption-component/InsuranceOption'
import InsuranceHeaderImage from './HeaderImage-component/InsuranceHeaderImage'
import InsuranceHeaderTitle from './HeaderTitle-component/InsuranceHeaderTitle'
import InsuranceDescription from './InsuranceDescription-component/InsuranceDescription'

const InsuranceVehicle = () => {
  let navigate = useNavigate()
  const insuranceOptions = [
    {
      title: 'Auto insurance',
      imageSrc: carImage,
      navigateTo: () => navigate('/insurance'),
      description:
        'Most drivers are aware that they need auto insurance. But how much coverage should you carry.',
      alignItems: 'flex-start',
      descriptionTextAlign: 'center',
      hasList: false,
    },
    {
      title: 'Motorcycle insurance',
      imageSrc: motorcycleImage,
      navigateTo: () => navigate('/insurance'),
      description:
        'Motorcycle are not usually covered under your regular auto insurance. see how much IDB can save money on your motorcycle insurance.',
      alignItems: 'flex-end',
      descriptionTextAlign: 'center',
      hasList: false,
    },
    {
      title: 'RV insurance',
      imageSrc: RVImage,
      navigateTo: () => navigate('/insurance'),
      description:
        "Owning an RV or travel trailer offers the assurance of having a place to sleep wherever you go, but these unique vehicles present challenges that regular cars don't. Get the right.",
      alignItems: 'flex-start',
      descriptionTextAlign: 'center',
      hasList: false,
    },
  ]
  return (
    <>
      {/* vehicle */}
      <InsuranceHeaderImage
        headerImage={vehicleHeaderImage}
        imageAlt='vehicle header image'
      />
      <InsuranceHeaderTitle title='Types of Vehicle Insurance Policies' />
      <div className='container p-5 pt-4 mt-4  border shadow pb-4 mb-4 bg-white'>
        <InsuranceDescription
          InsuranceDescription="Accidents happen when we least expect them. That's why it's important
          to be prepared and protected. The IDB is here to help you get the type
          of vehicle insurance you need."
        />
        {insuranceOptions.map((option, index) => (
          <InsuranceOption
            key={index}
            title={option.title}
            imageSrc={option.imageSrc}
            navigateTo={option.navigateTo}
            description={option.description}
            alignItems={option.alignItems}
            descriptionTextAlign={option.descriptionTextAlign}
            hasList={option.hasList}
          />
        ))}
      </div>
      <StillHaveQues />
    </>
  )
}

export default InsuranceVehicle
