#! /bin/sh 

#
# Production entrypoint 
#

set -e 

#while ! npx prisma migrate deploy; do 
#    sleep 10
#done 

# This is broken for now. Forcibly init the db on container start. BAD!
. ./initdb.sh

yarn start
