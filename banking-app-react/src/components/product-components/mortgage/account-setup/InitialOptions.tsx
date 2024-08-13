import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const InitialOptions = (props: any) => {
  return (
    <>
      <h6 className='font-weight-bold'>What would you like to do?</h6>

      <a
        className='options p-4 mt-3 d-block d-flex justify-content-between'
        onClick={props.onNewHomeSelected}
      >
        <span>I'd like to buy a new home</span>
        <ArrowForwardIosIcon className='arrow-icon' />
      </a>
      <div
        className='options p-4 mt-1 d-block d-flex justify-content-between'
        onClick={props.onSwitchMortgageSelected}
      >
        <span>I'd like to switch my mortgage to IDB</span>
        <ArrowForwardIosIcon className='arrow-icon' />
      </div>
    </>
  )
}

export default InitialOptions
