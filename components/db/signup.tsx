import { useRouter } from "next/router"
import useLog from "../conlog"

export async function handleSubmit(e){
    const router = useRouter()
    e.preventDefault()
    const emailEl = e.currentTarget.elements.email
    const passwordEl = e.currentTarget.elements.password
    try{
        /*await signUp({
            vars: {
                email: emailEl.value,
                password: passwordEl.value
            }
        })*/
        router.push('/josh/signin')
    } catch (error) {
        useLog(error.message)
    }
}


/*
Host: sql9.freesqldatabase.com
Database name: sql9582797
Database user: sql9582797
Database password: wEuxqy4eH1
Port number: 3306
*/

/*
	1	userid  Primary int(11)         AUTO_INCREMENT
	2	username        varchar(256)
	3	contact         text            JSON
	4	billing         text            JSON	
	5	access          varchar(256)    "user", "admin", "dev"      :posibly as binary [01 = user, 10 = "admin", 11 = "dev"]

*/