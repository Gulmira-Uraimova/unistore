import { addToCart } from '../../features/slices/cartSlice'
import { toggleLike } from '../../features/slices/ProductSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { CartItem, Product } from '../../types/types'
import { Link } from 'react-router-dom'

const FavoriteProducts = () => {
    const filteredProducts = useAppSelector(state => state.products.filteredProducts)
    const dispatch = useAppDispatch()
    const products = filteredProducts.filter(product => product.like === true)
    
    const handleAddToCart = (product: CartItem) => {
            dispatch(addToCart({ ...product, quantity: 1 }))
        }
    
    

  return (
    <div className='flex flex-wrap gap-20 justify-around mt-10 cursor-pointer'>
				{products.map((product: Product) => (
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
  )
}

export default FavoriteProducts