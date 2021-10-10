import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportService {
  findAll() {
    return `This action returns all report`;
  }
}
