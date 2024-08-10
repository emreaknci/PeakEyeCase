import { JwtPayload, jwtDecode } from "jwt-decode";
import { Role } from "../../models/role";

export interface JwtInfo {
    user: string;
    role: string;
    exp: number;
}

export const JwtHelper = {
    decode: (token: string): JwtPayload => {
        return jwtDecode(token);
    },

    decodedTokenToClaims: (decoded: any): JwtInfo => {
        console.log(decoded);
        return {
            user: decoded['user'],
            role: decoded['role'],
            exp: decoded['exp']
        }
    },

    getTokenInfos: (token: string): JwtInfo => {
        const decoded = JwtHelper.decode(token);
        return JwtHelper.decodedTokenToClaims(decoded);
    },

    isAdministrator: (token: string): boolean => {
        const claims = JwtHelper.getTokenInfos(token);
        console.log(claims.role);
        console.log(Role.Admin.toString());
        return claims.role.toString() === Role.Admin.toString();
    }
}