import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { WaiterSpecService } from './waiter-spec.service';
import { ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('specs')
export class WaiterSpecController {
  constructor(private waiterSpecService: WaiterSpecService) {}

  @ApiOperation({
    summary: 'get project specs',
    description:
      'Get all specs for a project. The project is identified by the projectSlug.',
  })
  @ApiParam({
    name: 'projectSlug',
    description: 'The name of the project to which the event belongs.',
  })
  @Get(':projectSlug')
  async getSpecs(@Param('projectSlug') projectSlug: string) {
    return await this.waiterSpecService.getSpecs(projectSlug);
  }

  @ApiOperation({
    summary: 'get specific spec details',
    description:
      'Get the details of a specific spec. The project is identified by the projectSlug and the spec by the eventName.',
  })
  @ApiParam({
    name: 'projectSlug',
    description: 'The name of the project to which the event belongs.',
  })
  @ApiParam({
    name: 'eventName',
    description: 'The name of the event to which the recording belongs.',
  })
  @Get(':projectSlug/:eventName')
  async getSpec(
    @Param('projectSlug') projectSlug: string,
    @Param('eventName') eventName: string
  ) {
    return await this.waiterSpecService.getSpec(projectSlug, eventName);
  }

  @ApiOperation({
    summary: 'add spec',
    description:
      'Add a new spec to a project. The project is identified by the projectSlug.',
  })
  @ApiParam({
    name: 'projectSlug',
    description: 'The name of the project to which the event belongs.',
  })
  @ApiParam({
    name: 'eventName',
    description: 'The name of the event to which the recording belongs.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        spec: {
          type: 'string',
          description: 'The spec to be added.',
        },
      },
    },
  })
  @Post(':projectSlug')
  async addSpec(@Param('projectSlug') projectSlug: string, @Body() spec: any) {
    return await this.waiterSpecService.addSpec(projectSlug, spec);
  }

  @ApiOperation({
    summary: 'update spec',
    description:
      'Update a spec. The project is identified by the projectSlug and the spec by the eventName.',
  })
  @ApiParam({
    name: 'projectSlug',
    description: 'The name of the project to which the event belongs.',
  })
  @ApiParam({
    name: 'eventName',
    description: 'The name of the event to which the recording belongs.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        spec: {
          type: 'string',
          description: 'The spec to be updated.',
        },
      },
    },
  })
  @Put(':projectSlug/:eventName')
  async updateSpec(
    @Param('projectSlug') projectSlug: string,
    @Param('eventName') eventName: string,
    @Body() spec: any
  ) {
    return await this.waiterSpecService.updateSpec(
      projectSlug,
      eventName,
      spec
    );
  }
}