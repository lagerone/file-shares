interface WebConfig {
  readonly httpPort: string;
  readonly staticFilesPath: string;
  readonly jwtSecret: string;
  readonly isProduction: boolean;
  readonly statsFilePath: string;
}

const isProduction = process.env.NODE_ENV === 'production';

const config: WebConfig = {
  httpPort: process.env.NODE_PORT || '',
  staticFilesPath: process.env.STATIC_FILES_PATH || '',
  jwtSecret: process.env.JWT_SECRET || '',
  isProduction,
  statsFilePath: process.env.STATS_FILE_PATH || '',
};

export default config;
