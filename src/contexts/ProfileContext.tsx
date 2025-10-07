import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Perfil } from '../types';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';
import { snakeToCamel } from '../lib/utils';

interface ProfileContextType {
  profile: Perfil | null;
  permissions: Set<string>;
  profileLoading: boolean;
  hasPermission: (permission: string) => boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Perfil | null>(null);
  const [permissions, setPermissions] = useState<Set<string>>(new Set());
  const [profileLoading, setProfileLoading] = useState(true);

  const fetchProfileAndPermissions = useCallback(async (userId: string) => {
    setProfileLoading(true);
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('perfis')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (profileError && profileError.code !== 'PGRST116') { // Ignora erro "nenhuma linha"
        throw profileError;
      }

      const { data: permissionsData, error: permissionsError } = await supabase
        .rpc('get_user_permissions', { p_user_id: userId });

      if (permissionsError) throw permissionsError;

      setProfile(snakeToCamel(profileData));
      setPermissions(new Set(permissionsData?.map((p: any) => p.permission_id) || []));
    } catch (error) {
      console.error('Error fetching profile and permissions:', error);
      toast.error('Falha ao carregar dados do usuário.');
      setProfile(null);
      setPermissions(new Set());
    } finally {
      setProfileLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfileAndPermissions(user.id);
    } else {
      setProfile(null);
      setPermissions(new Set());
      setProfileLoading(false); // Garante que o loading termine se não houver usuário
    }
  }, [user, fetchProfileAndPermissions]);

  const hasPermission = (permission: string) => {
    // Se o usuário tem a permissão 'admin', ele tem acesso a tudo.
    if (permissions.has('admin')) return true;
    return permissions.has(permission);
  };

  const value = {
    profile,
    permissions,
    profileLoading,
    hasPermission,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
