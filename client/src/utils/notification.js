import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

//html parser
export function notification(
	obj = { type: 'info', message: 'Message', icon: '', position: 'right' },
) {
	const notify = () => {
		let ob = { icon: obj.icon, position: toast.POSITION.BOTTOM_RIGHT };

		if (obj.position == 'left') {
			ob['position'] = toast.POSITION.BOTTOM_LEFT;
		}

		if (obj.type == 'info') {
			return toast.info(obj.message, ob);
		}

		if (obj.type == 'error') {
			return toast.error(obj.message, ob);
		}

		if (obj.type == 'success') {
			return toast.success(obj.message, ob);
		}

		if (obj.type == 'warn') {
			return toast.warn(obj.message, ob);
		}
	};
	return notify;
}
