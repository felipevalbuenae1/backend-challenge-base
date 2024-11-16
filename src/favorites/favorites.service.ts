import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async markFavorite(userId: string, movieId: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('favorites')
      .insert([{ user_id: userId, movie_id: movieId }]);
    if (error) throw error;
    return data;
  }

  async unmarkFavorite(userId: string, movieId: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('movie_id', movieId);
    if (error) throw error;
    return data;
  }

  async getFavorites(userId: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('favorites')
      .select('*')
      .eq('user_id', userId);
    if (error) throw error;
    return data;
  }
}