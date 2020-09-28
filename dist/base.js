"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliPayClient = void 0;
const file_1 = require("./file");
const alipay_sdk_1 = require("alipay-sdk");
/**
 * 支付宝SDK
 */
class AliPayClient {
    /**
     * 实例化支付宝 SDK
     *
     * @param: appName `string` 实例名称，默认是 default
     */
    constructor(appName = 'default') {
        this.appName = appName;
    }
    /**
     * 创建 SDK
     *
     * @description: privateKey, appCertPath, alipayRootCertPath, alipayPublicCertPath 必须指定为可下载的URL路径 ！
     *
     * @param: config `AlipaySdkConfig` 调用参数
     * @param: type `'cert' | 'simple'` 实例类型
     */
    async create(config, type = 'simple') {
        // 创建证书模式 SDK 实例
        if (type === 'cert') {
            const { privateKey, appCertPath, alipayRootCertPath, alipayPublicCertPath } = config;
            config.privateKey = await file_1.fastToStr(privateKey);
            config.appCertPath = await file_1.fastDownload(appCertPath, this.appName);
            config.alipayRootCertPath = await file_1.fastDownload(alipayRootCertPath, this.appName);
            config.alipayPublicCertPath = await file_1.fastDownload(alipayPublicCertPath, this.appName);
            this.sdk = new alipay_sdk_1.default(config);
        }
        // 创建普通模式 SDK 实例
        else if (type === 'simple') {
            const { privateKey } = config;
            config.privateKey = await file_1.fastToStr(privateKey);
            this.sdk = new alipay_sdk_1.default(config);
        }
        else {
            throw new Error('创建失败，类型（type）必须是 simple 或者 cert 的其中一种 !');
        }
    }
    /**
     * 调用无需加密的接口
     *
     * @param: options `ExecOptions` 调用参数
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
     * @param: options `ExecByAesOptions` 调用参数
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