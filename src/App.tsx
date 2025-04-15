import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/header/Header'
import CartPage from './sheets/cart/CartPage'
import MainPage from './sheets/main/MainPage'
import ProductsPage from './sheets/product/ProductsPage'
import { ToastContainer } from 'react-toastify';
import ProductDetails from './sheets/productDetails/ProductDetails'
import NotFoundPage from './sheets/notFoundPage/NotFoundPage'
import CreateProduct from './sheets/createProduct/CreateProduct'
import UpdateProduct from './sheets/updateProduct/UpdateProduct'
import FavoriteProducts from './sheets/favoriteProducts/FavoriteProducts'

function App() {
	return (
		<>
      <ToastContainer />
			<Header />
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/products' element={<ProductsPage />} />
				<Route path='/cart' element={<CartPage />} />
				<Route path='/create-product' element={<CreateProduct/>} />
				<Route path='/favorite-products' element={<FavoriteProducts/>} />
				<Route path='/update-product/:id' element={<UpdateProduct/>} />
				<Route path='/product-details/:id' element={<ProductDetails/>}/>
				<Route path='*' element={<NotFoundPage />}/>
			</Routes>
		</>
	)
}

export default App
