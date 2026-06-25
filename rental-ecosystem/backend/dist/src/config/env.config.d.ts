declare const _default: () => {
    port: number;
    database: {
        url: string | undefined;
    };
    redis: {
        host: string;
        port: number;
    };
    jwt: {
        secret: string;
        expiresIn: string;
        refreshExpiresIn: string;
    };
    otp: {
        expiresInMinutes: number;
    };
    bcrypt: {
        saltRounds: number;
    };
};
export default _default;
