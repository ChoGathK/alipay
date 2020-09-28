import AliPaySdk, { AlipaySdkConfig } from 'alipay-sdk';
import { SdkType, ExecOptions, ExecByAesOptions } from './types';
/**
 * 支付宝SDK
 */
export declare class AliPayClient {
    sdk: AliPaySdk;
    appName: string;
    /**
     * 实例化支付宝 SDK
     *
     * @param: appName `string` 实例名称，默认是 default
     */
    constructor(appName?: string);
    /**
     * 创建 SDK
     *
     * @description: privateKey, appCertPath, alipayRootCertPath, alipayPublicCertPath 必须指定为可下载的URL路径 ！
     *
     * @param: config `AlipaySdkConfig` 调用参数
     * @param: type `'cert' | 'simple'` 实例类型
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
