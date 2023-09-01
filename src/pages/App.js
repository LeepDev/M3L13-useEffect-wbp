// IMPORT useEffect and useRef
import { useEffect, useRef, useState} from 'react';
import * as usersAPI from '../utilities/users-api'
import './App.css';

function App() {
	const [userData, setUserData] = useState([]);
	// ADD useRef
	const countries = useRef([])
	// ADD useEffect
	useEffect(() => {
		async function fetchUsers() {
			const users = await usersAPI.getUsers()
			setUserData(users)
			countries.current = [...new Set(users.map(user => user.location.country))]
		}
		fetchUsers()
	},[])
	
	return (
		<div>
			<header></header>
			<main>
				<h1>Current Users</h1>
				<article>
					<section>
						<h2 id='countries'>Countries</h2>
						<ul aria-labelledby='countries'>
							{ countries.current.length > 0 &&
								countries.current.map((country,idx)=>
									<li key={idx}>{country}</li>
								)
							}
						</ul>
					</section>
					<section>
						<h2 id='profiles'>User Profiles</h2>
						<ul aria-labelledby='profiles'>
							{userData.map((user, index) => {
								return (
									<li key={index}>
										{user.name.first} - {user.location.country}
									</li>
								);
							})}
						</ul>
					</section>
				</article>
			</main>
		</div>
	);
}

export default App;
