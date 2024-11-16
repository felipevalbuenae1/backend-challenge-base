import { Controller, Post, Delete, Get, Param, Body } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':movieId')
  markFavorite(@Param('movieId') movieId: string, @Body('userId') userId: string) {
    return this.favoritesService.markFavorite(userId, movieId);
  }

  @Delete(':movieId')
  unmarkFavorite(@Param('movieId') movieId: string, @Body('userId') userId: string) {
    return this.favoritesService.unmarkFavorite(userId, movieId);
  }

  @Get(':userId')
  getFavorites(@Param('userId') userId: string) {
    return this.favoritesService.getFavorites(userId);
  }
}