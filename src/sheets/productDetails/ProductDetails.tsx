import { Box, LinearProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { addToCart } from '../../features/slices/cartSlice'
import {
	deleteProduct,
	getProductById,
} from '../../features/slices/ProductSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { CartItem } from '../../types/types'

const ProductDetails = () => {
	const { id } = useParams<{ id: string }>()
	const dispatch = useAppDispatch()
	const { productById, error, loading } = useAppSelector(
		(state) => state.products
	)
	const [selectImg, setSelectImg] = useState<string | undefined>('')
	const navigate = useNavigate()

	const handleClickImage = (image: string) => {
		setSelectImg(image)
	}

	const handleDeleteProduct = (id: number) => {
		dispatch(deleteProduct(id))
		navigate('/products')
	}
	const handleAddToCart = (product: CartItem) => {
		dispatch(addToCart(product))
	}

	useEffect(() => {
		if (productById) {
			setSelectImg(productById.images[0])
		}
	}, [productById])

	useEffect(() => {
		dispatch(getProductById(Number(id)))
	}, [dispatch, id])

	if (error) return <div>Product not found</div>
	if (loading)
		return (
			<Box sx={{ width: '100%' }}>
				<LinearProgress color='secondary' />
			</Box>
		)
	console.log(productById)

	return (
		<div className='flex gap-5 items-center mt-8 ml-10'>
			{productById && (
				<div className='flex gap-5 items-center'>
					{/* <h1>{productById.title}</h1> */}
					<div className='flex flex-col gap-5'>
						{productById.images.map((img) => (
							<img
								key={img}
								src={img}
								alt='error'
								className='w-[100px] h-[120px] cursor-pointer'
								onClick={() => handleClickImage(img)}
							/>
						))}
					</div>
					<img src={selectImg} alt='error' className='w-[600px]' />
					<div>
						<h1 className='text-lg text-gray-500'>
							Название:{' '}
							<span className='text-2xl text-black'>{productById.title}</span>
						</h1>
						<p className='text-lg text-gray-500'>
							Цена:{' '}
							<span className='text-xl text-orange-600'>
								{productById.price}
							</span>{' '}
							сом
						</p>
						<p className='w-[500px] text-lg text-gray-500'>
							Описание:{' '}
							<span className='text-black ml-5'>{productById.description}</span>
						</p>
						<button
							className='w-[200px] h-[40px] rounded-lg bg-red-500 mt-10 mr-5'
							onClick={() => handleDeleteProduct(productById.id)}
						>
							Удалить
						</button>
						<Link to={`/update-product/${productById.id}`} className='py-2 px-10 rounded-lg bg-blue-500 mt-10 mr-10'>
							Изменить
						</Link>

						<button
							className='w-[200px] h-[40px] rounded-lg bg-green-700 mt-10 ml-[100px]'
							onClick={() => handleAddToCart(productById)}
						>
							Добавить в корзину
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default ProductDetails
