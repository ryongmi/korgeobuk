import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export class ProjectException {
  static projectNotFound(): HttpException {
    return new BadRequestException('service가 존재하지 않습니다.');
  }
}
