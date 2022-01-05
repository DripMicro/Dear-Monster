import React from 'react'
import { Link } from 'react-router-dom';

const NavLinks = ({match}) => {
    return (
			<nav class='text-white center mt-5 fs-17 border-bottom border-warning border-2 py-4'>
				<Link class='text-white me-7 center flex-column position-relative' to='/inventory/all'>
					<p>All</p>
					<img
						src='/assets/imgs/arrow.png'
						className={`position-absolute ${
							match.params.slug == 'all' ? 'd-flex' : 'd-none'
						} `}
						style={{ top: '43px' }}
						alt=''
					/>
				</Link>
				<Link
					class='text-white me-7 center flex-column position-relative'
					to='/inventory/trading'
				>
					<p>In Trading Post</p>
					<img
						src='/assets/imgs/arrow.png'
						className={`position-absolute ${
							match.params.slug == 'trading' ? 'd-flex' : 'd-none'
						} `}
						style={{ top: '43px' }}
						alt=''
					/>
				</Link>
			</nav>
		);
}

export default NavLinks
