import React, {useState, } from 'react';
import FindMonster from '../../components/TradingPost/FindMonster';
import PostCard from '../../components/postCard/PostCard';
import { useHistory } from 'react-router';
import CurrenPageTitle from '../../components/common/CurrenPageTitle';
import data from '../..//data/Post.json';
import { usePagination } from '../../hooks/usePagination';

const TradingPost = ({}) => {
	const history = useHistory();
	const [filterValues, setFilterValues] = useState({});
	const [error, setError] = useState('');
	const { pageData, currentPage, previousPage, nextPage, totalPages, doPagination } =
		usePagination(data, 6, history.location.pathname);


	const sortData = (order, sortBy) => {
		const sortingData = data.sort((a, b) => {
			if (order === 'desc') {
				return +a[sortBy] - +b[sortBy];
			} else if (order == 'asc') {
				return +b[sortBy] - +a[sortBy];
			}
			return 0;
		});
		doPagination(sortingData);
	};

	const filterData = (filteringValues) => {
		setFilterValues(filteringValues);
	};

	const clearFilterData = () => {
		setFilterValues({});
		doPagination(data);
	};

	const searchData = (searchValue) => {
		const searchData = [...data].filter((e) =>
			'#' == searchValue[0]
				? e.id.toLowerCase() == searchValue.slice(1).toLowerCase()
				: e.id.toLowerCase() == searchValue.toLowerCase(),
		);
		if (searchData.length === 0) {
			setError('No data found');
			doPagination(null);
		} else {
			doPagination(searchData);
		}
	};

	const clearSearchData = () => {
		doPagination(data);
	};

	React.useEffect(() => {
		if (Object.keys(filterValues).length !== 0) {
			const filterdata = data.filter((item) => {
				const isTrue = Object.keys(filterValues).filter((key) => {
					return filterValues[key] == item[key];
				});
				return isTrue.length >= 1 && item;
			});
			doPagination(filterdata);
		}
	}, [filterValues]);

	return (
		<div>
			<CurrenPageTitle title='Trading Post'></CurrenPageTitle>
			<div className='center'>
					<p className='text-white mt-9 sm-fs-29 fs-21 whiteSpace-nowrap'>
						Coming Soon
					</p>
				</div>
			{/* <div className='mt-lg-9 mt-7 container '>
				<div class='row  px-md-auto justify-content-center'>
					<div class='col-md-5 col-lg-3 col-12'>
						<FindMonster
							filterData={filterData}
							sortData={sortData}
							searchData={searchData}
							clearSearchData={clearSearchData}
							clearFilterData={clearFilterData}
						/>
					</div>
					<div class='col-lg-9 col-md-7 col-12'>
						<div class='px-md-0'>
							<section className='row row-cols-lg-3  gx-8 mt-9 	mt-md-0 '>
								{error && pageData.length == 0 ? (
									<div className='col-12 center w-100 text-white mt-5'>
										<h3>{error}</h3>
									</div>
								) : (
									pageData.map((post) => {
										return (
											<PostCard
												post={post}
												stepImg='/assets/imgs/droganBord.png'
												className='mb-9'
											/>
										);
									})
								)}
							</section>
						</div>
						{'error' && pageData.length == 0 ? (
							''
						) : (
							<footer className='center pb-8 pt-4'>
								<img
									src='/assets/imgs/ArrowLeft.png '
									className='cursor'
									onClick={previousPage}
								/>
								<p className='text-white fs-22 mx-5'>
									{currentPage}/{totalPages}
								</p>
								<img src='/assets/imgs/ArrowRight.png' className='cursor' onClick={nextPage} />
							</footer>
						)}
					</div>
				</div>
			</div> */}
		</div>
	);
};

export default TradingPost;
