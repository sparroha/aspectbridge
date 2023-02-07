import abclayout from '../css/abc.module.css';

export function ABCLayout({ children }: {
    children: React.ReactNode
  }) {
    return <section className={abclayout.deck}>{ children }</section>
  }