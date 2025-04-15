import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { addToCart } from '../../features/slices/cartSlice'
import {
	fetchProducts,
	filterByCategory,
	getCategories,
	setCurrentPage,
	toggleLike,
} from '../../features/slices/ProductSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { CartItem } from '../../types/types'

const ProductsPage = () => {
	const {
		filteredProducts,
		categories,
		selectedCategory,
		currentPage,
		itemsPerPage,
		loading,
		error,
	} = useAppSelector((state) => state.products)
	const dispatch = useAppDispatch()

	const [search, setSearch] = useState('')

	const searchFilterProducts = filteredProducts.filter((product) =>
		product.title.toLowerCase().includes(search.toLowerCase())
	)

	const handleCategoryChange = (
		event: SelectChangeEvent<{ value: string }>
	): void => {
		const category = event.target.value as string
		dispatch(filterByCategory(category === 'Все категории' ? null : category))
	}

	const handlePageChange = (
		_event: React.ChangeEvent<unknown>,
		page: number
	): void => {
		dispatch(setCurrentPage(page))
	}

	const handleAddToCart = (product: CartItem) => {
		dispatch(addToCart({ ...product, quantity: 1 }))
	}

	useEffect(() => {
		dispatch(fetchProducts())
	}, [dispatch])
	dispatch(getCategories())

	if (error) return <div>Продукты не найдены</div>
	if (loading)
		return (
			<Box sx={{ width: '100%' }} color='primary'>
				<LinearProgress color='primary' />
			</Box>
		)
	const indexOfLastProduct = currentPage * itemsPerPage
	const indexOfFirstProduct = indexOfLastProduct - itemsPerPage
	const currentPageProducts = searchFilterProducts.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	)
	const totalPages = Math.ceil(searchFilterProducts.length / itemsPerPage)

	return (
		<>
			<input
				type='text'
				placeholder='Search...'
				className='w-full h-10 border border-black pl-5'
				onChange={(e) => setSearch(e.target.value)}
			/>
			<Select
				labelId='demo-simple-select-label'
				id='demo-simple-select'
				label='Age'
				value={{ value: selectedCategory || 'Все категории' }}
				onChange={handleCategoryChange}
			>
				<MenuItem value={'Все категории'}>Все категории</MenuItem>
				{categories.map((category) => (
					<MenuItem value={category.name} key={category.id}>
						{category.name}
					</MenuItem>
				))}
			</Select>
			<div className='flex flex-wrap gap-20 justify-around mt-10 cursor-pointer'>
				{currentPageProducts.map((product) => (
					<div key={product.id} className='w-[215px]'>
						<Link to={`/product-details/${product.id}`}>
							<img
								src={product.images[0]}
								alt='error'
								className='w-full h-[240px] rounded-lg mt-6'
							/>
						</Link>
						<div className='flex justify-between items-center'>
							<p className='text-orange-600 font-bold text-xl mt-3'>
								{product.price} сом
							</p>
							<button onClick={() => dispatch(toggleLike(product.id))}>
								{product?.like ? '❤️' : '🤍'}
							</button>
						</div>
						<p className='text-xl font-sans mt-5'>{product.title}</p>
						<button
							className='w-full h-10 bg-green-700 rounded-2xl text-white text-xl font-mono mt-5
						 hover:bg-violet-700'
							onClick={() => handleAddToCart({ ...product, quantity: 1 })}
						>
							В корзину
						</button>
					</div>
				))}
			</div>
			{totalPages > 1 && (
				<Stack
					spacing={2}
					direction='row'
					justifyContent='center'
					marginTop='50px'
				>
					<Pagination
						count={totalPages}
						color='secondary'
						page={currentPage}
						onChange={handlePageChange}
					/>
				</Stack>
			)}
		</>
	)
}

export default ProductsPage
