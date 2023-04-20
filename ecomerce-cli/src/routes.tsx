import Header from 'components/header';
import Cart from 'pages/cart';
import Home from 'pages/home';
import Signup from 'pages/login';
import Products from 'pages/products';
import Product from 'pages/products/product';
import Purchase from 'pages/purchase';
import Register from 'pages/register';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from 'components/footer';
export default function AppRouter() {
	const [search, setSearch] = useState('');
	const [token, setToken] = useState<string | null>(sessionStorage.getItem('token'));
	const [userLogado, setUserLogado] = useState<boolean>(token != null);

	return (
		<Router>
			<div className='header_main'>
				<Header token={token} setToken={setToken} userLogado={userLogado} setUserLogado={setUserLogado} search={search} setSearch={setSearch} />
			</div>
			<div className='container'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/products' element={<Products search={search} />} />
					<Route path='/products/product/:id' element={<Product />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/login' element={<Signup setToken={setToken} setUserLogado={setUserLogado} />} />
					<Route path='/register' element={<Register />} />
					<Route path='/puschase' element={<Purchase />} />
				</Routes>
			</div>
			<Footer />
		</Router>
	);
}