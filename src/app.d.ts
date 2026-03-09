import type { Session, SupabaseClient, User } from '@supabase/supabase-js'
import type { Database } from './database.types.ts'

declare global {
	namespace App {
        interface Platform {
            env: Env
            cf: CfProperties
            ctx: ExecutionContext
        }

        interface Platform {
			env: Env;
			ctx: ExecutionContext;
			caches: CacheStorage;
			cf?: IncomingRequestCfProperties;
		}

        // interface Error {}
        
        interface Locals {
            session: Session | null;
            user: User | null;
			supabase: SupabaseClient<Database>;
            safeGetSession: () => Promise<{ session: Session | null; user: User | null }>
        }

        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export {};