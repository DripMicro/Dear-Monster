import React, { useEffect } from 'react'


const FindMonster = ({
	filterData,
	sortData,
	searchData,
	clearSearchData,
	clearFilterData,
}) => {
	const [rating, setRating] = React.useState([]);
	const [levels, setLevels] = React.useState([]);
	const [isSearch, setIsSearch] = React.useState(false);
	const [isFilter, setIsFilter] = React.useState(false);
	const [searchValue, setSearchValue] = React.useState('');
	const addRating = (e) => {
		setRating(rating.concat(e.target.value));
	};

	const removeRating = (e) => {
		const newRating = rating.filter((rating) => rating !== e.target.value);
		setRating(newRating);
	};

	const addLevels = (e) => {
		setLevels(levels.concat(e.target.value));
	};

	const removeLevels = (e) => {
		const newLevels = levels.filter((level) => level !== e.target.value);
		setLevels(newLevels);
	};

	const handleFiltering = (e) => {
		e.preventDefault();
		filterData({ rating, level: levels });
		setIsFilter(true);
	};

	const handleSearch = (e) => {
		e.preventDefault();
		searchData(e.target.value);
		setSearchValue(e.target.value);
		if (e.target.value) {
			setIsSearch(true);
		} else {
			clearSearchData();
			setIsSearch(false);
		}
	};

	return (
		<div class='findDearMonster py-6'>
			<div class='px-5'>
				<div class='mt-8 center fw-bold fw-24 bold'>Find Your DearMonster</div>
			</div>
			<section className='center flex-column mt-9'>
				<div class='mb-3 w-75 position-relative'>
					<input
						type='email'
						class='form-control'
						id='exampleFormControlInput1'
						placeholder='Search by ID'
						value={searchValue}
						onChange={handleSearch}
					/>
					<div class='translate-right-middle end-5 mt-1'>
						{isSearch ? (
							<i
								class='fas fa-times'
								onClick={() => {
									clearSearchData();
									setIsSearch(false);
									setSearchValue('');
								}}
							></i>
						) : (
							<i class='fas fa-search'></i>
						)}
					</div>
				</div>
				<div></div>
				<select
					class='form-select w-75 mt-1'
					onChange={(e) => {
						sortData(e.target.value, 'rating');
					}}
				>
					<option selected value='all'>
						Sort by All
					</option>
					<option value='asc'>Top Price</option>
					<option value='desc'>Lowest Price</option>
				</select>
			</section>
			<div class='ps-8 mt-6'>
				<p class='text-white mb-5'>Star Rating</p>
				{[...Array(3).keys()].map((star, i) => {
					return (
						<div class='mb-4'>
							<div class='form-check'>
								<input
									class='form-check-input p-2'
									type='checkbox'
									value={i + 1}
									onChange={(e) => {
										if (e.target.checked) {
											addRating(e);
										} else {
											removeRating(e);
										}
									}}
									id={i}
								/>
								<label class='form-check-label ms-3' for={i}>
									{[...Array(i + 1).keys()].map((star, i) => {
										return <img src='/assets/imgs/Star.png' alt='' className='me-2' />;
									})}
								</label>
							</div>
						</div>
					);
				})}
			</div>
			<section class='ps-8 mt-6 text-white'>
				<p>Level</p>

				<div class='row w-85 mt-5'>
					{[...Array(3).keys()].map((star, i) => {
						return (
							<div class='col-4 mb-3'>
								<div class='form-check'>
									<input
										class='form-check-input p-2'
										type='checkbox'
										value={i + 1}
										onChange={(e) => {
											if (e.target.checked) {
												addLevels(e);
											} else {
												removeLevels(e);
											}
										}}
										id={i}
									/>
									<label class='form-check-label ms-2' for={i}>
										{i + 1}
									</label>
								</div>
							</div>
						);
					})}
				</div>
			</section>

			<footer class='mt-6'>
				<div
					class='filterCheckBtn  w-140px mx-auto py-3 center bold cursor'
					onClick={handleFiltering}
				>
					Filter
				</div>
				{isFilter && (
					<button
						className='btn center mx-auto mt-5 btn-outline-secondary'
						onClick={() => {
							setIsFilter(false);
							clearFilterData();
							setLevels([]);
							setRating([]);
						}}
					>
						Clear Filter
					</button>
				)}
			</footer>
		</div>
	);
};




export default FindMonster
