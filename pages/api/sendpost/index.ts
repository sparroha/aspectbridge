import executeQuery from '../../lib/db'

export default async (req, res) => {
    try {
        console.log("req nom", req.body)
      const result = await executeQuery({
          query: 'SELECT username FROM logan_users WHERE VALUES(?)',
          //values: [req.body.content],
          values: [{password: 'galaris', email: 'anthymngalaris@gmail.com'}],
      });
      //console.log( "ttt",result );
      res.end('success: '+result.username)
  } catch ( error ) {
      console.log( error );
      throw error;
  }
  
  
  };

  
//https://www.simplenextjs.com/posts/next-mysql