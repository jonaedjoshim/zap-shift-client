export const syncCurrentUser = async (
    axiosSecure,
    firebaseUser
) => {
    if (!firebaseUser) {
        return null;
    }

    const response =
        await axiosSecure.post(
            "/users/sync",
            {
                name:
                    firebaseUser.displayName ||
                    "",

                photoURL:
                    firebaseUser.photoURL ||
                    null,
            }
        );

    return response.data?.data;
};

export const getMyProfile = async (
    axiosSecure
) => {
    const response =
        await axiosSecure.get(
            "/users/me"
        );

    return response.data?.data;
};