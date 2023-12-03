import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { WaiterService } from './waiter.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('waiter-datalayer')
export class WaiterDataLayerController {
  constructor(private waiterService: WaiterService) {}

  @Get('/single-event')
  @ApiOperation({
    summary: 'Inspects a single event dataLayer',
    description:
      'This endpoint inspects a single event and returns dataLayer object,\
      and the comparison result written to an xlsx file.',
  })
  @ApiQuery({
    name: 'projectName',
    description: 'The name of the project to which the event belongs.',
  })
  @ApiQuery({
    name: 'testName',
    description: 'The name of the test associated with the event.',
  })
  @ApiQuery({
    name: 'headless',
    description: 'Specifies if the test runs in headless mode.',
  })
  @ApiQuery({
    name: 'path',
    required: false,
    description: 'The optional path where the event data is stored.',
  })
  @ApiQuery({
    name: 'measurementId',
    required: false,
    description: 'An optional identifier to measure or differentiate events.',
  })
  @ApiQuery({
    name: 'username',
    required: false,
    description:
      'Optional username for authentication purposes. If provided, password must also be provided.',
  })
  @ApiQuery({
    name: 'password',
    required: false,
    description: 'Optional password for authentication purposes.',
  })
  @ApiResponse({ status: 200, description: 'The inspected dataLayer results.' })
  async inspectSingleEvent(
    @Query('projectName') projectName: string,
    @Query('testName') testName: string,
    @Query('headless') headless: string,
    @Query('measurementId') measurementId?: string,
    @Query('path') path?: string,
    @Query('username') username?: string,
    @Query('password') password?: string
  ) {
    // if no measurementId is provided, no need to grab requests
    return await this.waiterService.inspectSingleEvent(
      projectName,
      testName,
      headless,
      path,
      measurementId,
      {
        username,
        password,
      }
    );
  }

  @Get('/project')
  @ApiOperation({
    summary: 'Inspects a project dataLayer',
    description:
      'This endpoint inspects an entire project and returns dataLayer object,\
      and the comparison result written to an xlsx file. Please see the \
      inspectSingleEvent endpoint for more parameters details.',
  })
  async inspectProject(
    @Query('projectName') projectName: string,
    @Query('headless') headless: string,
    @Query('measurementId') measurementId: string,
    @Query('path') path?: string,
    @Query('args') args?: string[],
    @Query('username') username?: string,
    @Query('password') password?: string,
    @Query('concurrency') concurrency = 2
  ) {
    return await this.waiterService.inspectProject(
      projectName,
      headless,
      path,
      args,
      measurementId,
      {
        username,
        password,
      },
      Number(concurrency)
    );
  }
}
