import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { connectUserAction } from '../../store/actions/auth/login';

const PostCard = ({ className, post, stepImg }) => {
	const {userId} = useSelector(state => state.auth)
	const dispatch= useDispatch();


	return (
		<div className={`${className}`}>
			<header className='center mb-3'>
				<div class='header-Connect-btn h-25px center px-1 w-90px fs-12'>{post?.id}</div>
			</header>
			<main class='center flex-column'>
				<div>
					<img src={post?.img} className='w-md2' />
				</div>
				<div class='findDearMonster w-100   h-100 py-4 ' style={{ marginTop: '-55px' }}>
					<p className='text-center mt-47px fs-18 bold'>{post?.title}</p>
					<div className='center mt-5'>
						<div>
							{[...Array(post?.totalRating)].map((e, i) => {
								return (
									<img
										src={
											post?.rating <= i ? '/assets/imgs/dimStar.png' : '/assets/imgs/star.png'
										}
										className='me-2'
									/>
								);
							})}
						</div>
					</div>
					<div className='text-white center flex-column mt-5 fs-18'>
						{Object.keys(post?.values).map((key, index) => {
							return (
								<div className='mb-4'>
									<span className='me-2'>{key} :</span>
									<span>{post?.values[key]}</span>
								</div>
							);
						})}
					</div>
					<div className='center center mt-5 mb-4  fs-19 text-white'>
						<p className='fs-30'>{post?.price}</p>
					</div>
				</div>
			</main>
			<footer className='center mt-6'>
				{userId ? (
					<div class='header-Connect-btn h-40px center w-100px px-2 bold  cursor'>
						Sell
					</div>
				) : (
					<div
						class='header-Connect-btn h-40px center w-100px px-2 bold  cursor'
						onClick={() => {
							dispatch(connectUserAction());
						}}
					>
						Connect
					</div>
				)}
			</footer>
		</div>
	);
};

export default PostCard;
