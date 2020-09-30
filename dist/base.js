"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliPayClient = void 0;
const path_1 = require("path");
const fastweb_1 = require("@acheetahk/fastweb");
const alipay_sdk_1 = require("alipay-sdk");
/**
 * 证书下载地址
 */
const path = path_1.resolve(__dirname, '../cert');
/**
 * 支付宝插件
 */
class AliPayClient {
    /**
     * 实例化支付宝插件
     *
     * appName `string` 实例名称，默认是 default
     */
    constructor(appName = 'default') {
        this.appName = appName;
    }
    /**
     * 创建 SDK
     *
     * privateKey, appCertPath, alipayRootCertPath, alipayPublicCertPath 必须指定为可下载的URL路径 ！
     *
     * config `AlipaySdkConfig` 调用参数
     *
     * type `'cert' | 'simple'` 实例类型
     */
    async create(config, type = 'simple') {
        // 创建证书模式 SDK 实例
        if (type === 'cert') {
            const { privateKey, appCertPath, alipayRootCertPath, alipayPublicCertPath } = config;
            config.privateKey = await fastweb_1.Fastweb.fileToStr(privateKey);
            config.appCertPath = await fastweb_1.Fastweb.fileDownload(appCertPath, path, this.appName);
            config.alipayRootCertPath = await fastweb_1.Fastweb.fileDownload(alipayRootCertPath, path, this.appName);
            config.alipayPublicCertPath = await fastweb_1.Fastweb.fileDownload(alipayPublicCertPath, path, this.appName);
            this.sdk = new alipay_sdk_1.default(config);
        }
        // 创建普通模式 SDK 实例
        else if (type === 'simple') {
            const { privateKey } = config;
            config.privateKey = await fastweb_1.Fastweb.fileToStr(privateKey);
            this.sdk = new alipay_sdk_1.default(config);
        }
        else {
            throw new Error('创建失败，类型（type）必须是 simple 或者 cert 的其中一种 !');
        }
    }
    /**
     * 调用无需加密的接口
     *
     * options `ExecOptions` 调用参数
     */
    async exec(options) {
        const result = await this.sdk.exec(options.oauthToken, {
            grantType: 'authorization_code',
            ...options,
        });
        return result;
    }
    /**
     * 调用需要AES加解密的接口
     *
     * options `ExecByAesOptions` 调用参数
     */
    async execByAes(options) {
        const result = await this.sdk.exec(options.aesSet, {
            needEncrypt: true,
            bizContent: {
                merchantAppId: options.merchantAppId,
            },
        });
        return result;
    }
}
exports.AliPayClient = AliPayClient;
//# sourceMappingURL=base.js.map