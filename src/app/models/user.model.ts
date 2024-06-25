export interface User {
    id_user: number;
    rol_user: string;
    picture_user: string | null;
    displayname_user: string;
    username_user: string;
    password_user: string;
    email_user: string;
    department_user: string | null;
    city_user: string;
    neighborhood_user: string | null;
    phone_user: string | null;
    address_user: string | null;
    token_user: string;
    token_exp_user: string;
    method_user: string;
    verification_user: string;
    wishlist_user: string | null;
    date_created_user: string;
    date_updated_user: string;
}
