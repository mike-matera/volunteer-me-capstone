#! /bin/sh 

set -e 

while ! npx prisma db push; do 
    sleep 10
done 
npx prisma db seed --preview-feature
