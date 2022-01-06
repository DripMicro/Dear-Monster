import { CONNECT_USER_START, CONNECT_USER_SUCCESS, CONNECT_USER_ERROR, UPDATE_USER_BALANCE } from '../../types';
import {notification} from "../../../utils/notification";

export const connectUserStart = () => ({
	type: CONNECT_USER_START,
});

export const connectUserSuccess = (user) => ({
	type: CONNECT_USER_SUCCESS,
	payload: user,
});

export const connectUserError = (error) => ({
	type: CONNECT_USER_ERROR,
	payload: error,
});

export const updateUserBalance = (bal) => ({
	type: UPDATE_USER_BALANCE,
	balance: bal,
});

export const connectUserAction = () => {
	return (dispatch) => {
		dispatch(connectUserStart());
		if (window.ethereum) {
			window.ethereum.enable().then(() => {
				window.ethereum.autoRefreshOnNetworkChange = false;
				window.ethereum.request({ method: 'eth_accounts' }).then((res) => {
                    if(res[0]){
						let notify = notification({
							type: 'success',
							message: 'MetaMask connected successfully',
						});
						notify();
						setTimeout(() => {
							// window.location.reload();
						}, 500);
                    }else{
                        dispatch(connectUserError('connection not successful'));
                    }
                });
			});
		} else {
			let notify = notification({
				type: 'error',
				message: 'Please install MetaMask to continue',
			});
			notify();
			console.log('');
		}
	};
};
