import { HttpClient } from '../HttpClient';
import { XraySystemClient } from './XraySystemClient';
import { XrayLogger } from './XrayLogger';
import { XraySummaryClient } from './XraySummaryClient';
import { XrayDetailsClient } from './XrayDetailsClient';
import { IClientSpecificConfig } from '../../model/ClientSpecificConfig';
import { ILogger } from '../../model/';
import { XrayGraphClient as XrayScanClient } from '..';
import { XrayEntitlementsClient } from './XrayEntitlementsClient';

export class XrayClient {
    private readonly httpClient: HttpClient;
    private logger: ILogger;

    public constructor(config: IClientSpecificConfig) {
        const {
            serverUrl,
            logger = console,
            username,
            password,
            accessToken,
            proxy,
            headers,
            retries,
        }: IClientSpecificConfig = config;
        if (!serverUrl) {
            throw new Error('Xray client : must provide platformUrl or xrayUrl');
        }
        this.httpClient = new HttpClient({ serverUrl, username, password, accessToken, proxy, headers, retries });
        this.logger = new XrayLogger(logger);
    }

    public summary(): XraySummaryClient {
        return new XraySummaryClient(this.httpClient, this.logger);
    }

    public system(): XraySystemClient {
        return new XraySystemClient(this.httpClient, this.logger);
    }

    public details(): XrayDetailsClient {
        return new XrayDetailsClient(this.httpClient, this.logger);
    }

    public scan(): XrayScanClient {
        return new XrayScanClient(this.httpClient, this.logger);
    }

    public entitlements(): XrayEntitlementsClient {
        return new XrayEntitlementsClient(this.httpClient, this.logger);
    }
}
