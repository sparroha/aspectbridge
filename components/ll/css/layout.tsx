import landscape from './landscape.module.css';

export default function Landscape({ children }: {
  children: React.ReactNode
}) {
  return <section className={landscape.dashboard}></section>
}