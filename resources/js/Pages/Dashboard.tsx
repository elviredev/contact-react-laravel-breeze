import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-3xl font-semibold leading-tight text-main-color">
                    Tableau de bord
                </h2>
            }
        >
            <Head title="Tableau de bord" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-light-black shadow-sm sm:rounded-lg">
                        <div className="p-6 text-white">
                            Vous êtes connecté!
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
