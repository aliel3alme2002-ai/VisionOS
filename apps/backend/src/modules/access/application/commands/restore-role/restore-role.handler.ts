import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RestoreRoleCommand } from './restore-role.command';
import { RoleResponseDto } from '../../dto/role-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IRoleRepository } from '../../../domain/repositories/role.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@CommandHandler(RestoreRoleCommand)
export class RestoreRoleHandler implements BaseCommandHandler<RestoreRoleCommand, RoleResponseDto>, ICommandHandler<RestoreRoleCommand> {
  constructor(@Inject('IRoleRepository') private readonly repository: IRoleRepository) {}

  async execute(command: RestoreRoleCommand): Promise<RoleResponseDto> {
    const role = await this.repository.findById(command.id, true);
    if (!role) throw new NotFoundException(`Role '${command.id}' not found.`);
    role.restore();
    await this.repository.save(role);
    return RoleResponseDto.fromEntity(role);
  }
}
