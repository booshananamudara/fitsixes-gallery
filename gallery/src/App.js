import React, { useState, useEffect } from 'react';
import { getImages, searchImages } from './api';
import './App.css';
import angry from './angry-birds.png';
import ImageList from './components/ImageList';
import EmptyList from './components/EmptyList';






const App = () => {
	const [nextCursor, setNextCursor] = useState(null);
	const [imageList, setImageList] = useState([]);
	
	const [searchValue, setSearchValue] = useState('');
	const isListEmpty = imageList.length === 0;
	
	
	
	useEffect(() => {
		const fetchData = async () => {
			const responseJson = await getImages();
			console.log(imageList);
			setImageList(responseJson.resources);
			setNextCursor(responseJson.next_cursor);
		};

	

		fetchData();
	}, []);

	const handleLoadMoreButtonClick = async () => {
		const responseJson = await getImages(nextCursor);
		setImageList((currentImageList) => [
			...currentImageList,
			...responseJson.resources,
		]);
		setNextCursor(responseJson.next_cursor);
	};
;
	const handleFormSubmit = async (event) => {
		event.preventDefault();

		const responseJson = await searchImages(searchValue, nextCursor);
		setImageList(responseJson.resources);
		setNextCursor(responseJson.next_cursor);
	};

	const resetForm = async () => {
		const responseJson = await getImages();
		setImageList(responseJson.resources);
		setNextCursor(responseJson.next_cursor);

		setSearchValue('');
	};


	


	return (
		<>
			<form onSubmit={handleFormSubmit}>
				<input
					value={searchValue}
					onChange={(event) => setSearchValue(event.target.value)}
					required='required'
					placeholder='Enter a search value...'
				></input>
				<button type='submit'>Search</button>
				<button type='button' onClick={resetForm}>
					Clear
				</button>
			</form>
			<div className='image-grid'>
				{isListEmpty ? (
					<EmptyList />
				) : (
					<ImageList imageList={imageList}/>
				)}

			
				
				
			</div>
			<div className='footer'>
				{nextCursor && (
					<button onClick={handleLoadMoreButtonClick}>
						<img src={angry} alt=""/>
						<span class="now">Load More</span>
						<span class="play">Load More</span></button>
				)}
			</div>
		</>
	);
};

export default App;
