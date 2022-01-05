import React from 'react';

const MinionCard = ({ className, post, stepImg, handleFight }) => {
	return (
		<div className={`${className}`}>
			<main class='center flex-column'>
				<div>
					<img src={post.img} className='w-md h-lg' />
				</div>
				<div
					class='findDearMonster h-md2 pt-4 pb-5 '
					style={{ marginTop: '-50px', width: '300px' }}
				>
					<p className='text-center mt-3  fs-18 bold'>{post.title}</p>
					<div className='text-white center flex-column mt-8 fs-15'>
						{Object.keys(post.values).map((key, index) => {
							const key2 = key.split('_').join(' ');
							return (
								<div className='mb-5'>
									<span className='me-2'>{key2} :</span>
									<span>{post.values[key]}</span>
								</div>
							);
						})}
					</div>
				</div>
			</main>
			<footer className='center mt-5 '>
				<div
					class='header-Connect-btn h-40px center w-100px px-2 bold cursor'
					data-bs-toggle='modal'
					data-bs-target='#exampleModal'
					onClick={()=>{
						handleFight()
					}}
				>
					Fight
				</div>
			</footer>
		</div>
	);
};

export default MinionCard;
