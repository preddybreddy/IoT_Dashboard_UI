import 'react-loader-spinner'
import { MutatingDots } from 'react-loader-spinner'

function LoadingComponent() {
   return (
    <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only"></span>
      </div>
  </div>
   )
}

export default LoadingComponent