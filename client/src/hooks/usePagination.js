import React from 'react';
import { useHistory } from 'react-router';

export const usePagination = (data, itemsPerPage) => {
	const history = useHistory();
	const [totalData, setTotalData] = React.useState(data);
	const [totalItemsPerPage, setTotalItemsPerPage] = React.useState(itemsPerPage);
	const [currentPage, setCurrentPage] = React.useState(1);
	const [pageData, setPageData] = React.useState([]);
	const [totalPages, setTotalPages] = React.useState(0);

    const paginate = (pageNumber) => {
		
		setCurrentPage(pageNumber);
		setPageData(
			totalData.slice((pageNumber - 1) * totalItemsPerPage, pageNumber * totalItemsPerPage),
			);
			// pageNumber && history.push(`/trading-post?page=${pageNumber}&limit=${itemsPerPage}`);
	};

	const previousPage = () => {
		if (currentPage > 1) {
			paginate(currentPage - 1);
		}
	};

	const nextPage = () => {
		console.log(currentPage, totalData.length);
		if (currentPage < Math.ceil(totalData.length / totalItemsPerPage)) {
			paginate(currentPage + 1);
		}
	};

	const firstPage = () => {
		paginate(1);
	};

	const lastPage = () => {
		paginate(Math.ceil(totalData.length / totalItemsPerPage));
	};

	const doPagination = (data, itemsPerPage,currentPage) => {
		if(data==null){
			setTotalData([]);
			setTotalPages(0);
			setPageData([]);
			setCurrentPage(1);
		}else{	
		data.length > 0 && setTotalData(data);
		data.length > 0 && setPageData(data.slice(0, totalItemsPerPage));
		const totalPages = Math.ceil(data.length / totalItemsPerPage);
		data.length > 0 && setTotalPages(totalPages);
		itemsPerPage && setTotalItemsPerPage(itemsPerPage);
		currentPage && setCurrentPage(currentPage);

		}

	};

	React.useEffect(() => {
		const totalPages = Math.ceil(totalData.length / totalItemsPerPage);
		setTotalPages(totalPages);
		setPageData(totalData.slice(0, totalItemsPerPage));
	}, [totalPages, totalItemsPerPage]);

	return {
		pageData,
		currentPage,
		previousPage,
		nextPage,
		firstPage,
		lastPage,
		doPagination,
		totalPages,
	};
};
