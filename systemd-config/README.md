# Install as a service

1. Add service config to the `/etc/systemd/system` folder.
2. Start the service with autostart after reboot
   ```bash
   $ sudo systemctl enable shares.lagr.se.service
   ```
