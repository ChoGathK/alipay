"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliPayClient = void 0;
const alipay_sdk_1 = require("alipay-sdk");
/**
 * 阿里云支付 SDK 的 TypeScript 封装，为您的支付服务提供更简洁的 API
 *
 * @see: [github](https://github.com/alipay/alipay-sdk-nodejs-all)
 * @see: [文档地址](https://www.yuque.com/chenqiu/alipay-node-sdk/config-plantform)
 *
 * @param: config `AlipaySdkConfig`
 * @param: type `"cert" | "simple"` 证书模式，普通模式
 */
class AliPayClient {
    constructor(config, type = 'simple') {
        // 创建证书模式 SDK 实例
        if (type === 'cert') {
            const { privateKey, alipayRootCertPath, appCertPath, alipayPublicCertPath } = config;
            // 这里未完成，预想的是文件全部从远程拉取（验证身份后允许拉取）
            try {
                this.sdk = new alipay_sdk_1.default(config);
            }
            catch (error) {
                throw new Error('创建失败，失败原因：' + error);
            }
        }
        // 创建普通模式 SDK 实例
        else if (type === 'simple') {
            const { privateKey, encryptKey } = config;
            // 这里未完成，预想的是文件全部从远程拉取（验证身份后允许拉取）
            try {
                this.sdk = new alipay_sdk_1.default(config);
            }
            catch (error) {
                throw new Error('创建失败，失败原因：' + error);
            }
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
        const result = await this.sdk.exec(options.oauthToken, { grantType: 'authorization_code', ...options });
        return result;
    }
    /**
     * 调用需要AES加解密的接口
     *
     * @param: options `ExecByAesOptions` 调用参数
     */
    async execByAes(options) {
        const result = await this.sdk.exec(options.aesSet, {
            bizContent: { merchantAppId: options.merchantAppId },
            needEncrypt: true,
        });
        return result;
    }
}
exports.AliPayClient = AliPayClient;
//# sourceMappingURL=base.js.map