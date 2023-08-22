'use client'
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import ChatWindow from './chat_window'
import jsonFetch from '../../../lib/,base/jsonFetch';

/**
 * Messages
 * @param param0: update, setUpdate, access, style
 * @returns
 */
export default function Messages({ update, setUpdate, user, homepage, style }: Partial<any>) {
	const { data, error, mutate } = useSWR('/api/chat/messages', {
		refreshInterval: 500,
		fetcher: jsonFetch,
	})
	const [filteredData, setFilteredData] = useState(null)
	let refresh = false
	//initialize messages
	useEffect(() => {
		if (!data) return

		setFilteredData(data)
		scrollFloor()
	}, [data])
	//update messages
	useEffect(() => {
		if (!update) return

		mutate()
		setUpdate(false)
		scrollFloor()
	}, [update])
	function handleDelete(message) {
		return () => {
			const date = new Date(message.timestamp)
			const sqlDate = date.toISOString()

			let filteredData = null
			fetch('/api/chat/deletesend', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					messageid: message.id,
					message: message.message,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					mutate()
					console.log(data)
					console.log(message.timestamp.replace('T', ' '))
					console.log(sqlDate)
				})
				.catch((error) => console.error(error))
		}
	}
	return (
		<ChatWindow
			user={user}
			data={data}
			filteredData={filteredData}
			setFilteredData={setFilteredData}
			handleDelete={handleDelete}
            style={style}
		/>
	)
}

const scrollFloor = ()=>{
    const messages = document.getElementById('messages')
    setTimeout(() => {
      messages.scrollTop = messages.scrollHeight;
    }, 100);
  }