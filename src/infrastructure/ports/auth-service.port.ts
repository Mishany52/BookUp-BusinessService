import { IAccount } from '@/common/interface/account/account.interface';
import { SignUpDto } from '../../api/http/controllers/dto/auth/sing-up.dto';

export interface IAuthServicePort {
    singUp(dto: SignUpDto): Promise<IAccount>;
}
