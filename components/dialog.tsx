import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"

/**
 * id must be unique
 * @param props  id: string, title: string, content: any, open: string, close: string, style: object
 * @returns 
 */
export default function Dialog(props?){
    const {id, title, content, children, open, close, style, info} = props

    useEffect(()=>{//TODO: handle escape key
        const openModal = document.querySelector('#open'+id)
        const closeModal = document.querySelector('#close'+id)
        const modal: HTMLDialogElement = document.querySelector('#modal'+id)
        const modalInfo: HTMLDialogElement = document.querySelector('#modal_info'+id)
        const openF = ()=>{modal?.showModal()}
        const closeF = ()=>{modal?.close()}
        const openInfo = ()=>{modalInfo?.show()}
        const closeInfo = ()=>{modalInfo?.close()}
        openModal.addEventListener('click', openF)
        closeModal.addEventListener('click', closeF)
        openModal.addEventListener('mouseover', openInfo)
        openModal.addEventListener('mouseout', closeInfo)
        return ()=>{
            openModal.removeEventListener('click', openF)
            closeModal.removeEventListener('click', closeF)
            openModal.removeEventListener('mouseover', openInfo)
            openModal.removeEventListener('mouseout', closeInfo)
        }
    },[])

    return <div style={style}>
        <Button id={'open'+id} data-open-modal>{open?open:'Open'}</Button>
        <dialog  id={'modal'+id} style={{borderRadius: '25px', border: '5px outset silver', textAlign: 'center'/*,...style*/}} data-modal>
            <h2>{title?title:'Modal'}</h2>
            <div>{children?children:(content?content:'Modal content')}</div>
            <Button id={'close'+id} data-close-modal>{close?close:'Close'}</Button>
        </dialog>
        {info?<dialog  id={'modal_info'+id} style={{padding: '5px', position: 'relative', fontSize: '12px', borderRadius: '5px', border: '2px outset silver', textAlign: 'center',...style}} data-modal-info>
            <span>{title?title:'Modal'}</span>
            <div>{info}</div>
        </dialog>:null}
    </div>
}
