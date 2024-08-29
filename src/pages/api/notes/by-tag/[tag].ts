import type { APIRoute } from 'astro';
import { supabase } from '../../../../lib/supabase';

export const GET: APIRoute = async ({ params }) => {
  const { tag } = params;
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .contains('tags', [tag]);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
};