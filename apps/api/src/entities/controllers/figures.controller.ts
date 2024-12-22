import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateFigureDto } from '../dto/create-figure.dto';
import { UpdateFigureDto } from '../dto/update-figure.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HistoricalFigure } from '../entities/historical-figure.entity';
import { EntitiesService } from '../entities.service';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/auth/enums/role.enum';

@ApiTags('figures')
@Controller('figure')
export class FigureController {
  constructor(private readonly entitiesService: EntitiesService) {}

  //Hisrorical Figure
  //create
  @ApiOkResponse({
    type: HistoricalFigure,
    description: 'Historical figure create successfully',
  })
  @ApiBadRequestResponse({ description: 'Invalid historical figure data' })
  @Post('/')
  @Roles(UserRole.Admin)
  async createFigure(
    @Body() createFigureDto: CreateFigureDto,
  ): Promise<HistoricalFigure> {
    return this.entitiesService.createFigure(createFigureDto);
  }

  //get all
  @ApiOkResponse({
    type: HistoricalFigure,
    isArray: true,
    description: 'List of historical figures retrieved successfully',
  })
  @ApiNotFoundResponse({ description: 'No historical figures found' })
  @Get('/')
  @Roles(UserRole.Admin, UserRole.User)
  async findAllFigures(): Promise<HistoricalFigure[]> {
    return this.entitiesService.findAllFigures();
  }

  //get by id
  @ApiCreatedResponse({
    type: HistoricalFigure,
    description: 'Historical figure retrieved successfully',
  })
  @ApiNotFoundResponse({ description: 'No historical figures found' })
  @Get('/:id')
  @Roles(UserRole.Admin, UserRole.User)
  async findOneFigure(@Param('id') id: string): Promise<HistoricalFigure> {
    return this.entitiesService.findOneFigure(+id);
  }

  //update
  @ApiCreatedResponse({
    type: HistoricalFigure,
    description: 'Historical figure update successfully',
  })
  @ApiNotFoundResponse({ description: 'No historical figures found' })
  @Patch('/:id')
  @Roles(UserRole.Admin)
  async updateFigure(
    @Param('id') id: string,
    @Body() updateFigureDto: UpdateFigureDto,
  ): Promise<HistoricalFigure> {
    return this.entitiesService.updateFigure(+id, updateFigureDto);
  }

  //delete
  @ApiCreatedResponse({ description: 'Historical figure deleted successfully' })
  @ApiNotFoundResponse({ description: 'No historical figures found' })
  @Delete('/:id')
  @Roles(UserRole.Admin)
  async deleteFigure(@Param('id') id: string): Promise<void> {
    await this.entitiesService.deleteFigure(+id);
  }
}
