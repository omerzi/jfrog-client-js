import { HttpClient, IRequestParams } from '../HttpClient';
import { IClientResponse, ILogger } from '../../model/';

export class XrayEntitlementsClient {
    private readonly entitlementsFeatureEndpoint: string = '/api/v1/entitlements/feature/';

    constructor(private readonly httpClient: HttpClient, private readonly logger: ILogger) {}

    public async feature(feature: string): Promise<boolean> {
        this.logger.debug("Sending entitlement request for feature '" + feature + "'...");
        const requestParams: IRequestParams = {
            url: this.entitlementsFeatureEndpoint + feature,
            method: 'GET',
            timeout: HttpClient.DEFAULT_TIMEOUT_IN_MILLISECONDS,
        };
        try {
            let response: IClientResponse = await this.httpClient.doAuthRequest(requestParams);
            return response.data?.entitled;
        } catch (error) {
            return false;
        }
    }
}
