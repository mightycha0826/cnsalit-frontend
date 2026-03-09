import { redirect } from '@sveltejs/kit';

export const GET = async ({ url, locals: { supabase } }) => {
    const code = url.searchParams.get('code');

    // Open redirect 방지 목적
    const rawNext = url.searchParams.get('next') ?? '/dashboard';
    const next = rawNext.startsWith('/') && !rawNext.startsWith('//') ? rawNext : '/dashboard';
  
    if (!code) {
        throw redirect(303, '/auth/auth-code-error');
    }

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
        throw redirect(303, '/auth/auth-code-error');
    }

    throw redirect(303, next);
};