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

			if (!error) {
				setUser(data.session)
			}
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

	function openModal() {
		setModalLogin(true)
	}

	function closeModal() {
		setModalLogin(false);
	}

	console.log("DATA: ", modalLogin)

	return (
			<SessionContext.Provider
				value={{ user, openModal, closeModal }}
			>
				{children}
				
				{/* {user === null ? ( */}
					<ModalLogin isOpenModal={modalLogin} closeModal={setModalLogin}/>
				{/* ) : null} */}
			</SessionContext.Provider>
	)
}
