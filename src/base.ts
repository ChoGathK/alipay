import { resolve } from 'path';
import { Fastweb } from '@acheetahk/fastweb';
import AliPaySdk, { AlipaySdkConfig } from 'alipay-sdk';
import { SdkType, ExecOptions, ExecByAesOptions } from './types';

/**
 * 证书下载地址
 */
const path = resolve(__dirname, '../cert');

/**
 * 支付宝插件
 */
 export class AliPayClient {

  public sdk: AliPaySdk;

  /**
   * 实例化支付宝插件
   *
   * appName `string` 实例名称，默认是 default
   */
  constructor(public appName: string = 'default') {}

  /**
   * 创建 SDK
   *
   * privateKey, appCertPath, alipayRootCertPath, alipayPublicCertPath 必须指定为可下载的URL路径 ！
   *
   * config `AlipaySdkConfig` 调用参数
   *
   * type `'cert' | 'simple'` 实例类型
   */
  public async create (config: AlipaySdkConfig, type: SdkType = 'simple'): Promise<AliPaySdk> {

    // 创建证书模式 SDK 实例
    if (type === 'cert') {
      const { privateKey, appCertPath, alipayRootCertPath, alipayPublicCertPath } = config;

      config.privateKey = await Fastweb.fileToStr(privateKey);
      config.appCertPath = await Fastweb.fileDownload(appCertPath, path, this.appName);
      config.alipayRootCertPath = await Fastweb.fileDownload(alipayRootCertPath, path, this.appName);
      config.alipayPublicCertPath = await Fastweb.fileDownload(alipayPublicCertPath, path, this.appName);

      this.sdk = new AliPaySdk(config);
    }

    // 创建普通模式 SDK 实例
    else if (type === 'simple') {
      const { privateKey } = config;

      config.privateKey = await Fastweb.fileToStr(privateKey);

      this.sdk = new AliPaySdk(config);
    }

    else {
      throw new Error('创建失败，类型（type）必须是 simple 或者 cert 的其中一种 !');
    }

    return this.sdk;

  }

  /**
   * 调用无需加密的接口
   *
   * options `ExecOptions` 调用参数
   */
  public async exec(options: ExecOptions) {
    const result = await this.sdk.exec(
      options.oauthToken,
      {
        grantType: 'authorization_code',
        ...options,
      },
    );

    return result;
  }

  /**
   * 调用需要AES加解密的接口
   *
   * options `ExecByAesOptions` 调用参数
   */
  public async execByAes(options: ExecByAesOptions) {
    const result = await this.sdk.exec(
      options.aesSet,
      {
        needEncrypt: true, // 自动AES加解密
        bizContent: {
          merchantAppId: options.merchantAppId,
        },
      },
    );

    return result;
  }

}
