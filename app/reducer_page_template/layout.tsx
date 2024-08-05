import StateProvider from "./provider";
import styles from './components/styles.module.css'

//boiler plater layout export
export default function Layout({ children }) {
    
	return <div id={'page_template'} className={styles.template}><StateProvider>
		<div id={'page_header'} className={'row'}>
			<h1>Reducer Template Header</h1>
		</div>
		<div id={'page_content'} className={'row'}>
			<div className={'col'}>{children}</div>
		</div>
		<div id={'page_footer'} className={'row'}>
			<p>Reducer Template Footer</p>
		</div>
	</StateProvider></div>
}