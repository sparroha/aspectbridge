require("./rc.js")
export default async function DevLayout({children}) {
    return <><script src="https://js.recurly.com/v4/recurly.js"></script>
        {children}
    </>
}