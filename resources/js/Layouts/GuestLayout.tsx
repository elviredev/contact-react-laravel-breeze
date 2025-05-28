import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { NotebookPen } from 'lucide-react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-primary-bg pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                  <NotebookPen className="h-20 w-20 text-main-color" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-light-black px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
