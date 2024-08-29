import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';
import type { Note } from '../../../types/note';

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
};

export const PUT: APIRoute = async ({ request, params }) => {
  const { id } = params;
  const updates: Partial<Note> = await request.json();

  const { data, error } = await supabase
    .from('notes')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
};

export const DELETE: APIRoute = async ({ params }) => {
  const { id } = params;
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(null, { status: 204 });
};