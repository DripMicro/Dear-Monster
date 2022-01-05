import React from 'react';

const PostCard = ({ className, post, stepImg }) => {
	return (
		<div className={`${className}`}>
			<header className='center mb-5'>
				<div class='header-Connect-btn h-25px center px-1 w-90px fs-12'>{post.id}</div>
			</header>
			<main class='center flex-column'>
				<div>
					<img src={post.img} className='w-sm' />
				</div>
				<div class='position-relative'>
					<img
						src={stepImg}
						className='position-relative'
						style={{ transform: 'translateY(-25px)', zIndex: '-1', width: '220px' }}
					/>
				</div>
				<div
					class='findDearMonster  w-100   h-100 py-7 '
					style={{ marginTop: '-55px',width:'290px' }}
				>
					<p className='text-center mt-14px fs-18 bold'>{post.title}</p>
					<div className='center mt-5'>
						<div>
							{[...Array(post.totalRating)].map((e, i) => {
								return (
									<img
										src={
											parseInt(post.rating) <= i ? '/assets/imgs/dimStar.png' : '/assets/imgs/star.png'
										}
										className='me-2'
									/>
								);
							})}
						</div>
					</div>
					<div className='text-white center flex-column mt-5 fs-18'>
						{Object.keys(post.values).map((key, index) => {
							return (
								<div className='mb-4'>
									<span className='me-2'>{key} :</span>
									<span>{post.values[key]}</span>
								</div>
							);
						})}
					</div>
				</div>
			</main>
			<footer className='center mt-6'>
				<p class='header-Connect-btn h-40px center w-100px bold px-2'>Sell</p>
			</footer>
		</div>
	);
};

export default PostCard;
