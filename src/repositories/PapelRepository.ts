import { BaseRepository } from './BaseRepository';
import { Papel } from '../types';
import { IPapelRepository } from './interfaces';
import { snakeToCamel } from '../lib/utils';

export class PapelRepository extends BaseRepository<Papel> implements IPapelRepository {
  constructor() {
    super('papeis');
  }

  protected createEntity(data: Omit<Papel, 'id' | 'createdAt' | 'updatedAt'>): Papel {
    return {
      ...data,
      id: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async findById(id: string): Promise<Papel | null> {
    const papel = await super.findById(id);
    if (!papel) return null;
    
    papel.permissoes = await this.getPermissions(id);
    return papel;
  }

  async getPermissions(papelId: string): Promise<string[]> {
    const { data, error } = await this.supabase
      .from('papel_permissoes')
      .select('permissao_id')
      .eq('papel_id', papelId);

    if (error) {
      this.handleError('getPermissions', error);
      return [];
    }
    return data.map(p => p.permissao_id);
  }

  async setPermissions(papelId: string, permissionIds: string[]): Promise<void> {
    const { error: deleteError } = await this.supabase
      .from('papel_permissoes')
      .delete()
      .eq('papel_id', papelId);
      
    this.handleError('setPermissions (delete)', deleteError);

    if (permissionIds.length > 0) {
      const toInsert = permissionIds.map(permissao_id => ({
        papel_id: papelId,
        permissao_id,
      }));
      const { error: insertError } = await this.supabase
        .from('papel_permissoes')
        .insert(toInsert);
      this.handleError('setPermissions (insert)', insertError);
    }
  }
}
