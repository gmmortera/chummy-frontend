
export const useSession = () => {
  const sessionId = localStorage.getItem("user")

	if(sessionId) {
		return sessionId
	}
}