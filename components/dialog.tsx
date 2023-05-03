import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"

/**
 * 
 * @param props  id: string, title: string, content: string, open: string, close: string, style: object
 * @returns 
 */
export default function Dialog(props?){
    const {id, title, content, open, close, style} = props
    const [active, setActive] = useState(false)

    useEffect(()=>{
        const openModal = document.querySelector('#open'+id)
        const closeModal = document.querySelector('#close'+id)
        const modal: HTMLDialogElement = document.querySelector('#modal'+id)
        const openF = ()=>{if(!active){modal.showModal();setActive(true)}}
        const closeF = ()=>{if(active){modal.close();setActive(false)}}
        openModal.addEventListener('click', openF)
        closeModal.addEventListener('click', closeF)
        return ()=>{
            openModal.removeEventListener('click', openF)
            closeModal.removeEventListener('click', closeF)
        }
    },[active])

    return<>
        <Button id={'open'+id} data-open-modal>{open?open:'Open'}</Button>
        <dialog style={{borderRadius: '25px', border: '5px outset silver', textAlign: 'center',...style}} id={'modal'+id} data-modal>
            <h2>{title?title:'Modal'}</h2>
            <p>{content?content:'Modal content'}</p>
            <Button id={'close'+id} data-close-modal>{close?close:'Close'}</Button>
        </dialog>
    </>
}