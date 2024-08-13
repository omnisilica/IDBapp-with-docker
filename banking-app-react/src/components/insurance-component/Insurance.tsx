import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import CarImage from '../images/vehicle-logo.png'
import LifeImage from '../images/life-logo.png'
import PropertyImage from '../images/property-logo.png'
import InsuranceHeaderTitle from './HeaderTitle-component/InsuranceHeaderTitle'
import InsuranceDescription from './InsuranceDescription-component/InsuranceDescription'
interface InsuranceCardProps {
  imageSrc: string
  title: string
  description: string
  onClick: () => void
}
const Insurance = () => {
  let navigate = useNavigate()
  const InsuranceCard: React.FC<InsuranceCardProps> = ({
    imageSrc,
    title,
    description,
    onClick,
  }) => {
    return (
      <Card
        className='shadow'
        style={{
          width: '18rem',
          padding: '2%',
          margin: '2%',
          border: 'none',
          borderRadius: '5%',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Card.Img
          variant='top'
          src={imageSrc}
          style={{ background: '#F28500', borderRadius: '50%' }}
        />
        <Card.Body style={{ textAlign: 'center', color: '#555555' }}>
          <div
            className='d-flex flex-column justify-content-between'
            style={{ height: '100%' }}
          >
            <Card.Title>
              <b>{title}</b>
            </Card.Title>
            <Card.Text>{description}</Card.Text>
            <Button
              className='btn btn-outline-primary mx-2 shadow-sm'
              variant='primary'
              style={{ background: '#F28500', borderColor: '#F28500' }}
              onClick={onClick}
            >
              Learn More
            </Button>
          </div>
        </Card.Body>
      </Card>
    )
  }
  return (
    <>
      <InsuranceHeaderTitle title='Insurance Overview' />
      <div className='container p-5 pt-4 mt-4  border shadow pb-4 mb-4 bg-white'>
        <div className='accountDiv'>
          <div
            className='row'
            style={{
              justifyContent: 'center',
              textAlign: 'center',
              color: '#555555',
            }}
          >
            <InsuranceDescription
              InsuranceDescription="We can help protect what is most important to you. And we'll
              support you and those closet to you with caring service."
            />
            {/* proptery */}
            <InsuranceCard
              imageSrc={PropertyImage}
              title='Property'
              description='Find the right coverage to protect your home and the things you value'
              onClick={() => {
                navigate('/property-insurance')
              }}
            />
            {/* life */}
            <InsuranceCard
              imageSrc={LifeImage}
              title='Life'
              description="We will help you plan for life insurance before it's needed"
              onClick={() => {
                navigate('/life-insurance')
              }}
            />
            {/* vehicle */}
            <InsuranceCard
              imageSrc={CarImage}
              title='Vehicle'
              description="Whether it's your car, motorbike, or boat, it pays to be insured."
              onClick={() => {
                navigate('/vehicle-insurance')
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Insurance
