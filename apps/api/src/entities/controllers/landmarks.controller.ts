import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateLandmarkDto } from '../dto/create-landmark.dto';
import { UpdateLandmarkDto } from '../dto/update-landmark.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Landmark } from '../entities/landmark.entity';
import { EntitiesService } from '../entities.service';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/auth/enums/role.enum';

@ApiTags('landmarks')
@Controller('landmark')
export class LandmarkController {
  constructor(private readonly entitiesService: EntitiesService) {}

  //Landmark
  //create
  @ApiOkResponse({
    type: Landmark,
    description: 'Landmark create successfully',
  })
  @ApiBadRequestResponse({ description: 'Invalid landmark data' })
  @Post('/')
  @Roles(UserRole.Admin)
  async createLandmark(
    @Body() createLandmarkDto: CreateLandmarkDto,
  ): Promise<Landmark> {
    return this.entitiesService.createLandmark(createLandmarkDto);
  }

  //get all
  @ApiOkResponse({
    type: Landmark,
    isArray: true,
    description: 'List of landmarks retrieved successfully',
  })
  @ApiNotFoundResponse({ description: 'No landmarks found' })
  @Get('/')
  @Roles(UserRole.Admin, UserRole.User)
  async findAllLandmarks(): Promise<Landmark[]> {
    return this.entitiesService.findAllLandmarks();
  }

  //get by id
  @ApiCreatedResponse({
    type: Landmark,
    description: 'Landmark retrieved successfully',
  })
  @ApiNotFoundResponse({ description: 'No landmarks found' })
  @Get('/:id')
  @Roles(UserRole.Admin, UserRole.User)
  async findOneLandmark(@Param('id') id: string): Promise<Landmark> {
    return this.entitiesService.findOneLandmark(+id);
  }

  //update
  @ApiCreatedResponse({
    type: Landmark,
    description: 'Landmark update successfully',
  })
  @ApiNotFoundResponse({ description: 'No landmarks found' })
  @Patch('/:id')
  @Roles(UserRole.Admin)
  async updateLandmark(
    @Param('id') id: string,
    @Body() updateLandmarkDto: UpdateLandmarkDto,
  ): Promise<Landmark> {
    return this.entitiesService.updateLandmark(+id, updateLandmarkDto);
  }

  //delete
  @ApiCreatedResponse({ description: 'Landmark deleted successfully' })
  @ApiNotFoundResponse({ description: 'No landmarks found' })
  @Delete('/:id')
  @Roles(UserRole.Admin)
  async deleteLandmark(@Param('id') id: string): Promise<void> {
    await this.entitiesService.deleteLandmark(+id);
  }
}
