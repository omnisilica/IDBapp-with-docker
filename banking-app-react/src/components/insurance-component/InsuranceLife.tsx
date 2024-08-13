import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import StillHaveQues from './StillHaveQuestion-component/StillHaveQues'
import lifeHeaderImage from '../images/lifeHeaderImage.png'
import InsuranceHeaderImage from './HeaderImage-component/InsuranceHeaderImage'
import InsuranceHeaderTitle from './HeaderTitle-component/InsuranceHeaderTitle'
const InsuranceLife = () => {
  let navigate = useNavigate()

  return (
    <>
      <InsuranceHeaderImage
        headerImage={lifeHeaderImage}
        imageAlt='life header image'
      />
      {/* life  */}
      <InsuranceHeaderTitle title='Life Insurance Policies' />
      <div className='container p-5 pt-4 mt-4  border shadow pb-4 mb-4 bg-white'>
        {/* what is life insurance */}
        <b
          style={{
            textAlign: 'center',
            color: '#555555',
            alignSelf: 'left',
            fontSize: '2rem',
            borderBottom: '4px solid #F28500',
            paddingBottom: '0.25rem',
            display: 'inline-block',
          }}
        >
          What is Life Insurance?
        </b>
        <Card
          className='shadow'
          style={{
            width: '60%',
            margin: '2%',
          }}
        >
          <Card.Body
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              position: 'relative',
            }}
          >
            <p
              style={{
                textAlign: 'center',
                color: '#555555',
                alignSelf: 'center',
              }}
            >
              Life insurance is a contract in which policy holder pays premiums
              in return for a one-time payment, called a death benefit, which
              goes to the policyholder's beneficiaries. This payment is made
              either upon the policyholder's death or after a certain period.
            </p>
          </Card.Body>
        </Card>
        {/* how much does it cost */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <b
            style={{
              textAlign: 'center',
              color: '#555555',
              alignSelf: 'left',
              fontSize: '2rem',
              borderBottom: '4px solid #F28500',
              paddingBottom: '0.25rem',
              display: 'inline-block',
            }}
          >
            How much does Life insurance cost?
          </b>
          <Card
            className='shadow'
            style={{
              width: '60%',
              margin: '2%',
            }}
          >
            <Card.Body
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                position: 'relative',
              }}
            >
              <p
                style={{
                  textAlign: 'center',
                  color: '#555555',
                  alignSelf: 'center',
                }}
              >
                The cost of insurance depends on several factors, such as age,
                medical history, and lifestyle. The coverage amount and policy
                typ also play a significant role in determining life insurance
                cost.
              </p>
            </Card.Body>
          </Card>
        </div>
        {/* how much do I need */}
        <b
          style={{
            textAlign: 'center',
            color: '#555555',
            alignSelf: 'left',
            fontSize: '2rem',
            borderBottom: '4px solid #F28500',
            paddingBottom: '0.25rem',
            display: 'inline-block',
          }}
        >
          How much Life insurance do I need ?
        </b>
        <Card
          className='shadow'
          style={{
            width: '60%',
            margin: '2%',
          }}
        >
          <Card.Body
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              position: 'relative',
            }}
          >
            <p
              style={{
                textAlign: 'center',
                color: '#555555',
                alignSelf: 'center',
              }}
            >
              Figuring out your insurance requirements isn't as complicated as
              it seems. By answering a few questions and doing basic
              calculations, you can easily gauge your life insurance needs and
              discover how cost-effective a policy can be.
            </p>
          </Card.Body>
        </Card>
        {/* start quote box */}
        <Card
          className='shadow'
          style={{
            border: '0.5px #000000',
            borderRadius: '8%',
          }}
        >
          <Card.Body
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              position: 'relative',
            }}
          >
            <p
              style={{
                textAlign: 'center',
                color: '#555555',
                alignSelf: 'center',
                fontWeight: 'bold',
              }}
            >
              As every person's situation is different, you'll need to choose
              which product is right for you. At IDB, we will help you find the
              right insurance for you.
            </p>
            <Button
              className='btn btn-outline-primary mx-2 shadow-sm'
              variant='primary'
              style={{
                background: '#F28500',
                borderColor: '#F28500',
                alignSelf: 'center',
              }}
              onClick={() => navigate('/insurance')}
            >
              Start Quote
            </Button>
          </Card.Body>
        </Card>
      </div>
      <StillHaveQues />
    </>
  )
}

export default InsuranceLife
