
import { supabase } from './supabase';

// ==============================
// CAR FUNCTIONS
// ==============================

// Get all cars or only the current user's cars
export async function listCars({ mine = false, userId = null } = {}) {
  let q = supabase
    .from('cars')
    .select('*')
    .order('created_at', { ascending: false });

  if (mine) {
    q = q.eq('owner_id', userId);
  }

  const { data, error } = await q;

  if (error) {
    throw error;
  }

  return data ?? [];
}

// Get a single car by ID
export async function getCar(id) {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

// Create a new car or update an existing car
export async function saveCar(values, id) {
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('Please sign in first.');
  }

  const payload = {
    ...values,
    year: Number(values.year),
    price: Number(values.price),
    mileage: Number(values.mileage)
  };

  const q = id
    ? supabase
        .from('cars')
        .update(payload)
        .eq('id', id)
        .eq('owner_id', user.id)
    : supabase
        .from('cars')
        .insert({
          ...payload,
          owner_id: user.id
        });

  const { data, error } = await q
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// Delete a car by ID
export async function deleteCar(id) {
  const { error } = await supabase
    .from('cars')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
}

// ==============================
// COMMENT FUNCTIONS
// ==============================

// Get all comments for a specific car
export async function listComments(carId) {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('car_id', carId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}

// Add a comment to a car
export async function addComment(carId, body) {
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('Please sign in first.');
  }

  const { data, error } = await supabase
    .from('comments')
    .insert({
      car_id: carId,
      author_id: user.id,
      author_name:
        user.user_metadata?.display_name ||
        user.email?.split('@')[0] ||
        'Member',
      body
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// Delete a comment by ID
export async function deleteComment(id) {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
}
