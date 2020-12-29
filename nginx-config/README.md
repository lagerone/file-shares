# Configure nginx

1. Add the file `shares.lagr.se` to `/etc/nginx/sites-available/shares.lagr.se`
2. Enable the configuration by making a symlink to the enabled sites:

   ```bash
   ln -s /etc/nginx/sites-available/shares.lagr.se /etc/nginx/sites-enabled/shares.lagr.se
   ```

3. Verify that the syntax of the code in the server block is correct:

   ```bash
   sudo nginx -t
   ```

4. Restart the nginx service:

   ```
   sudo systemctl restart nginx
   ```

5. Add new subdomain to lets encrypt certbot:

   ```bash
   certbot -d shares.lagr.se,www.shares.lagr.se --expand
   ```
