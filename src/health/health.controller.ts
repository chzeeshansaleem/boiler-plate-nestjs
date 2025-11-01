import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from '../shared/decorators/public.decorator';

@ApiTags('Health')
@Controller('health')
@Public()
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'Get application health status' })
  @ApiResponse({
    status: 200,
    description: 'Application is healthy',
  })
  @ApiResponse({
    status: 503,
    description: 'Application is unhealthy',
  })
  check() {
    return this.health.check([
      // Check database connection
      () => this.db.pingCheck('database'),
      // Check memory usage (heap)
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024), // 150MB threshold
      // Check memory usage (RSS)
      () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024), // 150MB threshold
      // Check disk space
      () =>
        this.disk.checkStorage('storage', {
          path: '/',
          thresholdPercent: 0.9, // Alert if disk usage exceeds 90%
        }),
    ]);
  }
}
