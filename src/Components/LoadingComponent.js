import 'react-loader-spinner'
import { MutatingDots } from 'react-loader-spinner'

function LoadingComponent() {
   return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
  </div>
   )
}

export default LoadingComponent