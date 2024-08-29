import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';
import type { Note } from '../../../types/note';

export const GET: APIRoute = async ({ url }) => {
  const page = Number(url.searchParams.get('page') || '1');
  const limit = 10;
  const offset = (page - 1) * limit;

  const { data, error, count } = await supabase
    .from('notes')
    .select('*', { count: 'exact' })
    .range(offset, offset + limit - 1)
    .order('created_at', { ascending: false });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ notes: data, total: count }), { status: 200 });
};

export const POST: APIRoute = async ({ request }) => {
  const note: Partial<Note> = await request.json();

  const { data, error } = await supabase
    .from('notes')
    .insert(note)
    .select()
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 201 });
};