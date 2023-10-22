export default function ChatWindow({
	user,
	data,
	filteredData,
	setFilteredData,
	handleDelete,
    style
}: Partial<any>) {
	function SearchHeader(props) {
		const { style } = props
		const searchInputProps = {
			minWidth: '100px',
			maxWidth: '100%',
			margin: '0px',
			padding: '0px',
			height: '1.5em',
		}
		return (
			<div id={'search'} style={style}>
				<label className={'col-sm-2'}>Search:</label>
				<input className={'col-sm-10'}
					style={{ ...searchInputProps, ...style}}
					type='text'
					defaultValue={''}
					onChange={(event) => {
						setFilteredData(
							data.filter((message) => {
								return message.message.includes(
									event.target.value
								)
							})
						)
					}}
				/>
			</div>
		)
	}
	function MessageWindow(props) {
		const { style } = props
		const deleteButtonProps = {
			fontSize: 'inherit',
			height: 'inherit',
			margin: '0px',
			padding: '0px 3px 0px 3px',
		}
		return (
			<div id={'messages'} style={style}>
				<SearchHeader style={{ height: '2em' }}/*style={{ height: '10%', maxHeight: '2em' }}*/ />
				{filteredData?.map((message, i) => {
					let t = new Date(message.timestamp)
					let stamp = t.getMonth() + '/' + t.getDate() +
						' ' + (t.getHours() < 10 ? '0' : '') + (t.getHours() - (t.getHours() > 12 ? 12 : 0)) +
						':' + (t.getMinutes() < 10 ? '0' : '') + t.getMinutes() +
						':' + (t.getSeconds() < 10 ? '0' : '') + t.getSeconds()
					return (
						<p key={i} style={{ fontSize: '14px' }}>
							{user?.access == 2 ? (
								<button
									onClick={handleDelete(message)}
									style={deleteButtonProps}>
									Delete
								</button>
							) : null}
							{'< '}{stamp}{' > ['}{message.username}{'] '}{message.message}
							<br />
						</p>
					)
				})}
			</div>
		)
	}
	return <MessageWindow style={{...style, overflow: 'auto', height: '100%'}} />
}
