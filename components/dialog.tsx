import { useEffect } from "react"
import { Button } from "react-bootstrap"

export default function Dialog(props?){
    const {id, title, content, open, close} = props

    useEffect(()=>{
        const openModal = document.querySelector('#open'+id)
        const closeModal = document.querySelector('#close'+id)
        const modal: HTMLDialogElement = document.querySelector('#modal'+id)
        openModal.addEventListener('click', ()=>{modal.showModal()})
        closeModal.addEventListener('click', ()=>{modal.close()})
    },[])

    return<>
        <Button id={'open'+id} data-open-modal>{open?open:'Open'}</Button>
        <dialog id={'modal'+id} data-modal>
            <h2>{title?title:'Modal'}</h2>
            <p>{content?content:'Modal content'}</p>
            <Button id={'close'+id} data-close-modal>{close?close:'Close'}</Button>
        </dialog>
    </>
}