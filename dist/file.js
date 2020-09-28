"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fastDownload = exports.fastToStr = void 0;
const fs = require("fs");
const path = require("path");
const http = require("http");
const https = require("https");
const request = require("request");
/**
 * @description: 快速将网络文件转换为字符串
 *
 * @param: url `string` 资源地址
 */
exports.fastToStr = async (url, type = 'ascii') => {
    const httpMod = /^https/.test(url) ? https : http;
    const result = await new Promise((resolved, rejected) => {
        httpMod.get(url, (res) => {
            let size = 0;
            const chunks = [];
            res.on('data', (chunk) => {
                chunks.push(chunk);
                size += chunk.length;
            });
            res.on('end', (err) => {
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
exports.fastDownload = async (url, appName = 'default') => {
    const fileName = url.split('/').pop();
    const localPath = path.resolve(__dirname, `../download`);
    if (!fs.existsSync(localPath))
        fs.mkdirSync(localPath);
    if (!fs.existsSync(`${localPath}/${appName}`))
        fs.mkdirSync(`${localPath}/${appName}`);
    const stream = fs.createWriteStream(`${localPath}/${appName}/${fileName}`);
    await request(url).pipe(stream);
    return localPath;
};
//# sourceMappingURL=file.js.map