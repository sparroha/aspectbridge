import { neonLaser } from "../../lib/util/gfx/laser";
import stylex from "@stylexjs/stylex"

/*export const styles = stylex.create({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#eee',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: '#ddd',
        },
    },
})*/

export default async function RootLayout({children}: {children: React.ReactNode}) {
    return <div id="content" className='row' style={{height: '100%'}}>
            <div className='col-12' style={{height: '100%', padding: 0}}>
              {children}
            </div>
          </div>
  }