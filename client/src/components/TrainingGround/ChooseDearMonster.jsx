import React, {  } from 'react';
import PostCard from './PostCard';
import data from "../../data/Post.json";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';


const ChooseDearMonster = () => {
    return (
			<div>
				<div className='center'>
					<p className='text-white mt-9 sm-fs-29 fs-21 whiteSpace-nowrap'>
						CHOOSE A DEARMONSTER
					</p>
				</div>
				<div className='mt-6'>
					<div className=''>
						<Splide
							className='container'
							options={{
								rewind: true,
								gap: '8rem',
								perPage: data.length == 1 ? 1 : 3,
								pagination: false,
								drag: false,
								perMove: 3,
								breakpoints: {
									1100: {
										perPage: 2,
									},
									680: {
										perPage: 1,
									},
								},
								classes: {
									arrows: '',
									arrow: `splide__arrow text-white ${data.length == 1 ? 'd-none' : ''}`,
									prev: 'splide__arrow--prev your-class-prev border rounded-circle p-2 end-0',
									next: 'splide__arrow--next  border rounded-circle p-2 ',
								},
							}}
						>
							{data.map((post, i) => {
								return (
									<SplideSlide>
										<PostCard
											post={post}
											stepImg='/assets/imgs/droganBord.png'
										/>
									</SplideSlide>
								);
							})}
						</Splide>
					</div>
				</div>
			</div>
		);
}

export default ChooseDearMonster
