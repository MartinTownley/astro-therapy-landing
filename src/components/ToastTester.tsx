import React from 'react'
import { toast } from 'sonner'

function ToastTester() {
  return (
    <div>
      <button onClick={() => toast('Nicely Toasted.')}>TOAST ME</button>
    </div>
  )
}

export default ToastTester
