import 'react-mosaic-component/react-mosaic-component.css' //also try swappy
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

export default async function MosaicLayout({children}: {children: React.ReactNode}) {
    return <>{children}</>
}