import { Controller, Param, Post, Headers, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InviteService } from './invite.service';

@Controller('invite')
export class InviteController {
  constructor(private InviteService: InviteService) {}

  @ApiOperation({
    summary: 'Accept invite',
    description: 'find invite by link and accept invite',
  })
  @ApiResponse({
    status: 200,
    description: 'Invite accepted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Invite not found',
  })
  @ApiResponse({
    status: 409,
    description: 'The user is already in a Company',
  })
  @ApiResponse({
    status: 422,
    description: 'Invalid link',
  })
  @UseGuards(AuthGuard('user'))
  @Post(':link')
  accept(@Param() param, @Headers() headers) {
    return this.InviteService.accept(param, headers);
  }
}
