'use client'

import { useStateRegisterContext } from "./provider"


export default function StateRegister({params, searchParams}){
    const {state, dispatch} = useStateRegisterContext()

    return <div style={{backgroundColor: 'white'}}>
        <h1>State Register</h1>
        <h2>State</h2>
        <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
}


/**- wait compiling...
- error ./node_modules/mysql2/lib/connection.js:18:0
Module not found: Can't resolve 'net'

https://nextjs.org/docs/messages/module-not-found

Import trace for requested module:
./node_modules/mysql2/index.js
./lib/,base/sql.ts
./app/api/users/active/route.ts
./lib/util/^activeusers.ts
./lib/util/^user.ts
./app/chat/chat.tsx
./pages/gather/index.tsx */