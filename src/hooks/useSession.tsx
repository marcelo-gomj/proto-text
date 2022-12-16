import { Session } from "@supabase/supabase-js";
import { createContext, useState, useEffect, ReactNode } from "react";
import { supabase } from '../services/supabase';

interface useUserProps {
	children : ReactNode
}

type UserProps = Session | undefined | null;

export const SessionContext = createContext<UserProps>(undefined);

export function UseSession({ children }: useUserProps){
	const [user, setUser] = useState<UserProps>(undefined);

	useEffect(() => {
		;(async function () {
				const { data, error } = await supabase.auth.getSession();
				
				if(!error) setUser(data.session)
		})()
	}, [])

	supabase.auth.onAuthStateChange((event, session) => {
		switch (event) {
			case "USER_DELETED":
			case "SIGNED_OUT":
				setUser(null);
				break;
			default:
				setUser(session)
				break;
		}
	})

	return (
		<SessionContext.Provider value={user}>
		{ children }	
		</SessionContext.Provider>
	)
}
