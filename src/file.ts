import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import * as https from 'https';
import * as request from 'request';

/**
 * @description: 快速将网络文件转换为字符串
 *
 * @param: url `string` 资源地址
 */

export const fastToStr = async (url: string, type: BufferEncoding = 'ascii'): Promise<string> => {
  const httpMod = /^https/.test(url) ? https : http;

  const result: any = await new Promise((resolved, rejected) => {
    httpMod.get(url, (res) => {
      let size = 0;
      const chunks: any[] = [];

      res.on('data', (chunk) => {
        chunks.push(chunk);
        size += chunk.length;
      });

      res.on('end', (err: any) => {
        const data = Buffer.concat(chunks, size);
        const str = data.toString(type);
        err ? rejected(err) : resolved(str);
      });
    });
  });

  return result;
};

/**
 * @description: 快速下载文件
 *
 * @param: url `string` 资源地址
 */

export const fastDownload = async (url: string, appName: string = 'default'): Promise<string> => {
  const fileName = url.split('/').pop();

  const localPath = path.resolve(__dirname, `../download`);

  if (!fs.existsSync(localPath)) fs.mkdirSync(localPath);

  if (!fs.existsSync(`${localPath}/${appName}`)) fs.mkdirSync(`${localPath}/${appName}`);

  const stream = fs.createWriteStream(`${localPath}/${appName}/${fileName}`);

  await request(url).pipe(stream);

  return localPath;
};
