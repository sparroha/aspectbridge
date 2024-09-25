'use client'
import StoreProvider, { StoreState, useStoreInContext } from './provider'

const ResetStore = ({id}:{id?: string}) => {
	const reset: (id?: string) => void = useStoreInContext((state: StoreState) => state.reset)
	return <button onClick={()=>id?reset(id):reset()}>reset {id}</button>
}
const IncrementState = ({id}:{id: string}) => {
	const increment: (id: string) => void = useStoreInContext((state: StoreState) => state.increment)
	return <button onClick={()=>increment(id)}>count +1</button>
}
const DecrementState = ({id}:{id: string}) => {
	const decrement: (id: string) => void = useStoreInContext((state: StoreState) => state.decrement)
	return <button onClick={()=>decrement(id)}>count -1</button>
}

const Counter = ({ id }: { id: string }) => {
  	return <div className={'col-xs-6 col-sm-4 col-md-3 col-lg-2'}>
		<ResetStore id={id}/><br/>
		<IncrementState id={id}/><DecrementState id={id}/>
    </div>
}

const DisplayPreformattedStore = () => {
	const state = useStoreInContext ( ( state: any ) => state )
	return <pre>StoreState: {JSON.stringify(state, null, 2)}</pre>
}

export default function Page(){
	return <StoreProvider>
		<div className={'row'} style={{color: 'white', width: 'auto'}}>
			<Counter id={'count'}/>
			<Counter id={'a'}/>
			<Counter id={'b'}/>
			<DisplayPreformattedStore/>
		</div>
	</StoreProvider>
}