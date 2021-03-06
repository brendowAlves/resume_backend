import {AxiosStatic} from "axios";
import {IUserRepo} from "src/user/UserRepo";
import {User} from "src/user/types";


export interface IUserApp {
    createUser: (ipAddress: string) => Promise<string>
}


export class UserApp implements IUserApp {

    constructor(private repo: IUserRepo, private axios: AxiosStatic) { }

    public createUser = async (ipAddress: string) => {
        const urlIpstack = `http://api.ipstack.com/${ipAddress}?access_key=${process.env.GEOLOCATION_IP_ADDRESS}`;

        let geolocation;
    
        await this.axios.get<Geolocation>(urlIpstack)
            .then(res => geolocation = res.data)
            .catch(err => console.log(`Error getting geolocation for ip address: ${ipAddress}`));

        const user = ({ipAddress, geolocation}) as User;

        return this.repo.create(user)
                .then(x => x._id);
    };
}
