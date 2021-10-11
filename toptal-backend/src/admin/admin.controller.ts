import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/roles.guard';
import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get('/report')
  getStat() {
    return this.adminService.getStat();
  }

  @Post('/food-entries')
  createFoodEntry() {}

  @Patch('/food-entries/:id')
  updateFoodEntry() {}

  @Delete('/food-entries/:id')
  deleteFoodEntry() {}
}
