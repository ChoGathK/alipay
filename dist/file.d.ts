/// <reference types="node" />
/**
 * @description: 快速将网络文件转换为字符串
 *
 * @param: url `string` 资源地址
 */
export declare const fastToStr: (url: string, type?: BufferEncoding) => Promise<string>;
/**
 * @description: 快速下载文件
 *
 * @param: url `string` 资源地址
 */
export declare const fastDownload: (url: string, appName?: string) => Promise<string>;
