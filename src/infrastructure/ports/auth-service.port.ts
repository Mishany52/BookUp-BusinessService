import { IAccount } from '@/common/interface/sso/account/account.interface';
import { SignUpDto } from '../../api/http/controllers/dto/auth/sing-up.dto';

export interface IAuthServicePort {
    singUp(dto: SignUpDto): Promise<IAccount>;
}
