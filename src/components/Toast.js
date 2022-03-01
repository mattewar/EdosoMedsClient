import { toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const props = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
}

export const showToast = (type, message) => {
  switch (type) {
    case 'success':
      toast.success(message, props);
      break;
    case 'warn':
      toast.warn(message, props);
      break;
    case 'error':
      toast.error(message, props);
      break;
    default:
      toast.info(message, props);
  }
};
export default function Toast() {
  return <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover={false}
  />;
}
