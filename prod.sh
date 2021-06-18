#! /bin/sh 

#
# Production entrypoint 
#

set -e 

while ! npx prisma migrate resolve; do 
    sleep 10
done 
npx prisma migrate deploy
yarn start
