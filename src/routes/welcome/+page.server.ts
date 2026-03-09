import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const { user } = locals;
  if (!user) throw redirect(303, '/auth/login?next=/welcome');

  const { data, error } = await locals.supabase
    .from('users')
    .select('id')
    .eq('id', user.id)
    .maybeSingle();

  if (error) throw error;
  if (data) throw redirect(303, '/dashboard');

  return { user };
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const { user } = locals;
    if (!user) throw redirect(303, '/auth/login?next=/welcome');

    const formData = await request.formData();
    const raw = formData.get('pen_name');

    if (typeof raw !== 'string') return fail(400, { error: '필명을 입력해주세요.' });
    const pen_name = raw.trim().normalize(); //한국어 입력 정규화
    if (!pen_name) return fail(400, { error: '필명을 입력해주세요.' });
    if (pen_name.length > 10) return fail(400, { error: '필명은 10자 이내여야 합니다.' });

    const { error } = await locals.supabase.from('users').insert({
      id: user.id,
      pen_name
    });

    if (error) {
      if (error.code === '23505') return fail(409, { error: '이미 사용 중인 필명이에요.' });
      return fail(500, { error: '저장에 실패했습니다.' });
    }

    throw redirect(303, '/dashboard');
  },
};
