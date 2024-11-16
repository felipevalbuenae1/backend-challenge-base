import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async signUp(signUpDto: SignUpDto) {
    const { data, error } = await this.supabaseService.getClient()
      .from('users')
      .insert([signUpDto]);
    if (error) throw error;
    return data;
  }

  async login(loginDto: LoginDto) {
    const { data, error } = await this.supabaseService.getClient()
      .from('users')
      .select('id, username, email')
      .or(`username.eq.${loginDto.usernameOrEmail},email.eq.${loginDto.usernameOrEmail}`)
      .eq('password', loginDto.password)
      .single();
    if (error) throw error;
    if (data) {
      const token = `token-${Date.now()}`;
      // Store token logic here
      return { token, userId: data.id };
    }
    return null;
  }

  async logout(token: string) {
    // Invalidate token logic here
    return { message: 'Logged out successfully' };
  }
}