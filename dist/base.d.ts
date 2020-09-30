import AliPaySdk, { AlipaySdkConfig } from 'alipay-sdk';
import { SdkType, ExecOptions, ExecByAesOptions } from './types';
/**
 * 支付宝插件
 */
export declare class AliPayClient {
    appName: string;
    sdk: AliPaySdk;
    /**
     * 实例化支付宝插件
     *
     * appName `string` 实例名称，默认是 default
     */
    constructor(appName?: string);
    /**
     * 创建 SDK
     *
     * privateKey, appCertPath, alipayRootCertPath, alipayPublicCertPath 必须指定为可下载的URL路径 ！
     *
     * config `AlipaySdkConfig` 调用参数
     *
     * type `'cert' | 'simple'` 实例类型
     */
    create(config: AlipaySdkConfig, type?: SdkType): Promise<void>;
    /**
     * 调用无需加密的接口
     *
     * options `ExecOptions` 调用参数
     */
    exec(options: ExecOptions): Promise<string | import("alipay-sdk").AlipaySdkCommonResult>;
    /**
     * 调用需要AES加解密的接口
     *
     * options `ExecByAesOptions` 调用参数
     */
    execByAes(options: ExecByAesOptions): Promise<string | import("alipay-sdk").AlipaySdkCommonResult>;
}
