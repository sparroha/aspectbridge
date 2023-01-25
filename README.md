[aspectbridge](http://aspectbridge.vercel.app/)
==============

New database setup
------------

```sql
create database anthymn_aspectbridge;
use anthymn_aspectbridge

-- TODO any starter tables needed to be created?
`CREATE TABLE IF NOT EXISTS aspect_users_ (
                    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    username varchar(255),
                    email varchar(255),
                    hash varchar(255),
                    ip varchar(255),
                    access int(2)
                );`
```

### create database user ###
  
```sh
mysql -e 'drop user if exists anthymn_aspectbridge'
X=`openssl rand -base64 9` # creates a random secret
mysql -e "grant all on anthymn_aspectbridge.* to anthymn_aspectbridge identified by '$X'"
echo Add this password to your .env.local file: $X
```

### secret locally ###

Create `.env.local` like so:

```ini
MYSQL_HOST=db.700s.net
MYSQL_PASS=••••••••••••
```

### secret in production ###

Set `MYSQL_HOST=db.700s.net` and `MYSQL_PASS=••••••••••••` environment variables in our Vercel hosting.
