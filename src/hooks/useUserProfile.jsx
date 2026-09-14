import {
    useEffect,
    useState,
} from "react";

import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserProfile = () => {
    const { user, loading: authLoading } =
        useAuth();

    const axiosSecure =
        useAxiosSecure();

    const [profile, setProfile] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState(null);

    useEffect(() => {
        let ignore = false;

        const loadProfile = async () => {
            if (authLoading) {
                return;
            }

            if (!user) {
                setProfile(null);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const response =
                    await axiosSecure.get(
                        "/users/me"
                    );

                if (!ignore) {
                    setProfile(
                        response.data
                            ?.data || null
                    );
                }
            } catch (error) {
                if (!ignore) {
                    console.error(
                        "Failed to load user profile:",
                        error
                    );

                    setError(
                        "Unable to load your profile."
                    );
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        loadProfile();

        return () => {
            ignore = true;
        };
    }, [
        user,
        authLoading,
        axiosSecure,
    ]);

    return {
        profile,
        loading:
            authLoading || loading,
        error,
    };
};

export default useUserProfile;