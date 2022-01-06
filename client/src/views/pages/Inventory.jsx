import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import CurrenPageTitle from '../../components/common/CurrenPageTitle';
import NavLinks from '../../components/Inventory/NavLinks';
import PostCard from '../../components/Inventory/PostCard';
import { usePagination } from '../../hooks/usePagination';
import { useSelector, useDispatch } from 'react-redux';
import { connectUserAction, connectUserSuccess } from './../../store/actions/auth/login';
import Web3 from 'web3';
import DearMonster from '../../contracts/DearMonster.json';
import data from "../../data/Post.json";

const Inventory = ({ match }) => {
	const [posts, setPosts] = React.useState([]);
	const { userId } = useSelector((state) => state.auth);
	const [account, setAccount] = useState();
	const [paths, setPaths] = useState([]);
	const [attributes, setAttributes] = useState([]);
	const dispatch = useDispatch();
	const history = useHistory();
	const { pageData, currentPage, previousPage, nextPage, totalPages, doPagination } =
		usePagination(posts, 6, history.location.pathname);

	const handleConnect = () => {
		dispatch(connectUserAction());
	};

	useEffect(() => {
		getCave();
  }, [window.web3])

	const getCave = async () => {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum)
			await window.ethereum.enable();
		} else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider)
			window.loaded_web3 = true
		} else {
			window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
	 }

		let web3 = window.web3
		// Load account
		let accounts = await web3.eth.getAccounts()
		setAccount(accounts[0]);

		// let networkId = await web3.eth.net.getId()
		// let DearMonsterNetwork = DearMonster.networks[networkId]
		// if (DearMonsterNetwork) {
		if (true) {
			let DearMonsterContract = new web3.eth.Contract(DearMonster.abi, "0x8bb56e7C65A2526c63b7Ff5eb3b7e53BF04549A0")
			// let DearMonsterContract = new web3.eth.Contract(DearMonster.abi, DearMonsterNetwork.address)
			var _attributes = await DearMonsterContract.methods.getAttributes().call()
			var _elementPath = await DearMonsterContract.methods.getElementPath().call()
			setPaths(_elementPath)
			setAttributes(_attributes)
		}
	};	

	function getData () {
		if (posts.length > 0) 
			return
		let _posts = []
		for (let i = 0 ; i < attributes.length; i++ ){
			for (let j = 0; j < data.length; j++) {
				if (data[j]['img'] == attributes[i][2] && attributes[i][0] == account) {
					let post = {}
					post['id'] = i + 1
					post['title'] = data[j]['title']
					post['img'] = attributes[i][2]
					post['rating'] = [...attributes][i][5]
					post['totalRating'] = 5
					post['values'] = {}
					post.values['Level'] = "1"
					post.values['EXP'] = "0"
					post.values['Element'] = "None"
					post.values['Energy'] = "2"
					// post.values['Price'] = "48000"
					post.values['OwnerID'] = `${attributes[i][0].substring(0, 4)}...${attributes[i][0].slice(-4)}`
					_posts.push(post);
				}
				
			}
			// data.map((post) => {
			// 	post['rating'] = attributes[i][5]
			// 	post.values['rating'] = attributes[i][5]
			// 	post.values['ownerId'] = `${attributes[i][0].substring(0, 4)}...${attributes[i][0].slice(-4)}`
			// 	if (post.img == attributes[i][2]) {
			// 		temp.push (post);
			// 		console.log(post['rating'])
			// 	}
			// 	// console.log(temp)
			// })
		}
		setPosts(_posts)
		// doPagination(_posts);
	}

	useEffect(() => {
		if (posts.length > 0)
		  return
		getData();
	}, [attributes])

	return (
		<div>
			<CurrenPageTitle title='Inventory'></CurrenPageTitle>
			<NavLinks match={match} />
			{posts.length > 0 ? ''  :
				<div className='container'>
					<div className='center'>
						{userId  ? (
							<p className='text-white  mt-9 fs-23 bg-dark bg-opacity-50 p-3 rounded-3 w-auto'>
								You Don't have any inventory
							</p>
						) : (
							<div>
								<p className='text-white  mt-9 fs-23 bg-dark bg-opacity-50 p-3 rounded-3 w-auto'>
									Please connect to see Inventory
								</p>
								<div
									onClick={handleConnect}
									class={` header-Connect-btn h-40px w-sm mx-auto  mt-5 center bold cursor`}
								>
									Connect
								</div>
							</div>
						)}
					</div>
				</div>
			}
			<div className='container mt-10 px-md-auto px-8'>
				<div className='row row-cols-lg-3 row-cols-md-2 gx-10'>
					{posts.map((post) => {
						return (
							<PostCard post={post} stepImg='/assets/imgs/droganBord.png' className='mb-9' />
						);
					})}
				</div>
				{/* { posts.length == 0 ? (
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
						)}				 */}
			</div>
		</div>
	);
};

export default Inventory;
