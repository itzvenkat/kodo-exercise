import * as config from "config";

export class AppConstants {
    public static readonly APPLN_NAME: string = 'Kodo | Backend';
    public static readonly APPLN_VERSION: string = 'V0.0.1';
    public static readonly APPLN_STATUS: string = 'Server Up & Running';
    public static APPLN_LAST_RUN_TIME: string = null;

    public static readonly _isDev: boolean = ((config.has(`env`) && config.get(`env`)) === 'DEV');
    public static readonly _isProd: boolean = ((config.has(`env`) && config.get(`env`)) === 'PROD');
    public static readonly _isStaging: boolean = ((config.has(`env`) && config.get(`env`)) === 'STAGING');
}