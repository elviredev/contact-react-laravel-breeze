import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-main-color text-main-color focus:border-main-color'
                    : 'border-transparent text-white hover:border-main-color hover:text-main-color focus:botext-main-color focus:text-main-color') +
                className
            }
        >
            {children}
        </Link>
    );
}
