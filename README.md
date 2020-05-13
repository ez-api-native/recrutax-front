# React Native

## Installation
 - `yarn install`
 - récupérer le certificat depuis l'api :
   - `docker inspect recrutax_dev-certs` > look `Mountpoint` path
   - `cp [Mountpoint]/localCA.crt ./`
   - Dans votre émulateur configuré la SDCard
   - `adb push localCA.crt /mnt/sdcard/Download/localCA.crt`
   - `adb reverse tcp:8443 tcp:8443` à chaque lancement de l'émulateur pour faire le pont avec votre port local d'api