import React from 'react'
import { useNavigate } from 'react-router-dom'
import propertyTitle from '../images/propertyTitle.png'
import condoImage from '../images/condoImage.png'
import renterImage from '../images/renterImage.png'
import homeImage from '../images/homeImage.png'
import StillHaveQues from './StillHaveQuestion-component/StillHaveQues'
import InsuranceOption from './InsuranceOption-component/InsuranceOption'
import InsuranceHeaderImage from './HeaderImage-component/InsuranceHeaderImage'
import InsuranceHeaderTitle from './HeaderTitle-component/InsuranceHeaderTitle'
import InsuranceDescription from './InsuranceDescription-component/InsuranceDescription'

const insurancePerils = [
  'Fire',
  'Windstorm',
  'Hail',
  'Lightning',
  'Theft or Vandalism',
]

const insuranceOptions = [
  {
    title: 'Homeowners Insurance',
    imageSrc: homeImage,
    description:
      "Homeowners insurance provides financial protection in the event that your home or its contents are damaged. It provides protection if you or a family member are held legally responsible for the injuries to others or damage to their property. Homeowner's insurance policies will cover damage caused by perils such as:",
    alignItems: 'flex-start',
    path: '/insurance',
    hasList: true,
    insurancePerils,
    descriptionTextAlign: 'left',
  },
  {
    title: 'Renters Insurance',
    imageSrc: renterImage,
    description:
      "Were you aware that your landlord's insurance doesn't cover your belongings when you're renting? Getting renters insurance is a budget-friendly option to make sure the things you value are safeguarded. The renters policy also provides personal liability coverage for you and your family against legal liability, bodily injury, and property damage arising out of activities at or away from your premises.",
    alignItems: 'flex-end',
    path: '/insurance',
    hasList: false,
    descriptionTextAlign: 'left',
  },
  {
    title: 'Condo/co-op Insurance',
    imageSrc: condoImage,
    description:
      "Many condo owners think their Condo Association's insurance has them covered completely, but they often need their own policy. A Condo Unit Owner Policy offers specific coverages that might not be included in their Condo Association's policy. Make sure you're covered and see how much you could save through IDB insurance.",
    alignItems: 'flex-start',
    path: '/insurance',
    hasList: false,
    descriptionTextAlign: 'left',
  },
]

const InsuranceProperty = () => {
  let navigate = useNavigate()
  return (
    <>
      {/* property */}
      <InsuranceHeaderImage
        headerImage={propertyTitle}
        imageAlt='property header image'
      />
      <InsuranceHeaderTitle title='Types of Property Insurance For Your Home' />
      <div className='container p-5 pt-4 mt-4 shadow pb-4 mb-4 bg-white'>
        <InsuranceDescription
          InsuranceDescription='Your home may be your most valuable asset. Whether you own a
          traditional house, a condominium, or a mobile home, protect your
          investment and yourself from financial loss due to damage to your home
          or your property.'
        />
        {insuranceOptions.map((option, index) => (
          <InsuranceOption
            key={index}
            title={option.title}
            imageSrc={option.imageSrc}
            navigateTo={() => navigate(option.path)}
            description={option.description}
            alignItems={option.alignItems}
            hasList={option.hasList}
            insurancePerils={option.insurancePerils}
            descriptionTextAlign={option.descriptionTextAlign}
          />
        ))}
      </div>
      <StillHaveQues />
    </>
  )
}

export default InsuranceProperty
