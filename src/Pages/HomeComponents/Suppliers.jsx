import React from 'react'
import './Suppliers.css'

const Suppliers = ({regionFlag, regionName, shopName}) => {
  return (
    <>
      <div className="supplierCard">
        <img src={regionFlag} alt={regionName} />
        <div>
            <span className='regionName'>{regionName}</span>
            <span className='shopName'>{shopName}</span>
        </div>
      </div>
    </>
  )
}

export default Suppliers
