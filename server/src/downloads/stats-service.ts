import fs from 'fs';
import config from '../config';

const fsAsync = fs.promises;

interface DownloadStat {
  username: string;
  filepath: string;
  date: string;
}

interface StatsObject extends Record<string, DownloadStat[]> {}

async function fileExists(filepath: string) {
  try {
    await fsAsync.access(filepath);
    return true;
  } catch (error) {
    return false;
  }
}

async function createStatsFile() {
  await fsAsync.writeFile(config.statsFilePath, JSON.stringify({}));
}

async function getStoredStats(): Promise<StatsObject> {
  const statsFileExists = await fileExists(config.statsFilePath);
  if (!statsFileExists) {
    await createStatsFile();
  }
  const filecontent = await fsAsync.readFile(config.statsFilePath);
  return JSON.parse(filecontent.toString()) as StatsObject;
}

async function saveStats(stats: StatsObject) {
  await fsAsync.writeFile(config.statsFilePath, JSON.stringify(stats, null, 2));
}

export async function addDownloadStat(username: string, filepath: string) {
  const stats = await getStoredStats();
  if (!stats[username]) {
    stats[username] = [];
  }
  const downloadStat: DownloadStat = {
    username,
    filepath,
    date: new Date().toISOString(),
  };
  stats[username] = [downloadStat, ...stats[username]];
  await saveStats(stats);
}
