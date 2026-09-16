export const syncCurrentUser = async (axiosSecure, firebaseUser) => {
    if (!firebaseUser) {
        return null;
    }

    try {
        // Fetch token directly from the freshly authenticated firebaseUser
        const token = await firebaseUser.getIdToken();

        const response = await axiosSecure.post(
            "/users/sync",
            {
                name: firebaseUser.displayName || "",
                photoURL: firebaseUser.photoURL || null,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data?.data;
    } catch (error) {
        console.error("Failed to sync user with backend:", error);
        throw error;
    }
};

export const getMyProfile = async (axiosSecure) => {
    const response = await axiosSecure.get("/users/me");
    return response.data?.data;
};