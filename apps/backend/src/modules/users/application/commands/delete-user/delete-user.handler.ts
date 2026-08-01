import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteUserCommand } from './delete-user.command';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler
  implements BaseCommandHandler<DeleteUserCommand, void>, ICommandHandler<DeleteUserCommand>
{
  constructor(@Inject('IUserRepository') private readonly repository: IUserRepository) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    const user = await this.repository.findById(command.id);
    if (!user) throw new NotFoundException(`User with ID '${command.id}' not found.`);
    user.delete();
    await this.repository.save(user);
  }
}
