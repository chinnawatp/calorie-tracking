import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/roles.guard';
import { ReportService } from './report.service';

@Controller('report')
@UseGuards(JwtAuthGuard, AdminGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  findAll() {
    return this.reportService.findAll();
  }

  @Get('/stat')
  getState() {
    return {
      numberOfFoodEntriesLastSevenDay: 0,
      numberOfFoodEntriesLastWeek: 0,
      averageCaloriePerUserLastSevenDay: 0,
    };
  }
}
