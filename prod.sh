#! /bin/sh 

#
# Production entrypoint 
#

set -e 

while ! npx prisma migrate deploy; do 
    sleep 10
done 

yarn start
