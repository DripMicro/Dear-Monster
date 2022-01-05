import React, { useEffect } from 'react';
import CurrenPageTitle from '../../components/common/CurrenPageTitle';
import ChooseDearMonster from '../../components/TrainingGround/ChooseDearMonster';
import ChooseMinion from '../../components/TrainingGround/ChooseMinion';

const TrainingGround = () => {
	const [time, setTime] = React.useState('0d 0h 0m 0s');
	const timer = () => {
		// get next 10 days from now
		const countDownDate = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
		let x = setInterval(() => {
			let now = new Date().getTime();
			let distance = countDownDate - now;
			let days = Math.floor(distance / (1000 * 60 * 60 * 24));
			let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			let seconds = Math.floor((distance % (1000 * 60)) / 1000);
			if (minutes <= 0) {
				setTime(`${seconds}s`);
			} else if (hours <= 0) {
				setTime(`${minutes}m ${seconds}s`);
			} else if (days <= 0) {
				setTime(`${hours}h ${minutes}m ${seconds}s`);
			} else {
				setTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
			}
			if (distance < 0) {
				clearInterval(x);
				setTime('EXPIRED');
			}
		}, 1000);
	};

	useEffect(() => {
		timer();
	}, []);

	return (
		<div>
			<CurrenPageTitle title='Training Ground'></CurrenPageTitle>
			<div className='center'>
					<p className='text-white mt-9 sm-fs-29 fs-21 whiteSpace-nowrap'>
						Coming Soon
					</p>
				</div>			
			{/* <div className='container center mt-8'>
				<div className='center flex-column'>
					<div className='border border-warning text-white p-2 rounded-2'>Total Rewards:</div>
					<section className='mt-5'>
						<div className='header-Connect-btn py-3 w-190px center bold fs-13 cursor'>
							Update Offchain Exp
						</div>
					</section>
					<section className='mt-5 d-flex align-items-center '>
						<div className='header-Connect-btn py-3 px-4 w-140px center bold fs-13 cursor'>
							Claim Reward
						</div>
						<div className='timerBoard w-170px   ms-5 center py-3 bold'>{time}</div>
					</section>

					<div
						className='header-Connect-btn py-3 px-4 mt-6 w-140px center bold fs-13 cursor'
						data-bs-toggle='modal'
						data-bs-target='#EarlyClaimModal'
					>
						Early claim
					</div>
					<div
						class='modal fade'
						id='EarlyClaimModal'
						tabindex='-1'
						aria-labelledby='EarlyClaimModalLabel'
						aria-hidden='true'
					>
						<div class='modal-dialog'>
							<div class='modal-content py-3 bg-dark bg-opacity-75 text-white shadow-lg'>
								<div class='modal-body p-4'>
									30% tax -Allows the user to claim rewards with a 30% penalty. Ie for 100
									rewards, 70DMS is transferred from admin wallet to user wallet.
								</div>
								<div class='modal-footer'>
									<button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>
										Close
									</button>
									<button type='button' class='btn btn-warning' data-bs-dismiss='modal'>
										Confirm
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ChooseDearMonster />
			<ChooseMinion /> */}
		</div>
	);
};

export default TrainingGround;
