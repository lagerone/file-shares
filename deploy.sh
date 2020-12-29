#!/bin/bash -e

./build.sh 

# Deploy from home
rsync -avz -e 'ssh' /home/daniel/repos-private/file-shares/production-server/ pi@pi3.home:/home/pi/www/shares.lagr.se/

# Deploy remote
# rsync -avz -e 'ssh -p 6622' /home/daniel/repos-private/file-shares/production-server/ pi@lagr.se:/home/pi/www/shares.lagr.se/
