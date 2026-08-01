import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateProfileCommand } from './update-profile.command';
import { UserResponseDto } from '../../../dto/user-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileHandler
  implements BaseCommandHandler<UpdateProfileCommand, UserResponseDto>, ICommandHandler<UpdateProfileCommand>
{
  constructor(@Inject('IUserRepository') private readonly repository: IUserRepository) {}

  async execute(command: UpdateProfileCommand): Promise<UserResponseDto> {
    const user = await this.repository.findById(command.id);
    if (!user) throw new NotFoundException(`User with ID '${command.id}' not found.`);
    user.updateProfile(command.profile);
    await this.repository.save(user);
    return UserResponseDto.fromEntity(user);
  }
}
