import { Session } from "@supabase/supabase-js";
import { createContext, useState, useEffect, ReactNode } from "react";
import { ModalLogin } from "../components/ModalLogin";
import { supabase } from '../services/supabase';

interface useUserProps {
	children: ReactNode
}

type UserProps = Session | undefined | null;

type ContextUser = {
	user: UserProps,
	openModal: () => void,
	closeModal: () => void
};

export const SessionContext = createContext<ContextUser | undefined>(undefined);

export function UseSession({ children }: useUserProps) {
	const [user, setUser] = useState<UserProps>(undefined);
	const [modalLogin, setModalLogin] = useState<boolean>(false);

	useEffect(() => {
		; (async function () {
			const { data, error } = await supabase.auth.getSession();

			if (!error && data) {
				setUser(data.session)
			}
		})()
	}, [])

	supabase.auth.onAuthStateChange(async (event, session) => {
		if (event === "USER_DELETED" || event === "SIGNED_OUT") {
			setUser(null);
			const expires = new Date(0).toUTCString();
			document.cookie = `sb-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`
			document.cookie = `sb-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`
		}

		if (event === "SIGNED_IN") {
			if (session) {
				const { data, error } = await supabase
					.from("profile")
					.select()
					.eq("user_reference", session.user.id)
					.single()

				if (!data) {
					await supabase.from('profile').insert({
						username: 'user_' + session.user.user_metadata.provider_id,
						user_reference: session.user.id
					});
				}

			}

			setUser(session)
			document.cookie = `sb-access-token=${session?.access_token}; path=/; max-age=${360800}; SameSite=Lax; secure`
			document.cookie = `sb-refresh-token=${session?.refresh_token}; path=/; max-age=${360800}; SameSite=Lax; secure`
		}
	})


	function openModal() {
		setModalLogin(true)
	}

	function closeModal() {
		setModalLogin(false);
	}

	return (
		<SessionContext.Provider
			value={{ user, openModal, closeModal }}
		>
			{children}

			{/* {user === null ? ( */}
			<ModalLogin isOpenModal={modalLogin} closeModal={setModalLogin} />
			{/* ) : null} */}
		</SessionContext.Provider>
	)
}
