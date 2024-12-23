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
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Comment } from './entities/comment.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Create a comment' })
  @ApiCreatedResponse({ type: Comment })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Req() req) {
    return this.commentsService.create(createCommentDto, req.user.userId);
  }

  @ApiOperation({ summary: 'Get all comments' })
  @ApiOkResponse({ type: Comment, isArray: true })
  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @ApiOperation({ summary: 'Find one comment' })
  @ApiOkResponse({ type: Comment })
  @ApiNotFoundResponse({ description: 'Comment not found' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a comment' })
  @ApiOkResponse({ type: Comment })
  @ApiNotFoundResponse({ description: 'Comment not found' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req,
  ) {
    return this.commentsService.update(id, updateCommentDto, req.user.userId);
  }

  @ApiOperation({ summary: 'Delete a comment' })
  @ApiOkResponse({ type: Comment })
  @ApiNotFoundResponse({ description: 'Comment not found' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req) {
    const isAdmin = req.user.role === 'admin';
    return this.commentsService.remove(id, req.user.userId, isAdmin);
  }
}
