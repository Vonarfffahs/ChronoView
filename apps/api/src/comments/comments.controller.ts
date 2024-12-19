import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Comment } from './entities/comment.entity';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiCreatedResponse({ type: Comment })
  @ApiBadRequestResponse()
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Req() req) {
    const userId = req.user.id;
    return this.commentsService.create({ ...createCommentDto, userId });
  }

  @ApiOkResponse({ type: Comment, isArray: true })
  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @ApiOkResponse({ type: Comment })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.findOne(id);
  }

  @ApiOkResponse({ type: Comment })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req,
  ) {
    const userId = req.user.id;
    return this.commentsService.update(id, { ...updateCommentDto, userId });
  }

  @ApiOkResponse()
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req) {
    const isAdmin = req.user.role === 'admin';
    return this.commentsService.remove(id, req.user.id, isAdmin);
  }
}
