import React from 'react'

const PageLoading = () => {
    return (
			<div className='position-fixed loading-on-load text-warning  vw-100 vh-100 center'>
				<div class='spinner-border text-warning' role='status'>
					<span class='visually-hidden text-warning'>Loading...</span>
				</div>
			</div>
		);
}

export default PageLoading
