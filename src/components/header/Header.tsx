import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'
import { InputBase } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'
import { pages } from '../constants/Constants'
import './Header.css'
// import { useEffect, useState } from 'react'
// import { useAppDispatch } from '../../hooks/redux-hooks'
// import { searchProducts } from '../../features/slices/ProductSlice'
// import useDebounce from '../../hooks/redux-hooks'

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}))
const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	width: '100%',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}))



function Header() {
	// const [query, setQuery] = useState('')
	// const dispatch = useAppDispatch()
    // const debounceQuery = useDebounce(query, 400)


	// useEffect(() => {
	// 	if (debounceQuery) {
	// 		dispatch(searchProducts(debounceQuery))
	// 	}
		
	// }, [debounceQuery, dispatch])
	

	return (
		<AppBar position='static'>
			<Container maxWidth='xl' className='header'>
				<Toolbar disableGutters>
					<Typography
						variant='h5'
						noWrap
						component='a'
						href='#app-bar-with-responsive-menu'
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 900,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						UNISTORE
					</Typography>

				
					
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
						{pages.map((page) => (
                            <Link to={page.path} key={page.id} className='text-center mr-5'>{page.title}</Link>
							
						))}
					</Box>
					<Box sx={{ flexGrow: 0 }}>
						<Search>
							<SearchIconWrapper>
								<SearchIcon />
							</SearchIconWrapper>
							<StyledInputBase
								placeholder='Search…'
								inputProps={{ 'aria-label': 'search' }}
								// onChange={(e) => setQuery(e.target.value)}
							/>
						</Search>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}
export default Header
