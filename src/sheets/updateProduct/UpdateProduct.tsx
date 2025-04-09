import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateProduct = () => {
	const [title, setTitle] = useState<string>('')
	const [price, setPrice] = useState<number>(0)
	const [description, setDescription] = useState<string>('')
	const [categoryId, setCategoryId] = useState<number>()
	const [images, setImages] = useState<string[]>([''])

	const navigate = useNavigate()

	const { id } = useParams<{ id: string }>()

	useEffect(() => {
		const fetchProductById = async () => {
			try {
				const { data } = await axios.get(
					`https://api.escuelajs.co/api/v1/products/${id}`
				)

				setTitle(data.title)
				setPrice(data.price)
				setDescription(data.description)
				setCategoryId(data.category.id)
				setImages(data.images || [''])
			} catch (error) {
				console.log(error)
			}
		}
		fetchProductById()
	}, [id])
	const handleImageUrlChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const updateUrls = [...images]
		updateUrls[index] = event.target.value
		setImages(updateUrls)
	}
	const handleAddImage = () => {
		setImages([...images, ''] as string[])
	}

    const handleSubmit = async () => {
        if (title && price > 0 && images.every(url => url !=='')) {
            try {
              const updateProduct = {
                title,
                price,
                description,
                categoryId,
                images,
              }
              const response = await axios.put(
                `https://api.escuelajs.co/api/v1/products/${id}`, updateProduct)
				return response.data
                alert('Продукт изменен!')
                navigate('/products')
            } catch (error) {
                console.log(error);
                
            }
        }
    }

	return (
		<div className='w-[350px] mx-auto flex flex-col justify-start'>
			<h1 className='text-4xl mt-10'>Изменить продукт</h1>
			<input
				type='text'
				placeholder='Название'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				className='w-full h-10 border border-black rounded-md pl-2 mt-10'
			/>
			<input
				type='number'
				placeholder='Цена'
				value={price}
				onChange={(e) => setPrice(Number(e.target.value))}
				className='w-14 h-10 border border-black rounded-md pl-2 mt-4'
			/>
			<textarea
				placeholder='Описание'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				className='w-full h-14 border border-black rounded-md pl-2 mt-4'
			/>
			<input
				type='number'
				placeholder='Категория'
				value={categoryId}
				onChange={(e) => setCategoryId(Number(e.target.value))}
				className='w-14 h-10 border border-black rounded-md pl-2 mt-4'
			/>
			<div>
				{images.map((url, index) => (
					<div key={index}>
						<input
							type='text'
							placeholder='URL картинки'
							value={url}
							onChange={(event) => handleImageUrlChange(event, index)}
							className='w-full h-10 border border-black rounded-md pl-2 mt-4'
						/>
					</div>
				))}
				<button
					onClick={handleAddImage}
					className='w-full text-left underline mt-3'
				>
					Добавить картинку
				</button>
			</div>
			<button
				onClick={handleSubmit}
				className='w-full h-10 border border-black rounded-xl mt-3'
			>
				Изменить продукт
			</button>
		</div>
	)
}

export default UpdateProduct
