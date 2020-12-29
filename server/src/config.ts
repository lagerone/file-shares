
interface WebConfig {
  readonly httpPort: string;
  readonly staticFilesPath: string;
  readonly sharedVideoFilesPath: string;
  readonly jwtSecret: string;
}

const config: WebConfig = {
  httpPort: process.env.NODE_PORT || '',
  staticFilesPath:
    process.env.NODE_ENV === 'production'
      ? '/home/pi/www/shares.lagr.se/server/public'
      : '/home/daniel/repos-private/file-shares/server/public',
  sharedVideoFilesPath:
    process.env.NODE_ENV === 'production'
      ? '/mounts/Extracted'
      : process.env.DEV_VIDEOS_PATH || '',
  jwtSecret: process.env.JWT_SECRET || '',
};

export default config;
