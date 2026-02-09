import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const path = url.pathname.replace('/api', '')
    
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Route handling
    if (path.startsWith('/auth')) {
      return await handleAuth(req, supabaseClient, path)
    } else if (path.startsWith('/quiz')) {
      return await handleQuiz(req, supabaseClient, path)
    } else if (path.startsWith('/gamification')) {
      return await handleGamification(req, supabaseClient, path)
    } else if (path.startsWith('/analytics')) {
      return await handleAnalytics(req, supabaseClient, path)
    } else if (path.startsWith('/content')) {
      return await handleContent(req, supabaseClient, path)
    } else if (path.startsWith('/qa')) {
      return await handleQA(req, supabaseClient, path)
    } else if (path.startsWith('/recommendation')) {
      return await handleRecommendation(req, supabaseClient, path)
    }

    return new Response(
      JSON.stringify({ error: 'Route not found' }),
      { 
        status: 404, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

// Auth handlers
async function handleAuth(req: Request, supabase: any, path: string) {
  const method = req.method
  
  if (path === '/auth/register' && method === 'POST') {
    const { email, password, name, role } = await req.json()
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: role || 'student'
        }
      }
    })

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ user: data.user, message: 'User registered successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  if (path === '/auth/login' && method === 'POST') {
    const { email, password } = await req.json()
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ user: data.user, session: data.session }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  return new Response(
    JSON.stringify({ error: 'Auth route not found' }),
    { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

// Quiz handlers
async function handleQuiz(req: Request, supabase: any, path: string) {
  const method = req.method

  if (path === '/quiz' && method === 'GET') {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  if (path === '/quiz' && method === 'POST') {
    const quizData = await req.json()
    
    const { data, error } = await supabase
      .from('quizzes')
      .insert([quizData])
      .select()

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify(data[0]),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  return new Response(
    JSON.stringify({ error: 'Quiz route not found' }),
    { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

// Gamification handlers
async function handleGamification(req: Request, supabase: any, path: string) {
  const method = req.method

  if (path === '/gamification/leaderboard' && method === 'GET') {
    const { data, error } = await supabase
      .from('user_progress')
      .select(`
        *,
        profiles(name)
      `)
      .order('total_points', { ascending: false })
      .limit(10)

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  return new Response(
    JSON.stringify({ error: 'Gamification route not found' }),
    { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

// Analytics handlers
async function handleAnalytics(req: Request, supabase: any, path: string) {
  const method = req.method

  if (path === '/analytics/dashboard' && method === 'GET') {
    // Get user stats
    const { data: userStats, error: userError } = await supabase
      .from('profiles')
      .select('role')

    const { data: quizStats, error: quizError } = await supabase
      .from('quiz_attempts')
      .select('score, created_at')

    if (userError || quizError) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch analytics' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const analytics = {
      totalUsers: userStats?.length || 0,
      totalQuizzes: quizStats?.length || 0,
      averageScore: quizStats?.reduce((acc, curr) => acc + curr.score, 0) / (quizStats?.length || 1),
      usersByRole: userStats?.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1
        return acc
      }, {})
    }

    return new Response(
      JSON.stringify(analytics),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  return new Response(
    JSON.stringify({ error: 'Analytics route not found' }),
    { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

// Content handlers
async function handleContent(req: Request, supabase: any, path: string) {
  const method = req.method

  if (path === '/content/topics' && method === 'GET') {
    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  if (path === '/content/topics' && method === 'POST') {
    const topicData = await req.json()
    
    const { data, error } = await supabase
      .from('topics')
      .insert([topicData])
      .select()

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify(data[0]),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  return new Response(
    JSON.stringify({ error: 'Content route not found' }),
    { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

// QA handlers
async function handleQA(req: Request, supabase: any, path: string) {
  const method = req.method

  if (path === '/qa/questions' && method === 'GET') {
    const { data, error } = await supabase
      .from('qa_questions')
      .select(`
        *,
        profiles(name),
        qa_answers(*)
      `)
      .order('created_at', { ascending: false })

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  if (path === '/qa/questions' && method === 'POST') {
    const questionData = await req.json()
    
    const { data, error } = await supabase
      .from('qa_questions')
      .insert([questionData])
      .select()

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify(data[0]),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  return new Response(
    JSON.stringify({ error: 'QA route not found' }),
    { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

// Recommendation handlers
async function handleRecommendation(req: Request, supabase: any, path: string) {
  const method = req.method

  if (path === '/recommendation/topics' && method === 'POST') {
    const { userId } = await req.json()
    
    // Simple recommendation logic - get topics user hasn't completed
    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .not('id', 'in', `(
        SELECT topic_id FROM user_progress 
        WHERE user_id = '${userId}' AND completed = true
      )`)
      .limit(5)

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  return new Response(
    JSON.stringify({ error: 'Recommendation route not found' }),
    { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}