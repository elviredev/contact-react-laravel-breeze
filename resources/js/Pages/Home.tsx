import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {NotebookPen, BarChart2, ChevronRight, LogOut} from 'lucide-react';
import { Button } from '@/Components/ui/button';

const Home = ({ auth }: PageProps) => {
  return (
    <>
      <Head title="Accueil" />

      <nav className="fixed top-0 w-full bg-primary-bg border-b
       border-b-black z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo*/}
            <div className="flex items-center">
              <Link href="/">
                <NotebookPen className="w-8 h-8 text-main-color" />
              </Link>
            </div>
            {/* Liens */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {auth.user ? (
                <>
                  <Link
                    href={route('dashboard')}
                    className="text-white hover:text-main-color text-sm sm:text-base"
                  >
                    Tableau de bord
                  </Link>
                  <Link
                    href={route('profile.edit')}
                    className="text-white hover:text-main-color text-sm sm:text-base"
                  >
                    Profil
                  </Link>
                  <Link
                    method="post"
                    as="button"
                    href={route('logout')}
                    className="text-main-color hover:text-white text-sm sm:text-base"
                  >
                    <LogOut />
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={route('login')}
                    className="text-white hover:text-main-color"
                  >
                    Connexion
                  </Link>
                  <Link href={route('register')}>
                    <Button
                      className="text-black bg-main-color hover:bg-white cursor-pointer"
                    >
                      Inscription
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <div className="slide bg-[url('hero-img.jpg')] bg-center bg-cover bg-no-repeat relative z-0">
        <section className="slide__content max-w-7xl mx-auto px-8 py-20 sm:py-12 text-white">
          <div>
            <span className="text-2xl sm:text-3xl text-main-color"># [BLA BLA BLA]</span>
            <h3 className="mt-2 mb-6 text-4xl sm:text-5xl leading-12 max-w-4xl text-white">
              Gérer vos contacts simplement
            </h3>

            <p className="text-light-white text-xl sm:text-2xl leading-8 sm:leading-10 max-w-2xl">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam eum, iste molestias nulla pariatur voluptatum.
            </p>

            <div className="mt-10">
              {auth.user ? (
                <>
                  <Link href={route('dashboard')}>
                    <button className="inline-flex items-center text-xl font-semibold text-black px-4 py-3 bg-main-color hover:bg-white rounded-md cursor-pointer">
                      <BarChart2 className="w-7 h-7 mr-1" /> <span>Tableau de bord</span>
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href={route('register')}>
                    <button className="inline-flex items-center text-xl text-black font-semibold px-4 py-3 bg-main-color hover:bg-white rounded-md cursor-pointer">
                      <span>Commencer</span> <ChevronRight className="w-7 h-7 ml-1" />
                    </button>
                  </Link>
                </>
              )}
            </div>

          </div>
        </section>
      </div>

      <footer className="bg-black border-t border-t-light-black">
        <div className="max-w-7xl mx-auto px-6 py-12">
            <p className="text-center text-lg text-light-white">
              Copyright &copy; {new Date().getFullYear()} Par <span className="text-main-color">Elviredev</span> | Tous droits réservés
            </p>
        </div>
      </footer>
    </>
)
}
export default Home
