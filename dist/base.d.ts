import AliPaySdk, { AlipaySdkConfig } from 'alipay-sdk';
import { SdkType, ExecOptions, ExecByAesOptions } from './types';
/**
 * 阿里云支付 SDK 的 TypeScript 封装，为您的支付服务提供更简洁的 API
 *
 * @see: [git](https://github.com/alipay/alipay-sdk-nodejs-all)
 * @see: [doc](https://www.yuque.com/chenqiu/alipay-node-sdk/config-plantform)
 */
export declare class AliPayClient {
    sdk: AliPaySdk;
    /**
     * 实例化 SDK 对象
     *
     * @param: config `AlipaySdkConfig`
     * @param: type `cert' | 'simple` 证书模式，普通模式
     */
    create(config: AlipaySdkConfig, type?: SdkType): Promise<void>;
    /**
     * 调用无需加密的接口
     *
     * @param: options `ExecOptions` 调用参数
     */
    exec(options: ExecOptions): Promise<string | import("alipay-sdk").AlipaySdkCommonResult>;
    /**
     * 调用需要AES加解密的接口
     *
     * @param: options `ExecByAesOptions` 调用参数
     */
    execByAes(options: ExecByAesOptions): Promise<string | import("alipay-sdk").AlipaySdkCommonResult>;
}
