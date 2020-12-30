import fs from 'fs';
import path from 'path';
import config from '../config';

const fsAsync = fs.promises;

const mountsRoot = config.isProduction ? '/mounts' : '/home/daniel/nfs';

const idFilepathMap: Record<string, string> = {
  'c3f83a41-3c39-4f1b-8d49-322d1fc601da': path.join(
    mountsRoot,
    '/Extracted/The.Piano.Teacher.2001.Criterion.1080p.BluRay.HEVC.EAC3-SARTRE/The.Piano.Teacher.2001.Criterion.1080p.BluRay.HEVC.EAC3-SARTRE.mkv'
  ),
  'd50ceaa6-db05-47ca-8fba-671792ae6fe3': path.join(
    mountsRoot,
    '/Barnfilmer/Höjdarna.Rally.m4v'
  ),
  '44a0d18e-d2e4-4288-907e-cf38d37942e3': path.join(
    mountsRoot,
    '/Barnfilmer/Höjdarna.Silvias.födelsedag.mkv'
  ),
  'cd525858-04fd-413e-94f8-36010157bd28': path.join(
    mountsRoot,
    '/Barnfilmer/Bamse.I.Trollskogen.mp4'
  ),
  '76069d23-e403-4131-b20d-f4971ac1a31c': path.join(
    mountsRoot,
    '/Barnfilmer/Bröderna.Lejonhjärta.avi'
  ),
};

async function fileExists(filepath: string) {
  try {
    await fsAsync.access(filepath);
    return true;
  } catch (error) {
    return false;
  }
}

export interface DownloadableFile {
  id: string;
  filename: string;
}

export function getDownloadableFileObjects(): DownloadableFile[] {
  return Object.keys(idFilepathMap).map((id) => {
    return {
      id,
      filename: path.basename(idFilepathMap[id]),
    };
  });
}

export async function getFilepathById(fileId: string) {
  const filepath = idFilepathMap[fileId];
  if (!filepath) {
    return null;
  }
  const doesFileExist = await fileExists(filepath);
  if (!doesFileExist) {
    return null;
  }
  return filepath;
}
