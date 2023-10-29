const MenuPageWrapper = ({ children, ...props }) => <div style={{position: 'relative', width: '100%', height: '100%'}}>{children}</div>
export default MenuPageWrapper
export const MenuOptions = ({ children, ...props }) => <div style={{position: 'absolute', top: 0, left: '100%', width: '10%', height: '100%', zIndex: 1}}>{children}</div>



//example
function Ex(){
    return <MenuPageWrapper>
        <MenuOptions>
            <div>option 1</div>
            <div>option 2</div>
            <div>option 3</div>
        </MenuOptions>
        <div>content</div>
    </MenuPageWrapper>
}