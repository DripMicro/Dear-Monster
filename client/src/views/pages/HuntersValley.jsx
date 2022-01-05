import React, { useEffect, useState } from 'react';
import CurrenPageTitle from '../../components/common/CurrenPageTitle';
import { useSelector } from 'react-redux';
import { connectUserAction, connectUserSuccess, updateUserBalance } from '../../store/actions/auth/login';
import { useDispatch } from 'react-redux';
import Web3 from 'web3';
import {notification} from "../../utils/notification";
import data from "../../data/Post.json";
import DearMonster from '../../contracts/DearMonster.json';
import DMSToken from "../../contracts/DMSToken.json";

const HuntersValley = () => {
	const { userId } = useSelector((state) => state.auth);
	const [quantity, setQuantity] = useState(1);
	const [price, setPrice] = useState(14800);
	const [caveLimit, setCaveLimit] = useState(30);
	const [account, setAccount] = useState();
	const [isOwner, setIsOwner] = useState(false);
	const [path, setPath] = useState([]);
	const [ratings, setRatings] = useState([]);
	const dispatch = useDispatch();
	const handleConnect = () => {
		dispatch(connectUserSuccess(account))
	};
	const updateBalance = (bal) => {
		dispatch(updateUserBalance(bal));
	}

	useEffect(async () => {
		console.log('starting of the web site')
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum)
			await window.ethereum.enable();
		}
		else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider)
			window.loaded_web3 = true
		} 
		else {
			window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
		}
		let web3 = window.web3
		// Load account
		let accounts = await web3.eth.getAccounts()
		setAccount(accounts[0]);

		let DearMonsterContract = new web3.eth.Contract(DearMonster.abi, "0x8bb56e7C65A2526c63b7Ff5eb3b7e53BF04549A0")
		console.log(DearMonsterContract)

		var _owner = await DearMonsterContract.methods.owner().call()
		setIsOwner(_owner === accounts[0])
		console.log('=============  owner address =======\n', _owner)	
		console.log('=============  owner address =======\n', accounts[0])	
	}, window.web3)

	const handlePriceChange = async (e) => {
		if (!userId) return

		const { value } = e.target;
		setPrice(value);
		
		let web3 = window.web3
		let accounts = await web3.eth.getAccounts()	
		let DearMonsterContract = new web3.eth.Contract(DearMonster.abi, "0x8bb56e7C65A2526c63b7Ff5eb3b7e53BF04549A0")
		await DearMonsterContract.methods.setPrice(parseInt(value)).send({from:accounts[0]});	
	}
	const handleCaveLimitChange = async (e) => {
		if (!userId) return
		
		const { value } = e.target;
		setCaveLimit(value);

		let web3 = window.web3
		let accounts = await web3.eth.getAccounts()

		let DearMonsterContract = new web3.eth.Contract(DearMonster.abi, "0x8bb56e7C65A2526c63b7Ff5eb3b7e53BF04549A0")
		await DearMonsterContract.methods.setMaxSupply(parseInt(value)).send({from:accounts[0]});	
	}

	const handleQuantityChange = (e) => {
		const { value } = e.target;
		setQuantity(value);
	}

	const handlePurchase = async () => {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum)
			await window.ethereum.enable();
		}
		else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider)
			window.loaded_web3 = true
		} 
		else {
			window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
		}
		getPath()

		let web3 = window.web3
		// Load account
		let accounts = await web3.eth.getAccounts()
		setAccount(accounts[0]);

		let networkId = await web3.eth.net.getId()
		// let DearMonsterNetwork = DearMonster.networks[networkId]
		// let DMSTokenNetwork = DMSToken.networks[networkId]
		// if (DearMonsterNetwork && DMSTokenNetwork) {
	  if (true) {
			let DearMonsterContract = new web3.eth.Contract(DearMonster.abi, "0x8bb56e7C65A2526c63b7Ff5eb3b7e53BF04549A0")
			let DMSTokenContract = new web3.eth.Contract(DMSToken.abi, "0xc69A2465d0C4f33748F6C4baFCb9332D2a219718")
			// let DearMonsterContract = new web3.eth.Contract(DearMonster.abi, DearMonsterNetwork.address)
			// let DMSTokenContract = new web3.eth.Contract(DMSToken.abi, DMSTokenNetwork.address)			

			var isMaxSupply = await DearMonsterContract.methods.checkMaxSupply().call()
			var maxSupply = await DearMonsterContract.methods.getMaxSupply().call()
			var price = await DearMonsterContract.methods.getPrice().call()
			var totalSupply = await DearMonsterContract.methods.totalSupply().call()
			if (isMaxSupply) {
				let notify = notification({
					type: 'error',
					message: 'Not enough NFTs!',
				});
				notify();				
				return
			}

			// var _owner = await DearMonsterContract.methods.owner().call()
			DMSTokenContract.methods.balanceOf(accounts[0]).call().then(async function (balance) {
        console.log('==========balance==========', balance)
				
				var tokensOfOwner = await DearMonsterContract.methods.tokensOfOwner(accounts[0]).call()
				console.log('=========== tokenOfOwner =========', tokensOfOwner)
				var _amount = Number(quantity * price * 10 ** 18);
				var amount = _amount.toLocaleString('fullwide', {useGrouping:false})
				if (_amount >= balance) {
					let notify = notification({
						type: 'error',
						message: 'Insufficient fund!',
					});
					notify();				
					return				
				}
				await DMSTokenContract.methods.approve(DearMonsterContract._address, web3.utils.toBN(amount.toString())).send({from:accounts[0]});
				await DearMonsterContract.methods.mintDearMonster(path, ratings, web3.utils.toBN(amount.toString())).send({from:accounts[0]});
				var _elementPath = await DearMonsterContract.methods.getElementPath().call()
				console.log(_elementPath)
				var _attributes = await DearMonsterContract.methods.getAttributes().call()
				console.log(_attributes)	
				updateBalance(1111)			
     	})
			
		}
	}

	useEffect(() => {
		getPath();
	}, [quantity])

	function getPath () {
		let paths = [];
		let _ratings = [];
		for (let i = 0; i < quantity; i++){
			let rand = parseInt(Math.random()*600);
			if (rand < 6) {
				paths[i] = rand % 2 ? data[18].img : data[21].img;
				_ratings[i] = 5;
			} else if (rand < 24) {
				paths[i] = rand % 2 ? data[0].img : data[24].img;
				_ratings[i] = 4;
			} else if (rand < 84) {
				paths[i] = rand % 2 ? data[6].img : data[12].img;
				_ratings[i] = 3;
			} else if (rand < 288) {
				paths[i] = rand % 2 ? data[3].img : data[9].img;
				_ratings[i] = 2;
			} else if (rand < 600) {
				paths[i] = rand % 2 ? data[15].img : data[27].img;
				_ratings[i] = 1;
			}
		}
		setPath(paths)
		setRatings(_ratings)
	}


	return (
		<div>
			<CurrenPageTitle title='Hunter’s Valley'></CurrenPageTitle>
			<div className='container center mt-6'>
				<div class='discoveryCaveBg py-2 w-md-lg2 w-md2 mb-8'>
					<div class='center'>
						<img src='/assets/gif/Cave Animated.gif' alt='' class='w-75 mt-7' />
					</div>
					<div class='center fs-19 flex-column text-white'>
						<p class='mt-2 mb-6'>Discovery Cave</p>
						<div class='d-flex justify-content-between w-60 mb-4'>
							<p>Price</p>
							{isOwner ? 
								<div class='d-flex align-items-center'>
									<img src='/assets/imgs/coin.png' className='w-30px me-1' />
									<input
										type='number'
										name=''
										className='form-control  w-100px'
										placeholder='1 to 1000000'
										id=''
										min='1'
										max='1000000'
										defaultValue="14800"
										onChange={handlePriceChange}
									/>
								</div>
								: 
								<div class='d-flex align-items-center'>
									<img src='/assets/imgs/coin.png' className='w-30px me-1' />
									<p>14,800</p>
								</div>
							}
							

						</div>
						{isOwner ? 
							<div class='d-flex justify-content-between w-60 mb-4'>
								<p>Change cave limit</p>
								<div class='d-flex align-items-center'>
									<input
										type='number'
										name=''
										className='form-control  w-100px'
										placeholder='30 to 100'
										id=''
										min='30'
										max='100'
										defaultValue="30"
										onChange={handleCaveLimitChange}
									/>
								</div>
							</div> 
							: ''}
						
						<div className='d-flex justify-content-between mb-6 w-60 align-items-center'>
							<p>Select quantity</p>
							<input
								type='number'
								name=''
								className='form-control  w-100px'
								placeholder='1 to 10'
								id=''
								min='1'
								max='10'
								defaultValue='1'
								onChange={handleQuantityChange}
							/>
						</div>	
					</div>
					<footer className='center mt-6 flex align-items-center pb-4 mb-4'>
						{userId ? (
							<div>
								<div className='header-Connect-btn h-40px center w-100px px-4 fs-16 bold cursor'
									onClick={handlePurchase}
								>
									Purchase
								</div>
								{/* <div className='header-Connect-btn h-40px center w-100px px-4 fs-16 bold cursor'
									// style='margin-top: 15px;'
									onClick={handlePurchase}
								>
									Purchase
								</div>	 */}
							</div>						
						) : (
							<div
								className='header-Connect-btn h-40px center w-100px px-4 fs-16 bold cursor'
								onClick={handleConnect}
							>
								Connect
							</div>
						)}
					</footer>
				</div>
			</div>
		</div>
	);
};

export default HuntersValley;
