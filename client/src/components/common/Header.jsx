import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { NavbarRoutes } from '../../routes/';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { connectUserAction, connectUserSuccess } from '../../store/actions/auth/login';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import evmChains from 'evm-chains';
import Fortmatic from 'fortmatic';
import DMSToken from "../../contracts/DMSToken.json";

const Header = () => {
	const [active, setActive] = useState(false);
	const [blance, setBlance] = useState(0);

	const dispatch = useDispatch();
	const { userId } = useSelector((state) => state.auth);
	const { balance } = useSelector((state) => state.auth);
	const [account, setAccount] = useState([]);
	let [provider, setProvider] = useState(null);
	const [web3, setWeb3] = useState(0);
	const [web3Modal, setWeb3Modal] = useState(null);
	const [walletConnected, setWalletConnected] = useState(false);

	useEffect(async () => {
		init();
	}, []);

	useEffect(async () => {
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
		let accounts = await web3.eth.getAccounts()
		let networkId = await web3.eth.net.getId()
		// let DMSTokenNetwork = DMSToken.networks[networkId]
		let DMSTokenContract = new web3.eth.Contract(DMSToken.abi, "0xc69A2465d0C4f33748F6C4baFCb9332D2a219718")	
		DMSTokenContract.methods.balanceOf(accounts[0]).call().then(async function (bal) {
			setBlance(bal / (10**18));
		})		
	}, [userId, balance]);
	
	function init() {
		console.log("Initializing example");
		console.log("WalletConnectProvider is", WalletConnectProvider);
		console.log("Fortmatic is", Fortmatic);
		console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);
	
		// Tell Web3modal what providers we have available.
		// Built-in web browser provider (only one can exist as a time)
		// like MetaMask, Brave or Opera is added automatically by Web3modal
		const providerOptions = {
			walletconnect: {
				package: WalletConnectProvider,
				options: {
				}
			}
		};
	
		let web3_Modal = new Web3Modal({
			cacheProvider: false, // optional
			providerOptions, // required
			disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
		});

		setWeb3Modal(web3_Modal);
	
		console.log("Web3Modal instance is", web3Modal);
	}

	async function fetchAccountData() {

		// // Get a Web3 instance for the wallet
		const web3 = new Web3(provider);
		setWeb3(web3);	
	
		// // Get list of accounts of the connected wallet
		const accounts_temp = await web3.eth.getAccounts();
		
	
		// const tokenInstance_temp = new web3.eth.Contract(
		// 	BVToken.abi,
		// 	BVToken.networks[networkId_temp] && BVToken.networks[networkId_temp].address,
		// );
		// tokenInstance_temp.options.address = "0xaBAf0eDE82Db96fcFee3091d11c6c35D60EF5463";
		// setTokenInstance(tokenInstance_temp);

		// const publicSaleInstance_temp = new web3.eth.Contract(
		// 	PublicSale.abi,
		// 	PublicSale.networks[networkId_temp] && PublicSale.networks[networkId_temp].address,
		// );
		// console.log(2)
		// publicSaleInstance_temp.options.address = "0x018c09FCe2357C505c3890e15906194e3f656fB4";
		// setPublicSaleInstance(publicSaleInstance_temp);
		// console.log(publicSaleInstance_temp)
	
		// // MetaMask does not give you all accounts, only the selected account
		console.log("Got accounts", accounts_temp);
		setAccount(accounts_temp[0])
		dispatch(connectUserSuccess(accounts_temp[0]))
		// // Go through all accounts and get their ETH balance
		// const rowResolvers = accounts.map(async (address) => {
		// 	const balance = await web3.eth.getBalance(address);
		// 	// ethBalance is a BigNumber instance
		// 	// https://github.com/indutny/bn.js/
		// 	const ethBalance = web3.utils.fromWei(balance, "ether");
		// 	const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);
		// 	// Fill in the templated row and put in the document
		// 	// const clone = template.content.cloneNode(true);
		// 	// clone.querySelector(".address").textContent = address;
		// 	// clone.querySelector(".balance").textContent = humanFriendlyBalance;
		// 	// accountContainer.appendChild(clone);
		// 	console.log(address);
		// 	console.log(humanFriendlyBalance);
		// });
	
		// // Because rendering account does its own RPC commucation
		// // with Ethereum node, we do not want to display any results
		// // until data for all accounts is loaded
		// await Promise.all(rowResolvers);
		// // Display fully loaded UI for wallet data
		// // document.querySelector("#prepare").style.display = "none";
		// // document.querySelector("#connected").style.display = "block";
		setWalletConnected(true);
	}
	
	async function refreshAccountData() {

		// If any current data is displayed when
		// the user is switching acounts in the wallet
		// immediate hide this data
		// document.querySelector("#connected").style.display = "none";
		// document.querySelector("#prepare").style.display = "block";
		setWalletConnected(false);
		// Disable button while UI is loading.
		// fetchAccountData() will take a while as it communicates
		// with Ethereum node via JSON-RPC and loads chain data
		// over an API call.
		// document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
		await fetchAccountData();
		// document.querySelector("#btn-connect").removeAttribute("disabled")
	}



	async function onConnect() {

		console.log("Opening a dialog", web3Modal);
		try {
			provider = await web3Modal.connect();
		} catch(e) {
			console.log("Could not get a wallet connection", e);
			return;
		}
		console.log(provider);
		setProvider(provider);
		console.log(provider);
		console.log('provider accounts changed')
		// Subscribe to accounts change
		provider.on("accountsChanged", (accounts) => {
			fetchAccountData();
		});
		console.log('provider chain changed')
		// Subscribe to chainId change
		provider.on("chainChanged", (chainId) => {
			fetchAccountData();
		});
		console.log('provider network changed')
		// Subscribe to networkId change
		provider.on("networkChanged", (networkId) => {
			fetchAccountData();
		});
	
		await refreshAccountData();
	}

	async function onDisconnect() {

		console.log("Killing the wallet connection", provider);
	
		// TODO: Which providers have close method?
		if(provider.close) {
			await provider.close();
	
			// If the cached provider is not cleared,
			// WalletConnect will default to the existing session
			// and does not allow to re-scan the QR code with a new wallet.
			// Depending on your use case you may want or want not his behavir.
			await web3Modal.clearCachedProvider();
			setProvider(null);
		}
	
		setWalletConnected(false);
		dispatch(connectUserSuccess(null))
	}

	return (
		<section>
			<section className='container d-flex py-4 justify-content-between  align-items-center'>
				<Link to='/'>
					<img src='/assets/imgs/header/logo.png' alt='' className='w-90px' />
				</Link>
				<button className='btn d-lg-none d-flex' onClick={() => setActive(true)}>
					<img src='/assets/imgs/Hamburger.png' className='w-35px' alt='' />
				</button>
				<div
					className={`${
						active
							? 'position-fixed bg-dark top-0 w-100 w-100 start-0 vh-lg-auto vh-100'
							: 'd-none d-lg-flex align-items-center '
					} `}
					style={{ zIndex: '999' }}
				>
					<button
						className={`${active && 'd-flex-imp'} d-none btn m-3 me-2`}
						onClick={() => setActive(false)}
					>
						<img src='/assets/imgs/cancel.png' className='w-35px' alt='' />
					</button>
					<div
						className={`${
							active && 'show-navbar flex-lg-column mt-lg-8'
						} w-lg-auto d-lg-flex d-none flex-lg-row flex-column w-100 mt-8 mt-lg-5 justify-content-between align-items-center`}
					>
						{NavbarRoutes.map((route) => {
							return (
								<Link
									to={route.pathForNavabr}
									class={`header-btn text-warning ${!active && 'me-4'} w-auto mb-5`}
									onClick={() => setActive(false)}
								>
									<span className='mx-2'>{route.title}</span>
								</Link>
							);
						})}
					</div>
				</div>

				<div className='d-lg-flex d-none justify-content-between align-items-center'>
					<img src='/assets/imgs/coin.png' className='w-50px' />
					{userId && (
						<div class='dms-block h-40px ms-4 center px-2'>
							<div className='dms-btn w-100 me-2  center'>{blance}</div>
							<div className='dms-btn w-100  center'>DMS</div>
						</div>
					)}
					{!userId && (
						<div
							class={`${
								userId ? 'w-25' : 'px-5'
							} header-Connect-btn h-40px ms-4 center bold cursor`}
							onClick={onConnect}
						>
							Connect
						</div>
					)}
					{userId && (
						<div>
							<div class='dropdown ms-4'>
								<button
									class='btn dropdown-toggle fs-13 w-105px h-35px rounded-3 text-white border border-warning center'
									type='button'
									id='dropdownMenuButton1'
									data-bs-toggle='dropdown'
									aria-expanded='false'
								>
									{userId && `${account.substring(0, 4)}...${account.slice(-4)}`}
								</button>
								<ul
									class='dropdown-menu  w-sm dropdown-menu-end '
									aria-labelledby='dropdownMenuButton1'
								>
									<li>
										<a class='dropdown-item py-5 text-whit cursor py-7px' href='#'>
											Wallet
										</a>
									</li>
									<li>
										<a class='dropdown-item py-5 text-whit cursor py-7px' href='#'>
											Transactions
										</a>
									</li>
									<li>
										<p class='dropdown-item py-5 text-whit cursor py-7px' href='#'>
											Your NFTs
										</p>
									</li>
									<li>
										<p class='dropdown-item py-5 text-whit cursor py-7px' href='#'>
											Make a Profile
										</p>
									</li>
									<li>
										<p class='dropdown-item py-5 text-whit cursor py-7px' href='#'
											onClick={onDisconnect}
										>
											Disconnect
										</p>
									</li>
								</ul>
							</div>
							<div class='mt-2'>
								<a
									target='_blank'
									href='https://pancakeswap.finance/swap?outputCurrency=0x9bfd1348cf574e3eb2b114cc18374b09ad012c69&inputCurrency=BNB'
									class='btn border position-absolute  center w-100px px-1 fs-12   mx-4  text-white cursor'
								>
									BUY DMS
								</a>
							</div>
						</div>
					)}
				</div>
			</section>
			<section>
				<div class='announcementBar  mt-3 h-30px py-2 fw-bold fs-17'>
					<div id='rssBlock '>
						<p class='cnnContents overflow-x-auto'>
							<span class='marqueeStyle  '>
							Welcome to the DearMonsters Universe. The start of your journey begins here
							</span>
						</p>
					</div>
				</div>
			</section>
		</section>
	);
}

export default Header
