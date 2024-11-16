import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const { data, error } = await this.supabaseService.getClient()
      .from('users')
      .insert([createUserDto]);
    if (error) throw error;
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  async findAll() {
    const { data, error } = await this.supabaseService.getClient()
      .from('users')
      .select('*');
    if (error) throw error;
    return data;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { data, error } = await this.supabaseService.getClient()
      .from('users')
      .update(updateUserDto)
      .eq('id', id);
    if (error) throw error;
    return data;
  }

  async softDelete(id: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('users')
      .update({ deleted: true })
      .eq('id', id);
    if (error) throw error;
    return data;
  }
}