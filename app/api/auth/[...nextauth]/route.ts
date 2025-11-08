import { GET, POST } from '@/lib/auth/auth';

export { GET, POST };

// Force dynamic rendering - required for authentication
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
