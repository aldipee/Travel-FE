import React from 'react'

import { Spinner } from 'reactstrap'

const ComponentLoading = () => {
  return (
    <div className="text-center">
      <Spinner style={{ width: '4rem', height: '4rem' }} />{' '}
    </div>
  )
}
export default ComponentLoading
